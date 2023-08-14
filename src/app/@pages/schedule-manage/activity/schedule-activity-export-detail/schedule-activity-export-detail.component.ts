import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting, ScheduleActivitySetting, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, StatusResult } from '@common/enums/common-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

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

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
          return `<span class="left">${cell}</span>`;
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
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ActivityButtonComponent,
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
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.schedule_Batch_History);
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-detail', this.params.scheduleId]);
  }

}


@Component({
  selector: 'activity-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="download()"><nb-icon icon="cloud-download-outline"></nb-icon></button>'
})
export class ActivityButtonComponent implements OnInit {

  constructor(private router: Router) { }

  //@Input() value: Schedule_Batch_History;

  ngOnInit() { }

  download() {

  }
}
