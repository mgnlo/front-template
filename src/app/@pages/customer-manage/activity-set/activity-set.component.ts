import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityListCondition, ActivitySetting, ActivitySettingEditReq } from '@api/models/activity-list.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { Filter, Frequency } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import * as moment from 'moment';
import { catchError, filter, tap } from 'rxjs/operators';
import { CustomerManageService } from '../customer-manage.service';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog.component';

@Component({
  selector: 'activity-set',
  templateUrl: './activity-set.component.html',
  styleUrls: ['./activity-set.component.scss'],
})
export class ActivitySetComponent extends BaseComponent implements OnInit {

  filterList: Array<{ key: string; val: string }> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{ key: string; val: string }> = Object.entries(Frequency).map(([k, v]) => ({ key: k, val: v }));
  activityId: string;
  actionName: string;// 新增/編輯/複製
  categoryList: Map<string, string> = new Map();
  popupText: string = '';

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private customerManageService: CustomerManageService,
    private tagManageService: TagManageService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,) {
    super(storageService, configService, loginService);

    this.validateForm = new FormGroup({
      activityName: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      status: new FormControl('disabled', Validators.required),
      listLimit: new FormControl(null, [ValidatorsUtil.number, ValidatorsUtil.notZero]),
      filterOptions: new FormControl(false),
      startDate: new FormControl(new Date(), [Validators.required, ValidatorsUtil.dateFmt]),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), [Validators.required, ValidatorsUtil.dateFmt]),
      scheduleSettings: new FormControl(null, Validators.required),
      activityDescription: new FormControl(null),
      activityListCondition: new FormArray([
        new FormGroup({
          1: new FormControl(null, [Validators.required, ValidatorsUtil.isRepeat])
        })
      ], Validators.required),
    }, [ValidatorsUtil.dateRange]);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  or(action: 'add' | 'remove', key: number) {
    if (action === 'add') {
      let ctlName = !!key ? key++ : 1;
      this.conditions.push(new FormGroup({
        [ctlName]: new FormControl(null, [Validators.required, ValidatorsUtil.isRepeat])
      }));
    } else {
      this.conditions.removeAt(key)
    }
  }

  and(i: number, action: 'add' | 'remove', key: number) {
    let fg = this.conditions.at(i) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key + 1}`, new FormControl(null, [Validators.required, ValidatorsUtil.isRepeat]));
    } else {
      fg.removeControl(`${key}`);
    }
  }

  get conditions(): FormArray {
    return this.validateForm.get('activityListCondition') as FormArray
  }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params?.activityId;
    this.actionName = CommonUtil.getActionName(CommonUtil.isNotBlank(this.activityId) ? 'edit' : null);

    if (this.isMock) {
      ActivityListMock.forEach(activity => {
        activity.activityListCondition.forEach(condition => this.categoryList.set(condition.tagId, condition.tagName));
      });
      if (!!this.activityId) {
        this.loadingService.open();
        if (this.isMock) {
          let mockData = ActivityListMock.find(activity => activity.activityId === this.activityId)
          this.setData(mockData);
          this.loadingService.close();
          return;
        }
      }
      return;
    }

    //L2標籤
    this.tagManageService.getTagSettingListOption().pipe(
      catchError((err) => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查詢可選活動名單條件失敗');
        this.validateForm?.get('activityListCondition')?.setErrors({ 'categoryKeyErrMsg': err.message ? err.message : '查詢可選活動名單條件失敗' });
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        Object.entries(res.result).forEach(([k, v]) => this.categoryList.set(k, v));
        this.loadingService.close();
      })
    ).subscribe(() => {
      if (!!this.activityId) {
        this.loadingService.open();
        this.customerManageService.getActivitySettingRow(this.activityId).pipe(
          catchError(err => {
            this.dialogService.alertAndBackToList(false, '查無該筆資料，將為您導回客群名單', ['pages', 'customer-manage', 'activity-list']);
            throw new Error(err.message);
          }),
          filter(res => res.code === RestStatus.SUCCESS),
          tap((res) => {
            this.setData(res.result);
            this.loadingService.close();
          })
        ).subscribe();
      }
    });
  }

  setData(result: ActivitySetting) {
    Object.keys(result).forEach(key => {
      if (!!this.validateForm.controls[key]) {
        switch (key) {
          case 'startDate':
          case 'endDate':
            this.validateForm.controls[key].setValue(new Date(result[key]))
            break;
          case 'filterOptions':
            this.validateForm.controls[key].setValue(result[key] === 'true' ? true : false)
            break;
          case 'activityListCondition':
            let groupData = CommonUtil.groupBy(result[key], 'tagGroup');
            if (Object.keys(groupData).length > 0) {
              this.conditions.removeAt(0);
            }
            Object.keys(groupData).forEach(key => {
              let fg = new FormGroup({});
              let condition = groupData[key] as Array<ActivityListCondition>;
              condition.forEach((con, index) => {
                if (!this.categoryList.get(con.tagId)) {
                  // this.categoryList[con.tagId] = con.tagName //把取回的值塞進活動名單條件下拉選單
                  this.dialogService.alertAndBackToList(null, `活動名單條件 ${con.tagName} 已不存在，請重新選擇`);
                  fg.setControl("" + index, new FormControl(null, [Validators.required, ValidatorsUtil.isRepeat]));
                  fg.get("" + index).markAsTouched();
                } else {
                  fg.setControl("" + index, new FormControl(con.tagId, [Validators.required, ValidatorsUtil.isRepeat]));
                }
              });
              this.conditions.push(fg);
            })
            break;
          default:
            this.validateForm.controls[key].setValue(result[key]);
            break;
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }

  preview() {
    this.dialogService.open(PreviewDialogComponent, {
      size: this.validateForm.get('listLimit').value,
      conditionList: this.getRequestData().activityListCondition
    });
  }

  submit() {
    let valid = this.validateForm.valid;
    let reqData: ActivitySettingEditReq = this.getRequestData();

    if (!valid || !reqData) {
      const route = this.activityId ? [this.activityId] : [];
      this.dialogService.alertAndBackToList(false, `${this.actionName}活動驗證失敗`, ['pages', 'customer-manage', 'customer-set', ...route]);
      return
    }

    if (this.isMock) {
      this.dialogService.alertAndBackToList(true, `${this.actionName}活動送審成功`, ['pages', 'customer-manage', 'activity-list']);
      this.loadingService.close();
      return;
    }

    // 調用(新增or複製)或編輯
    this.saveActivitySetting(reqData);

  }

  //#region (新增or複製)或編輯
  saveActivitySetting(reqData: any) {
    this.loadingService.open();

    const requestObservable = this.activityId
      ? this.customerManageService.updateActivitySetting(this.activityId, reqData)
      : this.customerManageService.createActivitySetting(reqData);

    requestObservable.pipe(
      catchError((err) => {
        const route = this.activityId ? [this.activityId] : [];
        this.dialogService.alertAndBackToList(false, `${this.actionName}活動失敗 ${err.message}`, ['pages', 'customer-manage', 'activity-set', ...route]);
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res);
        this.loadingService.close();
      })
    ).subscribe(res => {
      if (res.code === RestStatus.SUCCESS) {
        this.dialogService.alertAndBackToList(true, `${this.actionName}活動送審成功`, ['pages', 'customer-manage', 'activity-list']);
      }
    });
  }
  //#endregion

  getRequestData(): ActivitySettingEditReq {
    let reqData: ActivitySettingEditReq = this.validateForm.getRawValue();
    reqData.startDate = moment(reqData.startDate).format('YYYY-MM-DD');
    reqData.endDate = moment(reqData.endDate).format('YYYY-MM-DD');
    let conditionId: number = 0;
    let flatConditions: { conditionId: string, tagGroup: number, tagId: string, tagName: string }[] = [];
    this.validateForm.getRawValue().activityListCondition.forEach((condition, i) => {
      Object.keys(condition).forEach((key) => {
        conditionId++;
        flatConditions.push({ conditionId: `${conditionId}`, tagGroup: i + 1, tagId: condition[key], tagName: this.categoryList.get(condition[key]) });
      })
    });
    reqData.activityListCondition = flatConditions;
    return reqData;
  }

  conditionHasError(groupIndex: string, controlIndex: string) {
    let formArr = this.validateForm.get('activityListCondition') as FormArray;
    let isTouch = formArr.at(+groupIndex).get(controlIndex).touched;
    let isDirty = formArr.at(+groupIndex).get(controlIndex).dirty;
    let isError = formArr.at(+groupIndex).get(controlIndex).errors;
    return (isTouch || isDirty) && isError ? true : false;
  }

}
