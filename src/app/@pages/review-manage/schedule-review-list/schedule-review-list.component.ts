import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleReviewHistory } from '@api/models/schedule-activity.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Frequency } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { ScheduleReviewHistoryMock } from '@common/mock-data/schedule-review-mock';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'app-schedule-review-list',
  templateUrl: './schedule-review-list.component.html',
  styleUrls: ['./schedule-review-list.component.scss']
})
export class ScheduleReviewListComponent extends BaseComponent implements OnInit {

  mockData: Array<ScheduleReviewHistory> = ScheduleReviewHistoryMock;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private reviewManageService: ReviewManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    this.sessionKey = this.activatedRoute.snapshot.routeConfig.path;
  }

  isSearch: boolean = false;

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      jobName: {
        title: '作業名稱',
        type: 'html',
        class: 'left',
        sort: false,
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      frequency: {
        title: '執行頻率',
        type: 'html',
        width: '30%',
        class: 'left',
        valuePrepareFunction: (cell: string, row: ScheduleReviewHistory) => {
          return `<p class="left">${Frequency[row.executionFrequency]} ${row.frequencyTime}</p>`;
        },
        sort: false,
      },
      type: {
        title: '異動類型',
        type: 'string',
        sort: false,
        width: '15%',
      },
      reviewer: {
        title: '變更人員',
        type: 'string',
        sort: false,
        width: '15%'
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ColumnClass[cell]}">${ReviewStatus[cell]}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: ScheduleReviewHistory) => row,
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
    this.search();
  }

  ngOnDestroy(): void {
    this.setSessionData();
  }

  setSessionData() {
    const sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  reset() {
    this.isSearch = true;
    this.paginator.nowPage = 1;
    this.setSessionData();
    this.search('reset');
  }

  search(key?: string) {

    if (this.isMock) {
      this.dataSource.load(ScheduleReviewHistoryMock);
      return;
    }

    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);

    this.isSearch = false;

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;

    let page = this.paginator.nowPage;

    if (key !== 'search' && !!getSessionVal?.page) {
      page = getSessionVal.page;
    }

    if (key !== 'reset') this.setSessionData();

    let searchInfo: SearchInfo = {
      apiUrl: this.reviewManageService.scheduleReviewFunc,
      nowPage: page,
      errMsg: '名單排程審核查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }

}
