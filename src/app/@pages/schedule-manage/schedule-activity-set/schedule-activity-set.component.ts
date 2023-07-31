import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityListCondition, ActivitySetting } from '@api/models/activity-list.model';
import { Frequency, Status } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { Dictionary } from '@common/utils/dictionary';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'schedule-activity-set',
  templateUrl: './schedule-activity-set.component.html',
  styleUrls: ['./schedule-activity-set.component.scss']
})
export class ScheduleAddComponent extends BaseComponent implements OnInit {
  Status = Status;
  Frequency = Frequency;

  params: any;//路由參數
  actionName: string;// 新增/編輯/複製

  //預設下拉時間日期
  daily: number[] = Array.from({ length: 31 }, (_, index) => index + 1);
  hour: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  minute: number[] = Array.from({ length: 60 }, (_, index) => index + 1);

  //預設排程頻率
  scheduleFrequencyList = [Frequency.daily, Frequency.monthly];
  frequencyList: Array<{ key: string; val: string }> = Object.entries(Frequency)
    .filter(([k, v]) => {
      return this.scheduleFrequencyList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設檔案存放地方
  filePathList: Array<{ key: string; val: string }> = [{ key: 'path_A', val: 'A://' }, { key: 'path_B', val: 'B:/' }, { key: 'path_C', val: 'C:\\' }];

  //預設活動名單
  activityListMock: Array<ActivitySetting> = ActivityListMock;//Call API
  activityList: Array<{ key: string; val: string }> = this.activityListMock.map(m => ({ key: m.activityId, val: m.activityName }))
  activityInputTempList: [];
  activityListDict = new Dictionary();

  //取得新增條件區塊
  get conditions(): FormArray {
    return this.validateForm.get('activityListCondition') as FormArray
  }

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef) {
    super();

    this.validateForm = new FormGroup({
      jobName: new FormControl(null, Validators.required),
      status: new FormControl('active', Validators.required),
      frequency: new FormControl('daily', Validators.required),
      //daily: new FormControl(null, Validators.required),
      hour: new FormControl(null, Validators.required),
      minute: new FormControl(null, Validators.required),
      file_path: new FormControl(null, Validators.required),
      activityListCondition: new FormArray([
        new FormGroup({
          id: new FormControl(0),
          activityId_0: new FormControl(null, [Validators.required, this.existsInActivityList.bind(this)]),
          activityName_0: new FormControl(null),
        }),
      ]),
    }, this.existsInaAtivityListCondition);

    //建立第一條
    this.setDicActivityList('add', 0);

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);

    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (!!state) {
      Object.keys(state).forEach(key => {
        if (key === 'activitySetting') {
          let condition = state[key] as Array<ActivityListCondition>;
          while (this.conditions.length !== 0) {
            this.conditions.removeAt(0)
          }
          condition.forEach((con, index) => {
            let fg = new FormGroup({});
            fg.setControl('id', new FormControl(index));
            fg.setControl('activityId_' + index, new FormControl(con['activityId'], [Validators.required, , this.existsInActivityList.bind(this)]));
            fg.setControl('activityName_' + index, new FormControl(con['activityName']));
            this.conditions.push(fg);
          })
        }
        if (!!this.validateForm.controls[key]) {
          switch (key) {
            default:
              this.validateForm.controls[key].setValue(state[key]);
              break;
          }
        }
      })
    }

  }

  //#region 頻率切換
  changeFrequencyType(key: string) {
    this.validateForm.patchValue({ 'hour': '', 'minute': '' });
    switch (key) {
      case 'daily':
        if (this.validateForm.contains('daily')) {
          this.removeField('daily');
        }
        break;
      case 'monthly':
        if (!this.validateForm.contains('daily')) {
          this.addField('daily', null, Validators.required);
        }
        break;
    }
  }
  //#endregion

  //#region 基本欄位檢核(新增/刪除)
  addField(fieldName: string, formState: any, fileFormatValidator: any) {
    this.validateForm.addControl(fieldName, new FormControl(formState, fileFormatValidator));
  }

  removeField(fieldName: string) {
    this.validateForm.removeControl(fieldName);
  }
  //#endregion

  //#region 條件區塊異動
  changeConditionsBtn(action: 'add' | 'remove', index: number) {
    if (action === 'add') {
      // 避免重複
      while (this.conditions.controls.filter(f => f.value.id === index).length > 0) {
        index = index + 1
      }

      this.setDicActivityList('add', index);
      this.conditions.push(new FormGroup({
        id: new FormControl(index),
        ['activityId_' + index]: new FormControl(null, [Validators.required, this.existsInActivityList.bind(this)]),
        ['activityName_' + index]: new FormControl(null),
      }));
    } else {
      this.setDicActivityList('remove', this.conditions.at(index)?.get('id').value)
      this.conditions.removeAt(index);
    }

    this.updateActivityValidators();
  }
  //#endregion

