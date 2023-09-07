import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting as scheduleActivitySetting, ScheduleActivitySetting, ScheduleActivitySettingEditReq } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Frequency, Status, StatusResult, chineseWeekDayValues } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, finalize, tap } from 'rxjs/operators';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog/preview-dialog.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { of } from 'rxjs';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { ConfigService } from '@api/services/config.service';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'schedule-activity-set',
  templateUrl: './schedule-activity-set.component.html',
  styleUrls: ['./schedule-activity-set.component.scss']
})
export class ScheduleAddComponent extends BaseComponent implements OnInit {
  Status = Status;
  Frequency = Frequency;

  params: any;//路由參數
  changeRouteName: string;
  actionName: string;// 新增/編輯/複製

  //預設下拉時間日期
  weekDailyList: Array<{ key: string; val: string }> = Array.from(
    { length: 7 },
    (_, index) => ({ key: (index + 1).toString().padStart(2, '0'), val: chineseWeekDayValues[index] })
  );

  chineseEndMonth: string = '月底';
  monthDailyList: Array<{ key: string; val: string }> = Array.from(
    { length: 31 },
    (_, index) => ({ key: (index + 1).toString().padStart(2, '0'), val: (index + 1).toString().padStart(2, '0') })
  ).concat({ key: '999', val: this.chineseEndMonth });

  hourList: Array<{ key: string; val: string }> = Array.from(
    { length: 24 },
    (_, index) => ({ key: index.toString().padStart(2, '0'), val: index.toString().padStart(2, '0') })
  );
  minuteList: Array<{ key: string; val: string }> = Array.from(
    { length: 60 },
    (_, index) => ({ key: index.toString().padStart(2, '0'), val: index.toString().padStart(2, '0') })
  );

