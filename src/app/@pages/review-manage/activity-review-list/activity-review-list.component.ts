import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityReviewHistory } from '@api/models/activity-list.model';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'activity-review-list',
  templateUrl: './activity-review-list.component.html',
  styleUrls: ['./activity-review-list.component.scss'],
})
export class ActivityReviewListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private reviewManageService: ReviewManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
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

    const sessionData = { page: this.paginator.nowPage, filter: filterVal };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
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
          return `<p class="left">${cell}</p>`;
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
        title: '名單有效起訖日',
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
    this.setSessionData();
    this.search('reset');
  }

  search(key?: string) {
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