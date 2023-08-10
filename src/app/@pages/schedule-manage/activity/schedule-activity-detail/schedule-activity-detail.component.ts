import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActivitySetting, ScheduleActivitySetting, ScheduleDetailView, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { Status, StatusResult } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { catchError, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'schedule-activity-detail',
  templateUrl: './schedule-activity-detail.component.html',
  styleUrls: ['./schedule-activity-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
  detail: ScheduleDetailView;
  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合
  activitySetting: Array<ActivitySetting> = ScheduleActivitySettingMock[0].activitySetting;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  scheduleId: string;

  @ViewChild(Ng2SmartTableComponent) ng2SmartTable: Ng2SmartTableComponent;


  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleManageService: ScheduleManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super(storageService);
    // const state = this.router.getCurrentNavigation()?.extras?.state;
    // if (!!state) {
    //   const processedData = CommonUtil.getHistoryProcessData<ScheduleActivitySetting>('ScheduleReviewHistory', state as ScheduleActivitySetting); // 異動歷程處理
    //   if (!!processedData) {
    //     this.isHistoryOpen = processedData.isHistoryOpen;
    //     this.detail = processedData.detail;
    //   }
    // }else{//假資料，之後要Call API
    //   const processedData = CommonUtil.getHistoryProcessData<ScheduleActivitySetting>('ScheduleReviewHistory', ScheduleActivitySettingMock[0] as ScheduleActivitySetting); // 異動歷程處理
    //   if (!!processedData) {
    //     this.isHistoryOpen = processedData.isHistoryOpen;
    //     this.detail = processedData.detail;
    //   }
    // }
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    selectMode: 'single',
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'left',
        width: '30%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        width: '30%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      batchUpdateTime: {
        title: '批次更新時間',
        type: 'string',
        width: '15%',
        sort: false,
      },
      filterOptions: {
        title: '更新結果',
        type: 'html',
        width: '5%',
        valuePrepareFunction: (cell: string) => {
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return cellLow === 'true' ? StatusResult[cellLow] : `<p class="colorRed textBold">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: Schedule_Batch_History) => row,
        renderComponent: ScheduleActivityButtonComponent,
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
    // this.dataSource = new LocalDataSource();
    // this.dataSource.load(this.activitySetting);

    this.scheduleId = this.activatedRoute.snapshot.params.scheduleId;
    this.loadingService.open();
    this.scheduleManageService.getScheduleActivitySettingRow(this.scheduleId).pipe(
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回名單排程', ['pages', 'schedule-manage', 'schedule-activity-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        const processedData = CommonUtil.getHistoryProcessData<ScheduleActivitySetting>('scheduleReviewHistory', res.result as ScheduleActivitySetting); // 異動歷程處理
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail = processedData.detail;
        }

        if (res.result?.activitySetting) {
          this.dataSource = new LocalDataSource();
          this.dataSource.load(res.result.activitySetting);
        }

        this.loadingService.close();
      })
    ).subscribe();
  }

  setSessionVal() {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  ngOnDestroy(): void {
    this.setSessionVal();
  }

  refresh() {
    this.setSessionVal();
    this.gridDefine.selectMode = 'multi';
    this.ng2SmartTable.initGrid();
  }

  cancelRefresh() {
    this.setSessionVal();
    this.gridDefine.selectMode = 'single';
    this.ng2SmartTable.initGrid();
  }

  submitRefresh() {

  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-set', 'edit', this.detail.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }
}



@Component({
  selector: 'schedule-activity-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ScheduleActivityButtonComponent implements OnInit {
  params: any;//路由參數

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.params = this.activatedRoute.snapshot.params;
  }

  @Input() value: Schedule_Batch_History;

  ngOnInit() { }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-export-detail', this.params.scheduleId, this.value.activityId], passData);
  }
}
