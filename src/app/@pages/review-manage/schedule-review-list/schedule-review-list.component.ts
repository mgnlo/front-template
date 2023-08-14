import { Component, OnInit } from '@angular/core';
import { ScheduleReviewHistory } from '@api/models/schedule-activity.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, Frequency } from '@common/enums/common-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { ScheduleReviewHistoryMock } from '@common/mock-data/schedule-review-mock';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-schedule-review-list',
  templateUrl: './schedule-review-list.component.html',
  styleUrls: ['./schedule-review-list.component.scss']
})
export class ScheduleReviewListComponent extends BaseComponent implements OnInit {

  mockData: Array<ScheduleReviewHistory> = ScheduleReviewHistoryMock;

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
      frequency: {
        title: '執行頻率',
        type: 'html',
        width: '30%',
        class: 'left',
        valuePrepareFunction: (cell: string, row: ScheduleReviewHistory) => {
          return `<p class="left">${Frequency[row.executionFrequency]} ${row.frequencyTime}</p>`;
        },
        sort: false,
      },
      type:{
        title: '異動類型',
        type: 'string',
        sort: false,
        width: '15%',
      },
      reviewer: {
        title: '變更人員',
        type: 'string',
        sort: false,
        width: '15%'
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '10%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ColumnClass[cell]}">${ReviewStatus[cell]}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: ScheduleReviewHistory) => row,
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
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
  }

}
