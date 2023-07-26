import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {

  constructor(
    private router: Router,
    private dateService: NbDateService<Date>,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
    super();
    // 篩選條件
    this.validateForm = new FormGroup({
      activityName: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);

  }

  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  mockData: Array<ActivitySetting> = ActivityListMock;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  ngOnInit(): void {
    this.mockData = this.mockData.map(mock => {
      return { ...mock, during: `${mock.startDate}~${mock.endDate}` } //起訖日查詢篩選要用到
    })
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
    //get session filter
    this.storageService.getSessionFilter(this.sessionKey, this.validateForm).subscribe((res) => {
      if (res === true) { this.search(); }
    });
  }

  ngAfterViewInit(): void {
    //get session page
    let storage = this.storageService.getSessionVal(this.sessionKey);
    if(!!storage?.page){
      this.dataSource.setPage(storage.page);
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage, filter: this.validateForm.getRawValue() };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'col-2 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        class: 'col-1',
        sort: false,
        renderComponent: CheckboxIconComponent,
      },
      listLimit: {
        title: '名單上限',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any) => {
          return `<span class="date">${cell}</span>`;
        },
        sort: false,
        filterFunction: (cell?: string, search?: string[]) => {
          let cellSDate = cell.split('~')[0];
          let cellEDate = cell.split('~')[1];
          let sDate = search[0];
          let eDate = search[1];
          let isSDate = sDate !== null;
          let isEDate = eDate !== null;
          if (
            (!isSDate && !isEDate) ||
            ((isSDate && isEDate) && (
              moment(cellSDate).isBetween(sDate, eDate, undefined, '[]') ||
              moment(cellEDate).isBetween(sDate, eDate, undefined, '[]') ||
              moment(sDate).isBetween(cellSDate, cellEDate, undefined, '[]') ||
              moment(eDate).isBetween(cellSDate, cellEDate, undefined, '[]')
            )) ||
            ((isSDate && !isEDate) && (
              moment(sDate).isBetween(cellSDate, cellEDate, undefined, '[]')
            )) ||
            ((!isSDate && isEDate) && (
              moment(eDate).isBetween(cellSDate, cellEDate, undefined, '[]')
            ))
          ) {
            return true
          } else {
            return false
          }
        }
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: ActivitySetting) => row,
        renderComponent: DetailButtonComponent,
        sort: false,
      },
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    // rowClassFunction: (row: Row) => {
    //   console.info(row.getData().status)
    //   return row.getData().status === 'ing' ? 'aa' : '';
    // },
  };

  add() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set']);
  }

  reset() {
    this.dataSource.reset();
    this.validateForm.reset({ activityName: '', status: '', startDate: null, endDate: null });
  }

  search() {
    this.dataSource.reset();
    let filter = this.validateForm.getRawValue();
    //search during
    let sDate = filter.startDate !== null ? this.dateService.format(filter.startDate, this.dateFormat) : null;
    let eDate = filter.endDate !== null ? this.dateService.format(filter.endDate, this.dateFormat) : null;
    if (!!sDate || !!eDate) {
      this.dataSource.addFilter({ field: 'during', filter: undefined, search: [sDate, eDate] });
    }
    //search other
    for (const [k, v] of Object.entries(filter).filter(([key, val]) => !key.includes('Date') && !!val)) {
      this.dataSource.addFilter({ field: k, filter: undefined, search: v });
    }
  }
}
