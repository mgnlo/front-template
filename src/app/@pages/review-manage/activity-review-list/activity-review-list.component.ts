import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityReviewHistory } from '@api/models/activity-list.model';
import { StorageService } from '@api/services/storage.service';
import { ReviewClass, ReviewStatus } from '@common/enums/review-enum';
import { ActivityReviewListMock } from '@common/mock-data/activity-review-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { CheckboxIconComponent } from '@component/table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'activity-review-list',
  templateUrl: './activity-review-list.component.html',
  styleUrls: ['./activity-review-list.component.scss'],
})
export class ActivityReviewListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    private dateService: NbDateService<Date>,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,) {
    super(storageService);
    // 篩選條件
    this.validateForm = new FormGroup({
      activityName: new FormControl(''),
      reviewStatus: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);

  }

  statusList: Array<{ key: string; val: string }> = Object.entries(ReviewStatus).map(([k, v]) => ({ key: k, val: v }))
  mockData: Array<ActivityReviewHistory> = ActivityReviewListMock;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
    //get session filter
    this.storageService.getSessionFilter(this.sessionKey, this.validateForm).subscribe((res) => {
      if (res === true) { this.search(); }
    });
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
        class: 'left',
        sort: false,
        width: '20%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'left',
        sort: false,
        width: '25%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      filterOptions: {
        title: '差異過濾',
        type: 'custom',
        sort: false,
        width: '5%',
        renderComponent: CheckboxIconComponent,
      },
      listLimit: {
        title: '名單上限',
        type: 'string',
        sort: false,
        width: '5%'
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '5%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US')
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
        filterFunction: (cell?: string, search?: string[]) => {
          let date = cell;
          let sDate = search[0];
          let eDate = search[1];
          let isSDate = sDate !== null;
          let isEDate = eDate !== null;
          if (
            (!isSDate && !isEDate) ||
            ((isSDate && isEDate) && (
              moment(date).isBetween(sDate, eDate, undefined, '[]')
            )) ||
            ((isSDate && !isEDate) && (
              moment(sDate).isSameOrBefore(date)
            )) ||
            ((!isSDate && isEDate) && (
              moment(eDate).isSameOrAfter(date)
            ))
          ) {
            return true
          } else {
            return false
          }
        }
      },
      modifyContent: {
        title: '異動內容',
        type: 'html',
        class: 'left',
        sort: false,
        width: '30%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">TODO</p>`;
        },
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '5%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ReviewClass[cell]}">${ReviewStatus[cell]}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: ActivityReviewHistory) => row,
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

  reset() {
    this.dataSource.reset();
    this.validateForm.reset({ tagName: '', reviewStatus: '', startDate: null, endDate: null });
  }

  search() {
    this.dataSource.reset();
    let filter = this.validateForm.getRawValue();
    //search modificationTime
    let sDate = filter.startDate !== null ? this.dateService.format(filter.startDate, this.dateFormat) : null;
    let eDate = filter.endDate !== null ? this.dateService.format(filter.endDate, this.dateFormat) : null;
    if (!!sDate || !!eDate) {
      this.dataSource.addFilter({ field: 'modificationTime', filter: undefined, search: [sDate, eDate] });
    }
    //search other
    for (const [k, v] of Object.entries(filter).filter(([key, val]) => !key.includes('Date') && !!val)) {
      this.dataSource.addFilter({ field: k, filter: undefined, search: v });
    }
  }
}