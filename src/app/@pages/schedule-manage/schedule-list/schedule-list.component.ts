import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleManageService } from '../schedule-manage.service';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ScheduleSetting } from '@api/models/schedule-manage.model';
import { Status } from '@common/enums/common-enum';
import { DatePipe } from '@angular/common';
import { ScheduleSettingMock } from '@common/mock-data/schedule-list-mock';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';

@Component({
  selector: 'schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent extends BaseComponent implements OnInit {
  constructor(
    private scheduleManageService: ScheduleManageService,
    private router: Router) {
    super();
  }
  mockData: Array<ScheduleSetting> = ScheduleSettingMock;


  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
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
        class: 'col-5 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      executionFrequency: {
        title: '執行頻率',
        type: 'html',
        class: 'col-2',
        sort: false,
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-2 alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell.toLowerCase()];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: ScheduleSetting) => row,
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

  add() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-set']);
  }
}
