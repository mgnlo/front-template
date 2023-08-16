import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '../customer-manage.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {
  isSearch: Boolean = false;

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerManageService: CustomerManageService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
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
        type: 'html',
        class: 'left',
        width: '20%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        width: '30%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        width: '5%',
        sort: false,
        renderComponent: CheckboxIconComponent,
      },
      listLimit: {
        title: '名單上限',
        type: 'string',
        width: '10%',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        width: '10%',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起訖時間',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
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
    let sessionData = { page: this.paginator.nowPage, filter: this.validateForm.getRawValue() };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  add() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set']);
  }

  reset() {
    this.validateForm.reset({ activityName: '', status: '', startDate: null, endDate: null });
    this.setSessionData();
    this.search('reset');
  }

  search(key?: string) {
    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;
    let page = this.paginator.nowPage;

    if (key !== 'search' && !!getSessionVal) {
      page = getSessionVal.page;
      Object.keys(getSessionVal.filter).forEach(key => {
        if (!!this.validateForm.controls[key]) {
          this.validateForm.controls[key].patchValue(getSessionVal.filter[key]);
        }
      });
    }

    if (key !== 'reset') this.setSessionData();

    let searchInfo: SearchInfo = {
      apiUrl: this.customerManageService.activityFunc,
      nowPage: page,
      filters: this.isSearch ? getSessionVal.filter : this.validateForm.getRawValue(),
      errMsg: '活動列表查無資料',
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
  }
}
