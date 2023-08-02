import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  ActivitySetting } from '@api/models/activity-list.model';
import { StorageService } from '@api/services/storage.service';
import { DialogService } from '@api/services/dialog.service';
import { Frequency, Status, StatusResult } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { DeleteButtonComponent } from '@component/table/detail-button/delete-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog/preview-dialog.component';
import { ScheduleActivitySetting, ActivitySetting as ScheduleActivitySettingModel,  } from '@api/models/schedule-activity.model';
import { CommonUtil } from '@common/utils/common-util';

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
  scheduleFrequencyList = [Frequency.daily, Frequency.weekly, Frequency.monthly];
  frequencyList: Array<{ key: string; val: string }> = Object.entries(Frequency)
    .filter(([k, v]) => {
      return this.scheduleFrequencyList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設檔案存放地方
  filePathList: Array<{ key: string; val: string }> = [{ key: 'path_A', val: 'A://' }, { key: 'path_B', val: 'B:/' }, { key: 'path_C', val: 'C:\\' }];

  //預設pup-up活動名單
  activityListSetting: Array<ActivitySetting> = ActivityListMock;//Call API
  activityList: Array<{ key: string; val: string }> = this.activityListSetting.map(m => ({ key: m.activityId, val: m.activityName }))
  filterActivityList: Array<{ key: string; val: string }> = new Array;

  //預設名單列表
  ScheduleActivitySetting: Array<ScheduleActivitySetting> = ScheduleActivitySettingMock;
  ScheduleActivitySettingModel: Array<ScheduleActivitySettingModel>;

  constructor(private router: Router,
    storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private readonly changeDetectorRef: ChangeDetectorRef) {
    super(storageService);

    this.validateForm = new FormGroup({
      jobName: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      frequency: new FormControl('daily', Validators.required),
      hour: new FormControl(null, Validators.required),
      minute: new FormControl(null, Validators.required),
      file_path: new FormControl(null, Validators.required),
    });

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);

    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (!!state) {
      Object.keys(state).forEach(key => {
        if (key === 'activitySetting') {
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
        if (this.validateForm.contains('daily')) {
          this.removeField('daily');
        }
        break;
      case 'weekly':
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

  //#region 刪除按鈕
  onDeleteConfirm(row: { activityId: string; }): void {
    //if (window.confirm('確定要刪除這筆資料嗎？')) {
    const index = this.ScheduleActivitySettingModel.findIndex(item => item.activityId === row.activityId);
    if (index !== -1) {
      this.ScheduleActivitySettingModel.splice(index, 1);
      this.refreshFilterActivityList();
      this.dataSource.load(this.ScheduleActivitySettingModel);
    }
    //}
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
    this.dataSource = new LocalDataSource();
    this.ScheduleActivitySettingModel = this.ScheduleActivitySetting?.find(f => f.scheduleId === this.params['scheduleId'])?.activitySetting as Array<ScheduleActivitySettingModel> ?? new Array<ScheduleActivitySettingModel>();
    this.refreshFilterActivityList();
    this.dataSource.load(this.ScheduleActivitySettingModel);
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
