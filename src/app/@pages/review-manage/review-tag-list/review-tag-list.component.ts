import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TagReviewHistory, TagSetting } from '@api/models/tag-manage.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { TagType } from '@common/enums/tag-enum';
import { ReviewTagListMock } from '@common/mock-data/tag-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'review-tag-list',
  templateUrl: './review-tag-list.component.html',
  styleUrls: ['./review-tag-list.component.scss'],
})
export class ReviewTagListComponent extends BaseComponent implements OnInit {

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
      tagName: new FormControl(''),
      reviewStatus: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);
  }

  statusList: Array<{ key: string; val: string }> = Object.entries(ReviewStatus).map(([k, v]) => ({ key: k, val: v }))
  selected: string = '';
  mockData: Array<TagReviewHistory> = ReviewTagListMock;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
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
      tagName: {
        title: '標籤名稱',
        type: 'string',
        sort: false,
      },
      tagType: {
        title: '類型',
        type: 'html',
        class: 'text_center min_w100',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (TagType[cell] || '') + `</p>`;
        },
        sort: false,
      },
      department: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center min_w150',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'html',
        class: 'text_center min_w150',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false,
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        valuePrepareFunction: (cell: string) => {
          return `<p>${(cell ?? "")}</p>`;
        },
        sort: false,
      },
      modificationTime: {
        title: '標籤有效起迄日',
        type: 'html',
        class: 'text_center min_w250',
        valuePrepareFunction: (cell: any, row: TagSetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row?.startDate} ~ ${row?.endDate}</p>` : '';
        },
        sort: false,
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        class: 'text_center min_w100',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center ${(ColumnClass[cell] || '')}">` + (ReviewStatus[cell] || '') + `</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'center',
        width: '3rem',
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

  reset() {
    this.validateForm.reset({ tagName: '', reviewStatus: '', startDate: null, endDate: null });
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
      this.dataSource.load(ReviewTagListMock);
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
      apiUrl: this.reviewManageService.tagReviewFunc,
      nowPage: page,
      filters: this.validateForm.getRawValue(),
      errMsg: '名單審核查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }
}
