import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagSetting } from '@api/models/activity-list.model';
import { ScheduleDetailView, ScheduleSetting } from '@api/models/schedule-manage.model';
import { Status } from '@common/enums/common-enum';
import { CommonUtil } from '@common/utils/common-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { Paginator } from '@component/table/paginator/paginator.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
  detail: ScheduleDetailView;
  checkData: ScheduleSetting;
  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合

  tagDtaSource: LocalDataSource = new LocalDataSource(); //table
  tagPaginator: Paginator = { totalCount: 0, nowPage: 1, perPage: 10, totalPage: 1, rowStart: 0, rowEnd: 0 };  //table筆數顯示

  activityDtaSource: LocalDataSource = new LocalDataSource(); //table
  activityPaginator: Paginator = { totalCount: 0, nowPage: 1, perPage: 10, totalPage: 1, rowStart: 0, rowEnd: 0 };  //table筆數顯示

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

  tagGridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    selectMode: 'multi',
    columns: {
      tagName: {
        title: '標籤名稱',
        type: 'html',
        class: 'left',
        width: '20%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        class: 'left',
        width: '39%',
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
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
      },
      refreshStatus: {
        title: '更新結果',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: TagSetting) => row,
        renderComponent: DetailButtonComponent,
        sort: false,
      },
    },
    hideSubHeader: true,
    actions: {
      select: true,
      add: false,
      edit: false,
      delete: false,
    },
  };

  activityGridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    selectMode: 'multi',
    columns: {
      tagName: {
        title: '活動名稱',
        type: 'html',
        class: 'left',
        width: '20%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      tagDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        width: '39%',
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
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
      },
      refreshStatus: {
        title: '更新結果',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: TagSetting) => row,
        renderComponent: DetailButtonComponent,
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
  }

  ngDoCheck(): void {
    // this.updateSchedulePageInfo(this.tagDtaSource, this.tagPaginator)
    // this.updateSchedulePageInfo(this.activityDtaSource, this.activityPaginator)
  }

  updateSchedulePageInfo(dataSource: any, paginator: Paginator) {
    if (!!dataSource) {
      dataSource.onChanged().subscribe(() => {
        paginator.totalCount = dataSource.count();
        let page = dataSource.getPaging().page;
        let perPage = dataSource.getPaging().perPage;
        paginator.nowPage = page;
        paginator.totalPage = Math.ceil(paginator.totalCount / perPage);
        paginator.rowStart = (page - 1) * perPage + 1;
        paginator.rowEnd = paginator.totalPage !== page ? page * perPage : (page - 1) * perPage + paginator.totalCount % perPage;
      });
    }
  }

  tagRefresh() {

  }

  activityRefresh() {

  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-set', 'edit', this.detail.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-list']);
  }
}
