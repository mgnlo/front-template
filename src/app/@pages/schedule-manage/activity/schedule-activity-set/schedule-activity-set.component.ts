import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { StorageService } from '@api/services/storage.service';
import { DialogService } from '@api/services/dialog.service';
import { Frequency, Status, StatusResult } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { DeleteButtonComponent } from '@component/table/detail-button/delete-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog/preview-dialog.component';
import { ScheduleActivitySetting, ActivitySetting as ScheduleActivitySettingModel, ScheduleSettingEditReq, } from '@api/models/schedule-activity.model';
import { CommonUtil } from '@common/utils/common-util';
import { LoadingService } from '@api/services/loading.service';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { RestStatus } from '@common/enums/rest-enum';
import { catchError, filter, tap } from 'rxjs/operators';

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
  daily = Array.from({ length: 32 }, (_, index) => index.toString().padStart(2, '0'));
  hour = Array.from({ length: 13 }, (_, index) => index.toString().padStart(2, '0'));
  minute = Array.from({ length: 61 }, (_, index) => index.toString().padStart(2, '0'));

  //預設排程頻率
  scheduleFrequencyList = [Frequency.daily, Frequency.weekly, Frequency.monthly];
  frequencyList: Array<{ key: string; val: string }> = Object.entries(Frequency)
    .filter(([k, v]) => {
      return this.scheduleFrequencyList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設檔案存放地方
  filePathList: Array<{ key: string; val: string }> = [{ key: 'path_A', val: 'A://' }, { key: 'path_B', val: 'B:/' }, { key: 'path_C', val: 'C:\\' }, { key: '/file/path/', val: '/file/path/' }];

  //預設pup-up活動名單
  activityListSetting: Array<ActivitySetting> = ActivityListMock;//Call API
  activityList: Array<{ key: string; val: string }> = this.activityListSetting.map(m => ({ key: m.activityId, val: m.activityName }))
  filterActivityList: Array<{ key: string; val: string }> = new Array;

  //預設名單列表
  ScheduleActivitySetting: Array<ScheduleActivitySetting> = ScheduleActivitySettingMock;
  ScheduleActivitySettingModel: Array<ScheduleActivitySettingModel>;

  scheduleId: string;

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private scheduleManageService: ScheduleManageService,
    private loadingService: LoadingService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super(storageService);

    this.validateForm = new FormGroup({
      jobName: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      executionFrequency: new FormControl('daily', Validators.required),
      hour: new FormControl(null, Validators.required),
      minute: new FormControl(null, Validators.required),
      filePath: new FormControl(null, Validators.required),
    });

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = CommonUtil.getActionName(changeRouteName);

    // const state = this.router.getCurrentNavigation()?.extras?.state;
    // if (!!state) {
    //   //日期塞資料
    //   const frequencyTime = state?.frequencyTime;
    //   const frequencyTimeArray = frequencyTime.split(/[:：]/);
    //   if (frequencyTimeArray.length > 0 && state.executionFrequency) {
    //     if (state.executionFrequency?.toLowerCase() === 'daily') {
    //       this.validateForm.controls['hour'].setValue(frequencyTimeArray[0]);
    //       this.validateForm.controls['minute'].setValue(frequencyTimeArray[1]);
    //     }
    //     else {
    //       this.validateForm.controls['daily'].setValue(frequencyTimeArray[0]);
    //       this.validateForm.controls['hour'].setValue(frequencyTimeArray[1]);
    //       this.validateForm.controls['minute'].setValue(frequencyTimeArray[2]);
    //     }
    //   }
    //   //塞資料
    //   Object.keys(state).forEach(key => {
    //     if (!!this.validateForm.controls[key]) {
    //       switch (key) {
    //         default:
    //           this.validateForm.controls[key].setValue(state[key]?.toLowerCase());
    //           break;
    //       }
    //     }
    //   })
    // }

  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'col-3 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-2 alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell.toLowerCase()];
        },
        sort: false,
      },
      batchUpdateTime: {
        title: '批次更新時間',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
        sort: false,
      },
      filterOptions: {
        title: '更新結果',
        type: 'html',
        class: 'col-1 alignCenter',
        valuePrepareFunction: (cell: string) => {
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return cellLow === 'true' ? StatusResult[cellLow] : `<p class="colorRed textBold">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      delete: {
        title: '移除',
        class: 'col-1',
        type: 'custom',
        renderComponent: DeleteButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.delete.subscribe(row => {
            this.onDeleteConfirm(row); // 訂閱自訂刪除按鈕組件的 delete 事件，觸發 onDeleteConfirm 方法
          });
        },
        sort: false,
      },
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  //#region 頻率切換
  changeFrequencyType(key: string) {
    this.validateForm.patchValue({ 'hour': '', 'minute': '' });
    switch (key) {
      case 'daily':
        this.removeFieldIfExists('daily');
        break;
      case 'weekly':
      case 'monthly':
        this.addFieldIfNotExists('daily', null, Validators.required);
        break;
    }
  }
  //#endregion

  //#region 基本欄位檢核(新增/刪除)
  addFieldIfNotExists(fieldName: string, defaultValue: any, validationRules?: any) {
    if (!this.validateForm.contains(fieldName)) {
      this.validateForm.addControl(fieldName, new FormControl(defaultValue, validationRules));
    }
  }

  removeFieldIfExists(fieldName: string) {
    if (this.validateForm.contains(fieldName)) {
      this.validateForm.removeControl(fieldName);
    }
  }
  //#endregion

  //#region 刪除按鈕
  onDeleteConfirm(row: { activityId: string; }): void {
    const index = this.ScheduleActivitySettingModel.findIndex(item => item.activityId === row.activityId);
    if (index !== -1) {
      this.ScheduleActivitySettingModel.splice(index, 1);
      this.refreshFilterActivityList();
      this.dataSource.load(this.ScheduleActivitySettingModel);
    }
  }
  //#endregion

  //#region 新增
  add() {
    this.refreshFilterActivityList();
    if (this.filterActivityList.length > 0) {
      this.dialogService.open(PreviewDialogComponent, {
        title: '設定名單內容',
        dataList: this.filterActivityList,
      }).onClose.subscribe((selectedData: { key: string; val: string }) => {
        if (!!selectedData) {
          const findData = this.activityListSetting.find(f => f.activityId === selectedData.key);
          this.ScheduleActivitySettingModel.push(new ScheduleActivitySettingModel({
            activityId: findData?.activityId,
            version: findData?.version,
            activityName: findData?.activityName,
            activityDescription: findData?.activityDescription,
            filterOptions: findData?.filterOptions,
            listLimit: findData?.listLimit,
            status: findData?.status,
            startDate: findData?.startDate,
            endDate: findData?.endDate,
            createTime: findData?.createTime,
            modificationTime: findData?.modificationTime,
            scheduleSettings: findData?.scheduleSettings,
            batchUpdateTime: findData?.batchUpdateTime,
          }))
          this.refreshFilterActivityList();
          this.dataSource.load(this.ScheduleActivitySettingModel);
        }
      });;
    }
  }

  refreshFilterActivityList() {
    this.filterActivityList = this.activityList.filter(item =>
      !this.ScheduleActivitySettingModel.some(setting => setting.activityId === item.key)
    );
  }
  //#endregion

  ngOnInit(): void {
    this.scheduleId = this.activatedRoute.snapshot.params.scheduleId;
    this.dataSource = new LocalDataSource();
    this.ScheduleActivitySettingModel = this.ScheduleActivitySetting?.find(f => f.scheduleId === this.scheduleId)?.activitySetting as Array<ScheduleActivitySettingModel> ?? new Array<ScheduleActivitySettingModel>();
    this.refreshFilterActivityList();
    this.dataSource.load(this.ScheduleActivitySettingModel);

    if (!!this.scheduleId) {
      this.loadingService.open();
      this.scheduleManageService.getScheduleActivitySettingRow(this.scheduleId).pipe(
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回名單排程', ['pages', 'schedule-manage', 'schedule-activity-list']);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap((res) => {
          const frequencyTime = res.result?.frequencyTime;
          const frequencyTimeArray = frequencyTime.split(/[:：]/);
          if (frequencyTimeArray.length > 0 && res.result.executionFrequency) {
            let executionFrequency = res.result.executionFrequency?.toLowerCase();
            this.changeFrequencyType(executionFrequency);
            if (res.result.executionFrequency?.toLowerCase() === 'daily') {
              this.validateForm.get('hour').setValue(frequencyTimeArray[0]);
              this.validateForm.get('minute').setValue(frequencyTimeArray[1]);
            }
            else {
              this.validateForm.get('daily').setValue(frequencyTimeArray[0]);
              this.validateForm.get('hour').setValue(frequencyTimeArray[1]);
              this.validateForm.get('minute').setValue(frequencyTimeArray[2]);
            }
          }
          //塞資料
          Object.keys(res.result).forEach(key => {
            if (!!this.validateForm.controls[key]) {
              switch (key) {
                default:
                  this.validateForm.controls[key].setValue(res.result[key]?.toLowerCase());
                  break;
              }
            }
          })
          this.loadingService.close();
        })
      ).subscribe();
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  cancel() {
    if ((this.params['changeRoute'] ?? "") === 'edit') {
      this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-detail', this.params['scheduleId']]);
      return
    }
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }

  submit() {
    let valid = this.validateForm.valid;
    let reqData: ScheduleSettingEditReq = this.getRequestData();
    if (valid && !this.scheduleId) {
      this.loadingService.open();
      this.scheduleManageService.createScheduleSetting(reqData).pipe(
        catchError((err) => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '新增失敗', ['pages', 'schedule-manage', 'schedule-activity-list']);
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            this.dialogService.alertAndBackToList(true, '新增成功', ['pages', 'schedule-manage', 'schedule-activity-list'])
          }
        });
    } else if (valid && this.scheduleId) {
      this.loadingService.open();
      this.scheduleManageService.updateScheduleSetting(this.scheduleId, reqData).pipe(
        catchError((err) => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '編輯失敗', ['pages', 'schedule-manage', 'schedule-activity-list']);
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            this.dialogService.alertAndBackToList(true, '編輯成功', ['pages', 'schedule-manage', 'schedule-activity-list'])
          }
        });
    }
  }

  getRequestData(): ScheduleSettingEditReq {
    let reqData: ScheduleSettingEditReq = this.validateForm.getRawValue();
    let daily: string = this.validateForm.get('daily')?.value;
    let hour: string = this.validateForm.get('hour')?.value;
    let minute: string = this.validateForm.get('minute')?.value;
    let executionFrequency = this.validateForm.get('executionFrequency').value;
    reqData.frequencyTime = executionFrequency === 'daily' ? hour + ':' + minute : daily + ':' + hour + ':' + minute;
    reqData.activitySetting = JSON.parse(JSON.stringify(this.ScheduleActivitySettingModel));
    return reqData;
  }

}
