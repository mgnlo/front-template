import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ScheduleDetailView, ScheduleSetting, ActivitySetting, Schedule_Batch_History } from '@api/models/schedule-manage.model';
import { Filter, Status } from '@common/enums/common-enum';
import { ScheduleSettingMock } from '@common/mock-data/schedule-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
  detail: ScheduleDetailView;
  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合
  mockData: Array<ScheduleSetting> = ScheduleSettingMock;
  activitySetting: Array<ActivitySetting> = ScheduleSettingMock[0].activitySetting;

  constructor(private router: Router) {
    super();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!!currentNavigation?.extras) {
      const state = currentNavigation.extras.state;
      const processedData = CommonUtil.getHistoryProcessData<ScheduleSetting>('scheduleReviewHistory', state as ScheduleSetting); // 異動歷程處理
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail = processedData.detail;
      }
      else {
        //之後可能加導頁pop-up提醒
        this.router.navigate(['pages', 'schedule-manage', 'schedule-list']);
      }
    }
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    selectMode: 'multi',
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'left',
        width: '30%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        width: '30%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      batchUpdateTime: {
        title: '批次更新時間',
        type: 'string',
        width: '15%',
        sort: false,
      },
      filterOptions: {
        title: '更新結果',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Filter[cell];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: Schedule_Batch_History) => row,
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
    this.dataSource.load(this.activitySetting);
  }

  refresh() {

  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-set', 'edit', this.detail.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-list']);
  }
}



@Component({
  selector: 'activity-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ActivityButtonComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() value: Schedule_Batch_History;

  ngOnInit() { }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(['pages', 'schedule-manage', 'activity-detail'], passData);
  }
}