  //#region 塞選條件區活動清單
  setDicActivityList(action: 'add' | 'remove', activityId: number) {
    switch (action) {
      case 'add':
        if (!this.activityListDict.has('activityList' + activityId)) {
          this.activityListDict.set('activityList' + activityId, this.activityList);
        }
        break;
      case 'remove':
        if (this.activityListDict.has('activityList' + activityId)) {
          this.activityListDict.delete('activityList' + activityId);
        }
        break;
    }
  }

  onActivityChange(index: number) {
    this.activityListDict.set('activityList' + index, this.activityFilter(this.getActivityInput(index)));
    this.updateActivityValidators();
  }

  onActivitySelectChange(index: number) {
    this.activityListDict.set('activityList' + index, this.activityFilter(""));
    this.validateForm.updateValueAndValidity();
    this.updateActivityValidators();
  }

  activityFilter(value: string): Array<{ key: string; val: string }> {
    const filterValue = value.toLowerCase();
    if (CommonUtil.isBlank(filterValue)) return this.activityList;
    return this.activityList.filter((f) => {
      return f.val?.toLowerCase()?.includes(filterValue);
    })
  }

  getActivityInput(index: number) {
    const actList = this.validateForm.get('activityListCondition').value;
    const actId = this.conditions.at(index)?.get('id').value;
    if (CommonUtil.isBlank(actId)) return "";
    return actList.find(f => f.id === actId)['activityId_' + actId] ?? "";
  }
  //#endregion

  //#region 檢查條件區是否存在清單中
  existsInActivityList(ctl: FormControl): { [key: string]: any } | null {
    // 清空 activityErrMsg
    ctl.setErrors(null);
    if (ctl.dirty || ctl.touched || ctl.valueChanges) {
      if (!CommonUtil.isBlank(ctl.value) && this.activityList.filter(item => item.key === ctl.value).length === 0)
        return { 'activityErrMsg': '不存在活動清單中' }; // 驗證失敗
    }
    let conditionList = this.validateForm?.get('activityListCondition') as FormArray;
    if (conditionList?.length > 1 && CommonUtil.isBlank(ctl.value)) {
      return { 'activityErrMsg': '不可為空' };// 驗證失敗
    }
    return null; // 驗證成功
  }

  //檢查欄位是否重複
  existsInaAtivityListCondition(formGroup: FormGroup): { [key: string]: any } | null {
    const activityListConditionArray = formGroup.get('activityListCondition') as FormArray;

    if (!activityListConditionArray) return null;

    formGroup.get('activityListCondition')?.setErrors(null);

    const duplicateActivities: Set<string> = new Set();
    let isEmptyField = false;

    for (let i = 0; i < activityListConditionArray.length - 1; i++) {
      const controlI = activityListConditionArray.at(i).get('activityId_' + activityListConditionArray.at(i).get('id').value);
      const activityI = controlI?.value;

      if (!activityI) {
        isEmptyField = true;
        controlI?.setErrors({ 'activityErrMsg': '不可為空' });
        controlI?.markAsTouched();
        continue;
      }

      for (let j = i + 1; j < activityListConditionArray.length; j++) {
        const controlJ = activityListConditionArray.at(j).get('activityId_' + activityListConditionArray.at(j).get('id').value);
        const activityJ = controlJ?.value;

        if (!activityJ) {
          isEmptyField = true;
          controlJ?.setErrors({ 'activityErrMsg': '不可為空' });
          controlJ?.markAsTouched();
          continue;
        }

        if (activityI === activityJ) {
          duplicateActivities.add(activityI);
          controlI?.setErrors({ 'activityErrMsg': '不可重複選擇' });
          controlI?.markAsTouched();
          controlJ?.setErrors({ 'activityErrMsg': '不可重複選擇' });
          controlJ?.markAsTouched();
        }
      }

    }

    if (isEmptyField) {
      return { 'activityErrMsg': '不可為空' };
    }

    if (duplicateActivities.size > 0) {
      return { 'activityErrMsg': '不可重複選擇' };
    }

    return null;
  }

  // 更新活動區塊的驗證
  updateActivityValidators(): void {
    const activityListConditionArray = this.validateForm.get('activityListCondition') as FormArray;
    for (let i = 0; i < activityListConditionArray.length; i++) {
      const actId = activityListConditionArray.at(i).get('id').value;
      const control = activityListConditionArray.at(i).get('activityId_' + actId);
      control?.setValidators([Validators.required, this.existsInActivityList.bind(this, control)]);
      control?.updateValueAndValidity();
    }

    this.validateForm.updateValueAndValidity();
  }
  //#endregion

  //#region 判斷是否需要disabled活動(+)號
  // 檢查是否有任何 activityId(i) 具有 activityErrMsg
  hasAnyActivityErrors(): boolean {
    const activityListConditionArray = this.conditions;
    if (activityListConditionArray) {
      return activityListConditionArray.controls.some(control => {
        return control.get('activityId_' + control.get('id').value)?.hasError('activityErrMsg');
      });
    }
    return false;
  }

  //#endregion

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }

  submit() {

  }

}
