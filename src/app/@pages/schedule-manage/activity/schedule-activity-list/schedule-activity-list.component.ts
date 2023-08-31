import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleActivitySetting } from '@api/models/schedule-activity.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Frequency, Status, chineseWeekDayValues } from '@common/enums/common-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '../../schedule-manage.service';
import { CommonUtil } from '@common/utils/common-util';

@Component({
  selector: 'schedule-activity-list',
  templateUrl: './schedule-activity-list.component.html',
  styleUrls: ['./schedule-activity-list.component.scss']
})
export class ScheduleListComponent extends BaseComponent implements OnInit {

  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleManageService: ScheduleManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
  }

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
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      activityCount: {
        title: '名單數量',
        type: 'string',
        width: '15%',
        valuePrepareFunction: (cell: string, row: ScheduleActivitySetting) => {
          return row.activitySetting.length;
        },
        sort: false
      },
      executionFrequency: {
        title: '執行頻率',
        type: 'html',
        width: '25%',
        valuePrepareFunction: (cell: string, row: ScheduleActivitySetting) => {
          return CommonUtil.processExecutionFrequency(cell, row.frequencyTime);
        },
        sort: false,
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '15%',
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        width: '10%',
        valuePrepareFunction: (cell: string) => {
          return Status[cell?.toLowerCase()];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: ScheduleActivitySetting) => row,
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

    if (this.isMock) {
      this.dataSource.load(ScheduleActivitySettingMock);
      return;
    }

    const page = this.storageService.getSessionVal(this.sessionKey)?.page;
    let searchInfo: SearchInfo = {
      apiUrl: this.scheduleManageService.scheduleFunc,
      nowPage: page ? page : this.paginator.nowPage,
      //filters: this.validateForm.getRawValue(),
      errMsg: '排程列表查無資料',
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  add() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-set']);
  }
}
