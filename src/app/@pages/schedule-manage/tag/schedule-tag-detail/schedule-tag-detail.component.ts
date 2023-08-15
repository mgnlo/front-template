import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScheduleBatchHistory, ScheduleTagSetting, ScheduleTagSettingView } from '@api/models/schedule-tag.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Status, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'schedule-tag-detail',
  templateUrl: './schedule-tag-detail.component.html',
  styleUrls: ['./schedule-tag-detail.component.scss']
})
export class ScheduleTagDetailComponent extends BaseComponent implements OnInit {
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;
  selectedRows: any;
  isAllSelected: boolean = false;

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
          instance.emitter.subscribe((res: ScheduleBatchHistory) => {
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
        tagSubdimension: m.tagSubdimension,
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
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return { value, row, cell, param: { key: 'status', answer: ['enabled', 'reviewing'] } };
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

}
