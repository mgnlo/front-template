import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActivitySetting, ScheduleDetailView, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status, StatusResult } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
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
  selectedRows: any;

  isAllSelected: boolean = false;

  @ViewChild(Ng2SmartTableComponent) ng2SmartTable: Ng2SmartTableComponent;

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleManageService: ScheduleManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions: false,
    hideSubHeader: true,
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'left',
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
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
          return `<p class="${ColumnClass[cellLow]}">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.emitter.subscribe((res: Schedule_Batch_History) => {
            let passData: NavigationExtras = { state: res };
            this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-export-detail', this.scheduleId, res.activityId], passData);
          })
        },
        sort: false,
      },
    },
    noDataMessage: '查無資料',
  };

  ngOnInit(): void {
    this.scheduleId = this.activatedRoute.snapshot.params.scheduleId;
    this.loadingService.open();
    this.scheduleManageService.getScheduleActivitySettingDetail(this.scheduleId).pipe(
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回名單排程', ['pages', 'schedule-manage', 'schedule-activity-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.detail = JSON.parse(JSON.stringify(res.result));
        this.loadingService.close();
      })
    ).subscribe();

    let searchInfo: SearchInfo = {
      apiUrl: this.scheduleManageService.scheduleFunc + this.scheduleId + '/activity-setting',
      nowPage: this.paginator.nowPage,
      errMsg: '名單紀錄查無資料'
    }
    this.restDataSource = this.tableService.searchData(searchInfo)
  }

  setSessionVal() {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  ngOnDestroy(): void {
    this.setSessionVal();
  }

  setGridDefineInit() {
    this.setSessionVal();
    if (!!this?.gridDefine?.columns?.['isChecked']) {
      delete this.gridDefine.columns['isChecked'];
    }
    else {
      const newColumn = {
        isChecked: {
          title: '',
          type: 'custom',
          width: '5%',
          sort: false,
          filter: false,
          filterFunction: false,
          visible: true,
          renderComponent: CheckboxColumnComponent,
          valuePrepareFunction: (value: any, row: ActivitySetting, cell: any) => {
            return { value, row, cell, isShowParam: { key: 'status', answer: ['enabled', 'reviewing'] } };
          },
        },
      };
      this.gridDefine.columns = Object.assign(newColumn, this.gridDefine.columns);
    }
    this.ng2SmartTable.initGrid();
  }

  onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }

  submitRefresh() {
    console.info('selectedRows', this.selectedRows)
  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-set', 'edit', this.detail.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }
}
