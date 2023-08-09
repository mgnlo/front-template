import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { CommonServerDataSource } from '@common/ng2-smart-table/common-server-data-source';
import { Status } from '@common/enums/common-enum';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { takeUntil } from 'rxjs/operators';
import { CustomerManageService } from '../customer-manage.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private dateService: NbDateService<Date>,
    private activatedRoute: ActivatedRoute,
    private customerManageService: CustomerManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,) {
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

  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage, filter: this.validateForm.getRawValue() };
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
        class: 'col-2 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        class: 'col-1',
        sort: false,
        renderComponent: CheckboxIconComponent,
      },
      listLimit: {
        title: '名單上限',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: ActivitySetting) => row,
        renderComponent: DetailButtonComponent,
        sort: false,
      },
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    // rowClassFunction: (row: Row) => {
    //   console.info(row.getData().status)
    //   return row.getData().status === 'ing' ? 'aa' : '';
    // },
  };

  add() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set']);
  }

  reset() {
    this.validateForm.reset({ activityName: '', status: '', startDate: null, endDate: null });
    this.search();
  }

  search() {
    this.restDataSource = new CommonServerDataSource(this.http, {
      endPoint: this.customerManageService.getActivitySettingListURL,
      dataKey: 'result.content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      filterFieldKey: '#field#',
      sortDirKey: 'dir',
      sortFieldKey: 'sort',
      totalKey: 'result.totalElements',
    }, {
      page: this.paginator.nowPage,
      filters: CommonUtil.getSearchFilters(this.validateForm.getRawValue()),
    });

    this.restDataSource.apiStatus().pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      switch (status) {
        case 'init':
          this.loadingService.open();
          break;
        case 'error':
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '查無資料');
          break;
        default:
          this.loadingService.close();
          break;
      }
    });
  }
}
