import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '../customer-manage.service';
import { CommonUtil } from '@common/utils/common-util';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {
  isSearch: Boolean = false;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerManageService: CustomerManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    // 篩選條件
    this.validateForm = new FormGroup({
      activityName: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);

    this.sessionKey = this.activatedRoute.snapshot.routeConfig.path;
  }

  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }));

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'string',
        sort: false,
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        valuePrepareFunction: (cell: string) => {
          return `<p>${(cell ?? "")}</p>`;
        },
        sort: false,
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        width: '3rem',
        renderComponent: CheckboxIconComponent,
        sort: false,
      },
      listLimit: {
        title: '名單上限',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + (value ?? "") + `</p>`;
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
      during: {
        title: '起迄時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row?.startDate} ~ ${row?.endDate}</p>` : '';
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'center',
        width: '3rem',
        valuePrepareFunction: (cell, row: ActivitySetting) => row,
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

  add() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set']);
  }

  reset() {
    this.validateForm.reset({ activityName: '', status: '', startDate: null, endDate: null });
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
      this.dataSource.load(ActivityListMock);
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
      apiUrl: this.customerManageService.activityFunc,
      nowPage: page,
      filters: this.validateForm.getRawValue(),
      errMsg: '活動列表查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }

}
