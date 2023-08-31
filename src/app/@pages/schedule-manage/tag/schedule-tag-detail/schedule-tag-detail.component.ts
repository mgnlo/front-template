import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScheduleTagSetting, ScheduleTagSettingView } from '@api/models/schedule-tag.model';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'schedule-tag-detail',
  templateUrl: './schedule-tag-detail.component.html',
  styleUrls: ['./schedule-tag-detail.component.scss']
})
export class ScheduleTagDetailComponent extends BaseComponent implements OnInit {
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  isAllSelected: boolean = false;
  selectedRows: Array<{ rowId: string }> = new Array;
  tempPageIsAllSelected: Array<{ pageNum: number, val: boolean }> = new Array;
  previousPage: number; // 保存上一次頁碼

  //預設拉取資料
  scheduleTagListSetting: Array<ScheduleTagSetting> = ScheduleTagSettingMock;//Call API
  scheduleTagSettingView: Array<ScheduleTagSettingView> = new Array;
  @ViewChild(Ng2SmartTableComponent) ng2SmartTable: Ng2SmartTableComponent;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
      tagName: {
        title: '標籤名稱',
        type: 'html',
        class: 'left',
        width: '27.5%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      tagDescription: {
        title: '標籤說明',
        type: 'html',
        class: 'left',
        width: '27.5%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${!!cell ? cell : ''}</p>`;
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
      batchTime: {
        title: '批次更新時間',
        type: 'html',
        class: 'left',
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="left">${datepipe.transform(cell, "yyyy-MM-dd HH:mm:ss")}</p>`;
        },
        sort: false,
      },
      batchResult: {
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
        width: '5%',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.emitter.subscribe((res: ScheduleTagSettingView) => {
            let passData: NavigationExtras = { state: res };
            this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-export-detail', res.tagId], passData);
          })
        },
        sort: false,
      },
    },
    noDataMessage: '查無資料',
  };

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.scheduleTagListSetting.map(m => {
      const latestBatchTimeModel = m.scheduleBatchHistory.reduce((latest, current) => {
        const latestDate = new Date(latest.batchTime);
        const currentDate = new Date(current.batchTime);
        return (latestDate < currentDate) ? current : latest;
      });
      this.scheduleTagSettingView.push(new ScheduleTagSettingView({
        tagId: m.tagId,
        version: m.version,
        tagName: m.tagName,
        tagDescription: m.tagDescription,
        tagType: m.tagType,
        department: m.department,
        owner: m.owner,
        createTime: m.createTime,
        modificationTime: m.modificationTime,
        status: m.status,
        startDate: m.startDate,
        endDate: m.endDate,
        conditionSettingMethod: m.conditionSettingMethod,
        conditionSettingQuery: m.conditionSettingQuery,
        tagDimension: m.tagDimension,
        tagSubDimension: m.tagSubDimension,
        scheduleSettings: m.scheduleSettings,
        uploadType: m.uploadType,
        filePath: m.filePath,
        //拿最新一筆ScheduleBatchHistory
        historyId: latestBatchTimeModel?.historyId,
        batchTime: latestBatchTimeModel?.batchTime,
        batchResult: latestBatchTimeModel?.batchResult,
        batchResultCount: latestBatchTimeModel?.batchResultCount,
      }))
    })
    this.dataSource.load(this.scheduleTagSettingView);
  }

  ngAfterViewInit(): void {
    this.getSessionSetPage();
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
            instance.emitter.subscribe((res: ScheduleTagSettingView) => {
              let passData: NavigationExtras = { state: res };
              this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-export-detail', res.tagId], passData);
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
              rowIdName: 'tagId',
              selectedRows: this.selectedRows,
            };

            instance.emitter.subscribe((res) => {
              // console.info('res', res)
              //#region 用grid按鈕，控制是否全選
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

              if (res.isSelected && res.tagId) {
                this.selectedRows.push({ rowId: res.tagId })
                return;
              }
              if ((this.selectedRows.length ?? 0) > 0 && this.selectedRows.find(f => f.rowId === res.tagId)) {
                this.selectedRows = this.selectedRows.filter(item => item.rowId !== res.tagId);
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

    this.setSessionVal(
      {
        page: this.paginator.nowPage,
        isOpenCheckbox: this?.gridDefine?.columns?.['isChecked'] ? true : false,
        isPageAllSelected: this.tempPageIsAllSelected,
      });

    this.selectedRows = await CommonUtil.onSetGridPageChecked('tagId', this.dataSource, this.selectedRows, this.isAllSelected);

    this.ng2SmartTable.initGrid();

    this.getSessionSetPage()

  }

  submitRefresh() {
    const result = this.selectedRows.map(m => m.rowId);
    // console.info('selectedRows', this.selectedRows);
    // console.info('result', result);
  }

}
