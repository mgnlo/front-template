import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { TagSetting } from '@api/models/tag-list.model';
import { TagReview } from '@api/models/tag-review.model';
import { ReviewStatus } from '@common/enums/review-enum';
import { TagReviewListMock } from '@common/mock-data/tag-review-mock';
import { ReviewStatusPipe } from '@common/pipes/enum.pipe';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'tag-review-list',
  templateUrl: './tag-review-list.component.html',
  styleUrls: ['./tag-review-list.component.scss'],
})
export class TagReviewListComponent extends BaseComponent implements OnInit {

  constructor(
    private dateService: NbDateService<Date>) {
    super();
    // 篩選條件
    this.validateForm = new FormGroup({
      tagName: new FormControl(''),
      reviewStatus: new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });

  }

  statusList: Array<{ key: string; val: string }> = Object.entries(ReviewStatus).map(([k, v]) => ({ key: k, val: v }))
  selected: string = '';
  mockData: Array<TagReview> = TagReviewListMock;

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
      tagName: {
        title: '標籤名稱',
        type: 'html',
        width: '30%',
        class: 'left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      tagType: {
        title: '類型',
        type: 'html',
        width: '10%',
        sort: false,
      },
      department: {
        title: '所屬單位',
        type: 'string',
        width: '10%',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        width: '5%',
        sort: false,
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        width: '25%',
        class: 'left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US')
          return `<p class="date">${datepipe.transform(cell , this.dateFormat)}</p>`;
        },
        filterFunction: (cell?: string, search?: string[]) => {
          let date = cell;
          let sDate = search[0];
          let eDate = search[1];
          let isSDate = sDate !== null;
          let isEDate = eDate !== null;
          if(
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
          ){
            return true
          }  else {
            return false
          }
        }
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '5%',
        valuePrepareFunction: (cell: string) => {
          const rStatus = new ReviewStatusPipe;
          let style: string = cell === ReviewStatus.AGREE ? 'colorGreen': cell === ReviewStatus.REJECT ? 'colorRed' : '';
          return `<span class="${style}">${rStatus.transform(cell)}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row: TagSetting) => row,
        renderComponent: ReviewTagButtonComponent,
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
    this.dataSource.addFilter({
      field: 'modificationTime',
      filter: undefined,
      search: [sDate, eDate],
    });
    //search other
    for (const [k, v] of Object.entries(filter).filter(([key, val]) => !key.includes('Date') && !!val)) {
      this.dataSource.addFilter({
        field: k,
        filter: undefined,
        search: v,
      });
    }
  }
}

@Component({
  selector: 'ngx-review-tag-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ReviewTagButtonComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() value: TagReview;

  ngOnInit() { }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(['pages', 'review-manage', 'tag-review-detail'], passData);
  }

  edit(): void { }
}