  //預設排程頻率
  scheduleFrequencyList = [Frequency.daily, Frequency.weekly, Frequency.monthly];
  frequencyList: Array<{ key: string; val: string }> = Object.entries(Frequency)
    .filter(([k, v]) => {
      return this.scheduleFrequencyList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設pup-up活動名單
  activityList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();
  filterActivityList: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();
  activityListTemp: Array<{ key: string; val: string }> = new Array<{ key: string; val: string }>();

  //預設名單列表
  scheduleActivitySettingGrid: Array<scheduleActivitySetting> = new Array<scheduleActivitySetting>();

  //全活動名單
  ActivitySettingArray: Array<scheduleActivitySetting> = new Array<scheduleActivitySetting>();

  scheduleId: string;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private scheduleManageService: ScheduleManageService,
    private customerManageService: CustomerManageService,
    private loadingService: LoadingService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    super(storageService, configService, loginService);

    this.validateForm = new FormGroup({
      jobName: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      status: new FormControl(null, Validators.required),
      executionFrequency: new FormControl(null, Validators.required),
      hour: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      minute: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
      filePath: new FormControl(null, [Validators.required, ValidatorsUtil.blank]),
    });

  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'string',
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        valuePrepareFunction: (cell: string) => {
          return `<p>${(cell ?? "")}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center w100',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center">${(Status[cell?.toLowerCase()] || '')}</p>`;
        },
        sort: false,
      },
      batchUpdateTime: {
        title: '批次更新時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="text_center">` + datepipe.transform(cell, "yyyy-MM-dd HH:mm:ss") + `</p>`;

        },
        sort: false,
      },
      filterOptions: {
        title: '更新結果',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return `<p class="text_center ${(ColumnClass[cellLow] || '')}">${(StatusResult[cellLow] || '')}</p>`;
        },
        sort: false,
      },
      delete: {
        title: '移除',
        type: 'custom',
        class: 'center',
        width: '3rem',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = { btnStatus: 'danger', btnIcon: 'trash-2-outline' }
          instance.emitter.subscribe((row) => {
            this.onDeleteConfirm(row); // 訂閱自訂刪除按鈕組件的 delete 事件，觸發 onDeleteConfirm 方法
          })
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
  changeFrequencyType(key: string, frequencyTimeArray?: string[]) {
    this.removeFieldIfExists('daily');
    this.removeFieldIfExists('hour');
    this.removeFieldIfExists('minute');
    switch (key) {
      case 'daily':
        this.addFieldIfNotExists('hour', frequencyTimeArray?.[0], [Validators.required, ValidatorsUtil.blank]);
        this.addFieldIfNotExists('minute', frequencyTimeArray?.[1], [Validators.required, ValidatorsUtil.blank]);
        break;
      case 'weekly':
      case 'monthly':
        this.addFieldIfNotExists('daily', frequencyTimeArray?.[0], [Validators.required, ValidatorsUtil.blank]);
        this.addFieldIfNotExists('hour', frequencyTimeArray?.[1], [Validators.required, ValidatorsUtil.blank]);
        this.addFieldIfNotExists('minute', frequencyTimeArray?.[2], [Validators.required, ValidatorsUtil.blank]);
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
    const index = this.scheduleActivitySettingGrid.findIndex(item => item.activityId === row.activityId);
    if (index !== -1) {
      const temp = this.scheduleActivitySettingGrid.find(item => item.activityId === row.activityId)
      this.activityListTemp.push({ key: temp.activityId, val: temp.activityName })
      this.scheduleActivitySettingGrid.splice(index, 1);
      this.dataSource.load(this.scheduleActivitySettingGrid);
    }
  }
  //#endregion

  //#region 新增
  add() {
    this.loadingService.open();

    const route = this.scheduleId ? ['edit', this.scheduleId] : [];
    const routePath = ['pages', 'schedule-manage', 'schedule-activity-set', ...route];
    this.customerManageService.getActivitySettingList().pipe(
      catchError(err => {
        this.handleErrorResponse(err, `查詢名單列表${this.actionName}失敗`, routePath)
        return of(null);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        const activityListSetting: Array<scheduleActivitySetting> = JSON.parse(JSON.stringify(res.result?.content));
        const activitySettingArray = [...this.ActivitySettingArray, ...activityListSetting]
        // console.info('activitySettingArray', activitySettingArray)
        this.activityList = activityListSetting.map(m => ({ key: m.activityId, val: m.activityName }));

        this.refreshFilterActivityList();

        if (this.filterActivityList.length <= 0) {
          this.dialogService.alertAndBackToList(false, `新增名單列表為空`, this.getBackRoute());
          return;
        }

        this.openPreviewDialog(activitySettingArray);
      }),
      finalize(() => this.loadingService.close())
    ).subscribe();
  }

  handleErrorResponse(err: any, message: string, route: Array<any>) {
    this.dialogService.alertAndBackToList(false, message, route);
    throw new Error(err.message);
  }

  openPreviewDialog(allActivityArray: Array<scheduleActivitySetting>) {
    this.dialogService.open(PreviewDialogComponent, {
      title: '設定名單內容',
      dataList: this.filterActivityList,
    }).onClose.subscribe((selectedData: { key: string; val: string }) => {
      if (!!selectedData) {
        this.activityListTemp = this.activityListTemp.filter(s => s.key !== selectedData.key);

        const findData = allActivityArray.find(f => f.activityId?.toLowerCase() === selectedData.key?.toLowerCase());
        if (!findData) {
          const route = this.scheduleId ? ['edit', this.scheduleId] : [];
          const routePath = ['pages', 'schedule-manage', 'schedule-activity-set', ...route];
          this.handleErrorResponse(null, `查詢名單列表${this.actionName}失敗`, routePath);
          return;
        }

        this.scheduleActivitySettingGrid.push(new scheduleActivitySetting(findData));
        this.dataSource.load(this.scheduleActivitySettingGrid);
      }
    });
  }

  getBackRoute(): string[] {
    const route = this.scheduleId ? ['edit', this.scheduleId] : [];
    return ['pages', 'schedule-manage', 'schedule-activity-set', ...route];
  }

  //#endregion

  //#region 塞選不重複資料
  refreshFilterActivityList() {
    if (this.activityListTemp && this.activityListTemp.length > 0) {
      this.filterActivityList = [...this.activityListTemp, ...this.activityList]
    }

    this.filterActivityList = this.activityList.filter(item =>
      !this.scheduleActivitySettingGrid.some(setting => setting.activityId === item.key)
      && CommonUtil.isNotBlank(item.key) && CommonUtil.isNotBlank(item.val)
    );
  }
  //#endregion

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.params;
    this.changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = CommonUtil.getActionName(this.changeRouteName);
    this.scheduleId = this.params?.['scheduleId'];

    this.dataSource = new LocalDataSource();
    if (!!this.scheduleId) {

      if (this.isMock) {
        let mockData = ScheduleActivitySettingMock.find(schedule => schedule.scheduleId === this.scheduleId)
        this.setData(mockData);
        this.loadingService.close();
        return;
      }

      this.loadingService.open();
      this.scheduleManageService.getScheduleActivitySettingDetail(this.scheduleId).pipe(
        catchError(err => {
          this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回名單排程', ['pages', 'schedule-manage', 'schedule-activity-list']);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap((res) => {
          const result = JSON.parse(JSON.stringify(res.result)) as ScheduleActivitySetting;
          this.setData(result);
          this.loadingService.close();
        })
      ).subscribe();

      return
    }

    this.validateForm.get('executionFrequency').setValue('daily');

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
    const valid = this.validateForm.valid;
    const reqData: ScheduleActivitySettingEditReq = this.getRequestData();

    if (!valid || !reqData) {
      const route = this.scheduleId ? [this.changeRouteName, this.scheduleId] : [];
      this.dialogService.alertAndBackToList(false, `${this.actionName}驗證失敗`, ['pages', 'schedule-manage', 'schedule-activity-set', ...route]);
      return
    }

    if (this.isMock) {
      this.dialogService.alertAndBackToList(true, `${this.actionName}成功`, ['pages', 'schedule-manage', 'schedule-activity-list']);
      this.loadingService.close();
      return;
    }

    // 調用(新增or複製)或編輯
    this.saveScheduleActivity(reqData);

  }

  saveScheduleActivity(reqData: any) {
    this.loadingService.open();

    const requestObservable = (this.scheduleId && this.changeRouteName === 'edit')
      ? this.scheduleManageService.updateScheduleActivitySetting(this.scheduleId, reqData)
      : this.scheduleManageService.createScheduleActivitySetting(reqData);

    requestObservable.pipe(
      catchError((err) => {
        const route = this.scheduleId ? [this.changeRouteName, this.scheduleId] : [];
        this.dialogService.alertAndBackToList(false, `${this.actionName}失敗 ${err}`, ['pages', 'schedule-manage', 'schedule-activity-set', ...route]);
        throw new Error(err.message);
      }),
      filter((res) => res.code === RestStatus.SUCCESS),
      tap(res => {
        // console.info(res);
        this.dialogService.alertAndBackToList(true, `${this.actionName}成功`, ['pages', 'schedule-manage', 'schedule-activity-list']);
      }),
      finalize(() => this.loadingService.close())
    ).subscribe();
  }

  getRequestData(): ScheduleActivitySettingEditReq {
    let reqData: ScheduleActivitySettingEditReq = this.validateForm.getRawValue();
    let daily: string = this.validateForm.get('daily')?.value;
    let hour: string = this.validateForm.get('hour')?.value;
    let minute: string = this.validateForm.get('minute')?.value;
    let executionFrequency = this.validateForm.get('executionFrequency').value;
    reqData.frequencyTime = executionFrequency === 'daily' ? hour + ':' + minute : daily + ':' + hour + ':' + minute;
    reqData.activityIds = this.scheduleActivitySettingGrid.map(activitySetting => activitySetting.activityId);
    console.info('reqData', reqData);

    return reqData;
  }

  setData(result: ScheduleActivitySetting) {
    const frequencyTime = result?.frequencyTime;
    const frequencyTimeArray = frequencyTime.split(/[:：]/);
    if (frequencyTimeArray.length > 0 && result.executionFrequency) {
      let executionFrequency = result.executionFrequency?.toLowerCase();
      this.changeFrequencyType(executionFrequency, frequencyTimeArray);
    }

    //塞資料
    Object.keys(result).forEach(key => {
      if (!!this.validateForm.controls[key]) {
        //console.info(key, result[key])
        this.validateForm.controls[key].setValue(result[key]);
      } else if (key === 'activitySetting') {
        this.scheduleActivitySettingGrid = result[key];
        //去重
        this.scheduleActivitySettingGrid = Array.from(new Set(this.scheduleActivitySettingGrid.map(obj => obj.activityId))).map(activityId => {
          return this.scheduleActivitySettingGrid.find(obj => obj.activityId === activityId);
        });
        //存取以利後續查詢
        this.ActivitySettingArray = [...this.scheduleActivitySettingGrid];
        // console.info('this.scheduleActivitySettingGrid ', this.scheduleActivitySettingGrid)
      }
      this.dataSource.load(this.scheduleActivitySettingGrid);
    })
  }

}
