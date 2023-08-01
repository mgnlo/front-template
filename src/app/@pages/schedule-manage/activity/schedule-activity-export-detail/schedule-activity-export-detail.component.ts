import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActivitySetting, ScheduleActivitySetting, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { StorageService } from '@api/services/storage.service';
import { StatusResult } from '@common/enums/common-enum';
import { ScheduleSettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-activity-export-detail',
  templateUrl: './schedule-activity-export-detail.component.html',
  styleUrls: ['./schedule-activity-export-detail.component.scss']
})
export class ActivityDetailComponent extends BaseComponent implements OnInit {
  ScheduleActivitySetting: Array<ScheduleActivitySetting> = ScheduleSettingMock;
  activitySetting: ActivitySetting = ScheduleSettingMock[0].activitySetting[0];
  schedule_Batch_History: Array<Schedule_Batch_History> = ScheduleSettingMock[0].activitySetting[0].schedule_batch_history;

  params: any;//路由參數
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
    super();
    this.params = this.activatedRoute.snapshot.params;
  }

  ngAfterViewInit(): void {
    //get session page
    let storage = this.storageService.getSessionVal(this.sessionKey);
    if (!!storage?.page) {
      this.dataSource.setPage(storage.page);
    }
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
          return cellLow === 'success' ? `<p class="left">${lableName}${StatusResult[cellLow]}</p>` : `<p class="left colorRed textBold">${lableName}${StatusResult[cellLow]}</p>`;
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
