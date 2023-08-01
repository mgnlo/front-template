import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScheduleBatchHistory } from '@api/models/schedule-tag.model';
import { StorageService } from '@api/services/storage.service';
import { Status, StatusResult } from '@common/enums/common-enum';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'schedule-tag-detail',
  templateUrl: './schedule-tag-detail.component.html',
  styleUrls: ['./schedule-tag-detail.component.scss']
})
export class ScheduleTagDetailComponent extends BaseComponent implements OnInit {
  enableMultiSelect: boolean = false;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
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
          return cellLow === 'true' ? StatusResult[cellLow] : `<p class="colorRed textBold">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row) => row,
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

  gridDefine_1 = {
    pager: {
      display: true,
      perPage: 10,
    },
    selectMode: 'multi',
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
          return cellLow === 'true' ? StatusResult[cellLow] : `<p class="colorRed textBold">${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row) => row,
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
  }

  cancelRefresh() {
    this.enableMultiSelect = false;
  }

  submitRefresh() {

  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }

}


@Component({
  selector: 'schedule-tag-detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ScheduleTagButtonComponent implements OnInit {
  params: any;//路由參數

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.params = this.activatedRoute.snapshot.params;
  }

  @Input() value: ScheduleBatchHistory;

  ngOnInit() { }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-export-detail', this.params.scheduleId, this.value.tagId], passData);
  }
}
