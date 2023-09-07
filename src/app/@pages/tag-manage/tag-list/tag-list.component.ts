import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagSetting } from '@api/models/tag-manage.model';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { TagType } from '@common/enums/tag-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { TagManageService } from '../tag-manage.service';
import { CommonUtil } from '@common/utils/common-util';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends BaseComponent implements OnInit {
  isSearch: Boolean = false;

  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  TagType: TagType

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private tagManageService: TagManageService,
    private activatedRoute: ActivatedRoute,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);
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
        sort: false
      },
      tagType: {
        title: '類型',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (TagType[cell] || '') + `</p>`;
        },
        sort: false,
      },
      department: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'html',
        class: 'text_center',
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
      during: {
        title: '標籤有效起迄日',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: TagSetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row?.startDate} ~ ${row?.endDate}</p>` : '';
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (Status[cell] || '') + `</p>`;
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

  reset() {
    this.validateForm.reset({ tagName: '', status: '', startDate: null, endDate: null, });
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
      this.dataSource.load(TagSettingMock);
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
      apiUrl: this.tagManageService.tagFunc,
      nowPage: page,
      filters: this.validateForm.getRawValue(),
      errMsg: '標籤列表查無資料',
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  add() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set']);
  }

}

