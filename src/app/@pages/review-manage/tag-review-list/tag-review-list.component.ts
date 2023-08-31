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
import { TagReviewListMock } from '@common/mock-data/tag-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'tag-review-list',
  templateUrl: './tag-review-list.component.html',
  styleUrls: ['./tag-review-list.component.scss'],
})
export class TagReviewListComponent extends BaseComponent implements OnInit {

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
  mockData: Array<TagReviewHistory> = TagReviewListMock;
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
        type: 'html',
        width: '20%',
        class: 'left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      tagType: {
        title: '類型',
        type: 'string',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `${TagType[cell]}`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'string',
        width: '15%',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        width: '5%',
        sort: false,
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        width: '20%',
        class: 'left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${!!cell ? cell : ''}</p>`;
        },
        sort: false,
      },
      modificationTime: {
        title: '標籤有效起迄日',
        type: 'string',
        width: '20%',
        sort: false,
        valuePrepareFunction: (cell: string, row: TagSetting) => {
          return row.startDate + '~' + row.endDate;
        }
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '9%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ColumnClass[cell]}">${ReviewStatus[cell]}</span>`;
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
      this.dataSource.load(TagReviewListMock);
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
