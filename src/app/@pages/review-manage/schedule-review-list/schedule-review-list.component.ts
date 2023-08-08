import { Component, OnInit } from '@angular/core';
import { ScheduleReviewhistory } from '@api/models/schedule-activity.model';
import { StorageService } from '@api/services/storage.service';
import { Frequency } from '@common/enums/common-enum';
import { ReviewClass, ReviewStatus } from '@common/enums/review-enum';
import { ScheduleReviewhistoryMock } from '@common/mock-data/schedule-review-mock';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'app-schedule-review-list',
  templateUrl: './schedule-review-list.component.html',
  styleUrls: ['./schedule-review-list.component.scss']
})
export class ScheduleReviewListComponent extends BaseComponent implements OnInit {

  mockData: Array<ScheduleReviewhistory> = ScheduleReviewhistoryMock;

  constructor(
    storageService: StorageService,
  ) {
    super(storageService);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      jobName: {
        title: '作業名稱',
        type: 'html',
        class: 'left',
        sort: false,
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      status: {
        title: '執行頻率',
        type: 'string',
        width: '25%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Frequency[cell];
        },
        sort: false,
      },
      reviewComment: {
        title: '異動內容',
        type: 'string',
        sort: false,
        width: '25%'
      },
      reviewer: {
        title: '變更人員',
        type: 'string',
        sort: false,
        width: '10%'
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ReviewClass[cell]}">${ReviewStatus[cell]}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: ScheduleReviewhistory) => row,
        renderComponent: DetailButtonComponent,
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

}
