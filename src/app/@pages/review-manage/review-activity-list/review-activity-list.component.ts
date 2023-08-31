import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityReviewHistory } from '@api/models/activity-list.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { ReviewActivityListMock } from '@common/mock-data/activity-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'review-activity-list',
  templateUrl: './review-activity-list.component.html',
  styleUrls: ['./review-activity-list.component.scss'],
})
export class ReviewActivityListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private reviewManageService: ReviewManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    // 篩選條件
    this.validateForm = new FormGroup({
      activityName: new FormControl(''),
      reviewStatus: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);

    this.sessionKey = this.activatedRoute.snapshot.routeConfig.path;
  }

  isSearch: Boolean = false;

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    this.setSessionData();
  }

  setSessionData() {
    const filterVal = this.isSearch ? this.validateForm.getRawValue() :
      this.storageService.getSessionVal(this.sessionKey)?.filter ?? this.validateForm.getRawValue();

    this.setSessionVal({ page: this.paginator.nowPage, filter: filterVal });
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
        class: 'left',
        sort: false,
        width: '20%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        sort: false,
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${!!cell ? cell : ''}</p>`;
        },
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        sort: false,
        width: '5%',
        renderComponent: CheckboxIconComponent,
      },
      listLimit: {
        title: '名單上限',
        type: 'string',
        sort: false,
        width: '5%'
      },
      modificationTime: {
        title: '名單有效起迄日',
        type: 'string',
        width: '20%',
        sort: false,
        valuePrepareFunction: (cell: string, row: ActivityReviewHistory) => {
          return row.startDate + '~' + row.endDate;
        }
      },
      type: {
        title: '異動類型',
        type: 'string',
        width: '10%',
        sort: false
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
        valuePrepareFunction: (cell, row: ActivityReviewHistory) => row,
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

  reset() {
    this.validateForm.reset({ activityName: '', reviewStatus: '', startDate: null, endDate: null });
    this.isSearch = true;
    this.paginator.nowPage = 1;
    this.setSessionData();
    this.search('reset');
  }

  search(key?: string) {

    if (this.isMock) {
      this.dataSource.reset();
      let filter = this.validateForm.getRawValue();
      for (const [k, v] of Object.entries(filter).filter(([key, val]) => !!val)) {
        this.dataSource.addFilter({ field: k, filter: undefined, search: v });
      }
      this.dataSource.load(ReviewActivityListMock);
      return;
    }

    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);

    this.isSearch = false;
    if (key === 'search') this.isSearch = true;

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;

    let page = this.paginator.nowPage;

    if (key !== 'search' && !!getSessionVal?.filter) {
      page = getSessionVal.page;
      CommonUtil.initializeFormWithSessionData(this.validateForm, getSessionVal);
    }

    if (key !== 'reset') this.setSessionData();

    let searchInfo: SearchInfo = {
      apiUrl: this.reviewManageService.activityReviewFunc,
      nowPage: page,
      filters: this.validateForm.getRawValue(),
      errMsg: '客群名單審核查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }
}
