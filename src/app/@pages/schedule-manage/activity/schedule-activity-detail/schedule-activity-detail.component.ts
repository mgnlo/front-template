import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActivitySetting, ScheduleDetailView, Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status, StatusResult } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { combineLatest, of } from 'rxjs';
import { catchError, filter, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'schedule-activity-detail',
  templateUrl: './schedule-activity-detail.component.html',
  styleUrls: ['./schedule-activity-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
  detail: ScheduleDetailView;
  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  scheduleId: string;

  isAllSelected: boolean = false;
  selectedRows: Array<{ rowId: string }> = new Array;
  tempPageIsAllSelected: Array<{ pageNum: number, val: boolean }> = new Array;
  previousPage: number; // 保存上一次頁碼

  @ViewChild(Ng2SmartTableComponent) ng2SmartTable: Ng2SmartTableComponent;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleManageService: ScheduleManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super(storageService, configService, loginService);
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
        type: 'string',
        sort: false
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        valuePrepareFunction: (cell: string) => {
          return `<p>${!!cell ? cell : ''}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center w100',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + Status[cell] + `</p>`;
        },
        sort: false,
      },
      batchUpdateTime: {
        title: '批次更新時間',
        type: 'html',
        class: 'text_center w200',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + cell + `</p>`;
        },
        sort: false,
      },
      filterOptions: {
        title: '更新結果',
        type: 'html',
        width: '3rem',
        valuePrepareFunction: (cell: string) => {
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return `<p class="text_center ${ColumnClass[cellLow]}">` + StatusResult[cellLow] + `</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'center',
        width: '3rem',
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

    if (this.isMock) {
      let mockData = ScheduleActivitySettingMock.find(schedule => schedule.scheduleId === this.scheduleId)
      this.detail = JSON.parse(JSON.stringify(mockData));
      this.dataSource.load(mockData.activitySetting);
      this.loadingService.close();
      return;
    }

    this.dataSource = new LocalDataSource();
    const detailObservable = this.scheduleManageService.getScheduleActivitySettingDetail(this.scheduleId);
    const storage = this.storageService.getSessionVal(this.sessionKey);
    const gridObservable = this.scheduleManageService.getScheduleActivitySettingDetailGrid(this.scheduleId, storage?.page ? { page: storage.page } : null);

    combineLatest([detailObservable, gridObservable]).pipe(
      catchError(err => {
        this.handleErrorResponse(err, '查無此筆資料，將為您導回名單排程', ['pages', 'schedule-manage', 'schedule-activity-list']);
        return of(null);
      }),
      filter(([detailRes, gridRes]) => detailRes !== null && detailRes.code === RestStatus.SUCCESS && gridRes !== null && gridRes.code === RestStatus.SUCCESS),
      tap(([detailRes, gridRes]) => {
        this.detail = JSON.parse(JSON.stringify(detailRes.result));
        //console.info('this.detail', this.detail)
        const processedData = CommonUtil.getHistoryProcessData<ScheduleDetailView>('scheduleReviewHistoryAud', this.detail as ScheduleDetailView);
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail.historyGroupView = processedData.detail?.historyGroupView;
        }

        const gridData = JSON.parse(JSON.stringify(gridRes.result));
        const scheduleActivityGrid = this.mapGridDataToActivitySettings(gridData);
        // console.info('this.detailRes', detailRes)
        // console.info('this.gridRes', gridRes)
        this.dataSource.load(scheduleActivityGrid);
      }),
      finalize(() => {
        this.loadingService.close();
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.setSessionVal(
      {
        page: this.paginator.nowPage,
        isOpenCheckbox: this?.gridDefine?.columns?.['isChecked'] ? true : false,
        isPageAllSelected: this.tempPageIsAllSelected,
      });
  }

  ngDoCheck() {
    if (this.ng2SmartTable) {
      const currentPage = this.paginator.nowPage;

      if (this.previousPage !== currentPage) {
        this.previousPage = currentPage;
        const getSession = this.storageService.getSessionVal(this.sessionKey);
        if (getSession?.isOpenCheckbox && getSession?.isPageAllSelected?.find(f => f?.['pageNum'] === currentPage)) {
          this.isAllSelected = getSession?.isPageAllSelected?.find(f => f?.['pageNum'] === currentPage)?.val
          return
        }
        this.isAllSelected = false;

      }
    }
  }

  processExecutionFrequency(frequency: string, frequencyTime: string) {
    return CommonUtil.processExecutionFrequency(frequency, frequencyTime);
  }

  handleErrorResponse(err: any, message: string, route: Array<any>) {
    this.dialogService.alertAndBackToList(false, message, route);
    throw new Error(err.message);
  }

  mapGridDataToActivitySettings(gridData: any[]): ActivitySetting[] {
    return gridData['content'].map(m => new ActivitySetting({
      activityId: m.activityId,
      version: m.version,
      activityName: m.activityName,
      activityDescription: m.activityDescription,
      department: m.department,
      owner: m.owner,
      filterOptions: m.filterOptions,
      listLimit: m.listLimit,
      status: m.status,
      startDate: m.startDate,
      endDate: m.endDate,
      createTime: m.createTime,
      modificationTime: m.modificationTime,
      scheduleSettings: m.scheduleSettings,
      batchUpdateTime: m.batchUpdateTime
    }));
  }

  setGridDefineInit() {
    this.selectedRows = new Array;
    this.isAllSelected = false;
    this.tempPageIsAllSelected = new Array;

    if (!!this?.gridDefine?.columns?.['isChecked']) {
      delete this.gridDefine.columns['isChecked'];
      const newColumn = {
        action: {
          title: '查看',
          type: 'custom',
          width: '5%',
          renderComponent: ColumnButtonComponent,
          onComponentInitFunction: (instance: ColumnButtonComponent) => {
            instance.emitter.subscribe((res: Schedule_Batch_History) => {
              let passData: NavigationExtras = { state: res };
              this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-export-detail', this.scheduleId, res.activityId], passData);
            })
          },
          sort: false,
        },
      }
      this.gridDefine.columns = Object.assign(this.gridDefine.columns, newColumn);
    }
    else {
      delete this.gridDefine.columns['action'];
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
          onComponentInitFunction: (instance: CheckboxColumnComponent) => {
            instance.settings = {
              isShowParam: { key: 'status', answer: ['enabled', 'reviewing'] },
              rowIdName: 'activityId',
              selectedRows: this.selectedRows,
            };

            //#region 用grid按鈕，控制是否全選
            instance.emitter.subscribe((res) => {
              // console.info('res', res)

              const pageData = this.dataSource.getElements()
              pageData.then((res) => {
                const hasActionFieldCNT = res.filter((f) => f.isShow).length;
                const wasSelected = res.filter((f) => f.isShow && f.isSelected).length;

                this.isAllSelected = false;
                if (wasSelected === hasActionFieldCNT) this.isAllSelected = true;

                this.tempPageIsAllSelected = CommonUtil.onSetTempPageIsAllSelected(this.tempPageIsAllSelected, this.paginator.nowPage, this.isAllSelected)
                this.setSessionVal(
                  {
                    page: this.paginator.nowPage,
                    isOpenCheckbox: this?.gridDefine?.columns?.['isChecked'] ? true : false,
                    isPageAllSelected: this.tempPageIsAllSelected,
                  });
              })
              //#endregion

              if (res.isSelected && res.activityId) {
                this.selectedRows.push({ rowId: res.activityId })
                return;
              }
              if ((this.selectedRows.length ?? 0) > 0 && this.selectedRows.find(f => f.rowId === res.activityId)) {
                this.selectedRows = this.selectedRows.filter(item => item.rowId !== res.activityId);
              }

            });
          }
        },
      };
      this.gridDefine.columns = Object.assign(newColumn, this.gridDefine.columns);
    }

    this.setSessionVal(
      {
        page: this.paginator.nowPage,
        isOpenCheckbox: this?.gridDefine?.columns?.['isChecked'] ? true : false,
        isPageAllSelected: this.tempPageIsAllSelected,
      });

    this.ng2SmartTable.initGrid();

    this.getSessionSetPage()
  }

  async onSelectAllChange(click?: boolean) {
    const getSession = this.storageService.getSessionVal(this.sessionKey);
    const isPageAllSelected = getSession?.isPageAllSelected || [];

    const matchingPage = isPageAllSelected.find(f => f?.pageNum === this.paginator.nowPage);

    if (!click && getSession?.isOpenCheckbox && matchingPage) {
      this.isAllSelected = matchingPage.val;
    } else {
      this.isAllSelected = !this.isAllSelected;
    }

    this.tempPageIsAllSelected = CommonUtil.onSetTempPageIsAllSelected(this.tempPageIsAllSelected, this.paginator.nowPage, this.isAllSelected)

    // console.info('this.tempPageIsAllSelected', this.tempPageIsAllSelected)
    this.setSessionVal(
      {
        page: this.paginator.nowPage,
        isOpenCheckbox: this?.gridDefine?.columns?.['isChecked'] ? true : false,
        isPageAllSelected: this.tempPageIsAllSelected,
      });

    this.selectedRows = await CommonUtil.onSetGridPageChecked('activityId', this.dataSource, this.selectedRows, this.isAllSelected);
    // console.info('this.selectedRows', this.selectedRows)

    this.ng2SmartTable.initGrid();

    this.getSessionSetPage()

  }

  submitRefresh() {
    const result = this.selectedRows.map(m => m.rowId);
    // console.info('selectedRows', this.selectedRows);
    // console.info('result', result);
  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-set', 'edit', this.detail.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }
}
