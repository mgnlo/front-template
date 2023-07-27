import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Frequency, Status } from '@common/enums/common-enum';
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
  activityList: Array<{ key: string; val: string }> = [{ key: 'condition_A', val: '近三個月_基金_申購金額' }, { key: 'condition_B', val: '假資料B' }, { key: 'condition_C', val: '假資料C' }];
  activityInputTempList: [];
  activityListDict = new Dictionary();

  //取得新增條件區塊
  get conditions(): FormArray {
    return this.validateForm.get('activityListCondition') as FormArray
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
          activity0: new FormControl(null, [Validators.required, this.existsInActivityList.bind(this)]),
        }),
      ]),
    });

    this.setDicActivityList('add', 0);

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);

    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (!!state) {
      Object.keys(state).forEach(key => {
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
    //this.validateForm.controls[fieldName].updateValueAndValidity();
  }

  removeField(fieldName: string) {
    this.validateForm.removeControl(fieldName);
  }
  //#endregion

  //#region 條件區塊異動
  changeConditionsBtn(action: 'add' | 'remove', index: number) {
    if (action === 'add') {
      while (this.conditions.controls.filter(f => f.value.id === index).length > 0) {
        index = index + 1
      }
      this.setDicActivityList('add', index);
      this.conditions.push(new FormGroup({
        id: new FormControl(index),
        ['activity' + index]: new FormControl(null, [Validators.required, this.existsInActivityList.bind(this)]),
      }));
    } else {
      this.setDicActivityList('remove', this.conditions.at(index)?.get('id').value)
      this.conditions.removeAt(index);
    }
    //console.info('changeConditionsBtn', this.conditions.getRawValue())
  }
  //#endregion

  //#region 塞選條件區活動清單
  setDicActivityList(action: 'add' | 'remove', index: number) {
    switch (action) {
      case 'add':
        if (!this.activityListDict.has('activityList' + index)) {
          this.activityListDict.set('activityList' + index, this.activityList);
        }
        break;
      case 'remove':
        if (this.activityListDict.has('activityList' + index)) {
          this.activityListDict.delete('activityList' + index);
        }
        break;
    }
  }
  activityFilter(value: string): Array<{ key: string; val: string }> {
    const filterValue = value.toLowerCase();
    if (CommonUtil.isBlank(filterValue)) return this.activityList;
    return this.activityList.filter((f) => {
      return f.val?.toLowerCase()?.includes(filterValue);
    })
  }

  onActivityChange(index: number) {
    this.activityListDict.set('activityList' + index, this.activityFilter(this.getActivityInput(index)));
  }

  getActivityInput(index: number) {
    const actList = this.validateForm.get('activityListCondition').value;
    const actId = this.conditions.at(index)?.get('id').value;
    if (CommonUtil.isBlank(actId)) return "";
    const findVal = actList.find(f => f.id === actId)
    const key = 'activity' + actId
    return findVal[key] ?? "";
  }
  //#endregion

  //#region 檢查條件區是否存在清單中
  existsInActivityList(ctl: FormControl): { [key: string]: any } | null {
    if ((ctl.dirty || ctl.touched) && this.activityList.filter(item => item.val === ctl.value).length === 0) {
      return { 'activityErrMsg': '不存在活動清單中' }; // 驗證失敗
    }
    // if (this.activityListDict.has(keyName)) {
    //   return { 'activityErrMsg': '不可重複' }; // 驗證失敗
    // }
    return null; // 驗證成功
  }
  //#endregion


  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }

  submit() {

  }

}
