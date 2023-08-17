import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScheduleTagSetting, ScheduleTagSettingView } from '@api/models/schedule-tag.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Grid } from 'ng2-smart-table/lib/lib/grid';

@Component({
  selector: 'schedule-tag-detail',
  templateUrl: './schedule-tag-detail.component.html',
  styleUrls: ['./schedule-tag-detail.component.scss']
})
export class ScheduleTagDetailComponent extends BaseComponent implements OnInit {
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  isAllSelected: boolean = false;
  selectedRows: Array<{ rowId: string }> = new Array;

  //預設拉取資料
  scheduleTagListSetting: Array<ScheduleTagSetting> = ScheduleTagSettingMock;//Call API
  scheduleTagSettingView: Array<ScheduleTagSettingView> = new Array;
  @ViewChild(Ng2SmartTableComponent) ng2SmartTable: Ng2SmartTableComponent;

  constructor(
    storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
      batchTime: {
        title: '批次更新時間',
        type: 'string',
        width: '25%',
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
    //get session page
    let storage = this.storageService.getSessionVal(this.sessionKey);
    if (!!storage?.page) {
      this.dataSource.setPage(storage.page);
    }
  }

  setSessionVal() {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  ngOnDestroy(): void {
    this.setSessionVal();
  }

  setGridDefineInit() {
    this.selectedRows = new Array;
    this.isAllSelected = false;
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
          onComponentInitFunction: (instance: CheckboxColumnComponent) => {
            instance.settings = {
              isShowParam: { key: 'status', answer: ['enabled', 'reviewing'] },
              rowIdName: 'tagId',
              selectedRows: this.selectedRows,
            };

            instance.emitter.subscribe((res) => {
              console.info('res', res)

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

    this.ng2SmartTable.initGrid();

    //設定切換頁面
    let storage = this.storageService.getSessionVal(this.sessionKey);
    if (!!storage?.page) {
      this.dataSource.setPage(storage.page, true);
    }
  }

  onSelectAllChange() {
    this.isAllSelected = !this.isAllSelected;
    const idName = 'tagId'
console.info('this.dataSource',this.dataSource.getElements())
    if (this.dataSource instanceof LocalDataSource) {
      this.dataSource.getElements().then((filteredAndSortedData) => {
        if (this.isAllSelected) {
          filteredAndSortedData.forEach((row) => {
            const rowId = row[idName];
            if (rowId && !this.selectedRows.some((selectedRow) => selectedRow.rowId === rowId)) {
              this.selectedRows.push({ rowId: rowId });
            }
          });
        } else {
          filteredAndSortedData.forEach((row) => {
            const rowId = row[idName];
            this.selectedRows = this.selectedRows.filter((selectedRow) => selectedRow.rowId !== rowId);
          });
        }
      });
      this.ng2SmartTable.initGrid();
    }
  }

  submitRefresh() {
    console.info('selectedRows', this.selectedRows);
  }


}
