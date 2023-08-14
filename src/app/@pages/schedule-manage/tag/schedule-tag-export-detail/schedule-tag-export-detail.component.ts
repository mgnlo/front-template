import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleTagSetting } from '@api/models/schedule-tag.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-tag-export-detail',
  templateUrl: './schedule-tag-export-detail.component.html',
  styleUrls: ['./schedule-tag-export-detail.component.scss']
})
export class ScheduleTagExportDetailComponent extends BaseComponent implements OnInit {

  params: any;//路由參數

  //預設資料來源
  detail: ScheduleTagSetting = ScheduleTagSettingMock[0];//Call API

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super(storageService);
    this.params = this.activatedRoute.snapshot.params;
  }


  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    tableId: 'true',
    columns: {
      historyId: {
        title: '項次',
        type: 'string',
        width: '10%',
        sort: false
      },
      batchTime: {
        title: '批次時間',
        type: 'html',
        class: 'left',
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="left">${cell}</span>`;
        },
        sort: false,
      },
      batchResult: {
        title: '排程結果',
        type: 'html',
        class: 'left',
        width: '49%',
        valuePrepareFunction: (cell: string) => {
          const lableName = '批次排程'
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return `<p class="left ${ColumnClass[cellLow]}">${lableName}${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      batchResultCount: {
        title: '貼標比數',
        type: 'html',
        width: '15%',
        valuePrepareFunction: (cell: string) => {
          return `<p>${cell ?? 0}</p>`;
        },
        sort: false
      },
      action: {
        title: '匯出',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: TagButtonComponent,
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
    this.dataSource.load(this.detail.scheduleBatchHistory);
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-detail']);
  }

}


@Component({
  selector: 'tag-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="download()"><nb-icon icon="cloud-download-outline"></nb-icon></button>'
})
export class TagButtonComponent implements OnInit {

  constructor(private router: Router) { }

  //@Input() value: Schedule_Batch_History;

  ngOnInit() { }

  download() {

  }
}
