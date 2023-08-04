import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScheduleBatchHistory, ScheduleTagSetting, ScheduleTagSettingView } from '@api/models/schedule-tag.model';
import { StorageService } from '@api/services/storage.service';
import { Status, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'schedule-tag-detail',
  templateUrl: './schedule-tag-detail.component.html',
  styleUrls: ['./schedule-tag-detail.component.scss']
})
export class ScheduleTagDetailComponent extends BaseComponent implements OnInit {
  enableMultiSelect: boolean = false;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

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
    selectMode: 'single',
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
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      batchTime: {
        title: '批次更新時間',
        type: 'string',
        width: '20%',
        sort: false,
      },
      batchResult: {
        title: '更新結果',
        type: 'html',
        width: '5%',
        valuePrepareFunction: (cell: string) => {
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return (cellLow === 'true' || cellLow === 'success') ? StatusResult[cellLow] : `<p class="colorRed textBold">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: ScheduleTagSetting) => row,
        renderComponent: ScheduleTagButtonComponent,
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

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  refresh() {
    this.enableMultiSelect = true;
    this.gridDefine.selectMode = 'multi';
    this.ng2SmartTable.initGrid();
  }

  cancelRefresh() {
    this.enableMultiSelect = false;
    this.gridDefine.selectMode = 'single';
    this.ng2SmartTable.initGrid();
  }

  submitRefresh() {

  }

}


@Component({
  selector: 'schedule-tag-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ScheduleTagButtonComponent implements OnInit {

  constructor(private router: Router) {
  }

  @Input() value: ScheduleBatchHistory;

  ngOnInit() { }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-export-detail', this.value.tagId], passData);
  }
}
