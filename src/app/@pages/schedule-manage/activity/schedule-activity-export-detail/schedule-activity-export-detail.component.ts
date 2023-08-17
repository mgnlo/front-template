import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting, ScheduleActivitySetting, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, StatusResult } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { catchError, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'schedule-activity-export-detail',
  templateUrl: './schedule-activity-export-detail.component.html',
  styleUrls: ['./schedule-activity-export-detail.component.scss']
})
export class ActivityExportDetailComponent extends BaseComponent implements OnInit {
  ScheduleActivitySetting: Array<ScheduleActivitySetting> = ScheduleActivitySettingMock;
  activitySetting: ActivitySetting = ScheduleActivitySettingMock[0].activitySetting[0];
  schedule_Batch_History: Array<Schedule_Batch_History> = ScheduleActivitySettingMock[0].activitySetting[0].schedule_batch_history;

  params: any;//路由參數
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  scheduleId: string;
  activityId: string;

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleManageService: ScheduleManageService,
    private customerManageService: CustomerManageService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
    this.params = this.activatedRoute.snapshot.params;
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    tableId: 'true',
    columns: {
      historyId: {
        title: '項次',
        type: 'string',
        width: '10%',
        sort: false
      },
      batchTime: {
        title: '批次時間',
        type: 'html',
        class: 'left',
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="left">${datepipe.transform(cell,"yyyy-MM-dd HH:mm:ss")}</p>`;
        },
        sort: false,
      },
      batchResultCount: {
        title: '名單數量',
        type: 'html',
        width: '15%',
        valuePrepareFunction: (cell: string) => {
          return `<p>${cell ?? 0}</p>`;
        },
        sort: false
      },
      batchResult: {
        title: '排程結果',
        type: 'html',
        class: 'left',
        width: '49%',
        valuePrepareFunction: (cell: string) => {
          const lableName = '批次排程'
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return `<p class="left ${ColumnClass[cellLow]}">${lableName}${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '匯出',
        type: 'custom',
        width: '1%',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = { btnStatus: 'success', btnIcon: 'cloud-download-outline' }
          instance.emitter.subscribe((res: Schedule_Batch_History) => {
            // TODO: download
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

  ngOnInit(): void {

    this.scheduleId = this.activatedRoute.snapshot.params.scheduleId;
    this.activityId = this.activatedRoute.snapshot.params.activityId;

    this.customerManageService.getActivitySettingRow(this.activityId).pipe(
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查無此筆活動排程', ['pages', 'schedule-manage', 'schedule-activity-detail']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.activitySetting = JSON.parse(JSON.stringify(res.result));
        this.loadingService.close();
      }),
    ).subscribe();

    let searchInfo: SearchInfo = {
      apiUrl: this.scheduleManageService.batchFunc + this.activityId,
      nowPage: this.paginator.nowPage,
      errMsg: '查無此筆排程紀錄'
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-detail', this.params.scheduleId]);
  }

}