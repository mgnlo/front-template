import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TagReviewHistory, TagSetting } from '@api/models/tag-manage.model';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ReviewStatus } from '@common/enums/review-enum';
import { TagType } from '@common/enums/tag-enum';
import { TagReviewListMock } from '@common/mock-data/tag-review-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'tag-review-list',
  templateUrl: './tag-review-list.component.html',
  styleUrls: ['./tag-review-list.component.scss'],
})
export class TagReviewListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    private dateService: NbDateService<Date>,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private reviewManageService: ReviewManageService,
  ) {
    super(storageService);
    // 篩選條件
    this.validateForm = new FormGroup({
      tagName: new FormControl(''),
      reviewStatus: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);
  }

  statusList: Array<{ key: string; val: string }> = Object.entries(ReviewStatus).map(([k, v]) => ({ key: k, val: v }))
  selected: string = '';
  mockData: Array<TagReviewHistory> = TagReviewListMock;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
    //get session filter
    this.storageService.getSessionFilter(this.sessionKey, this.validateForm).subscribe((res) => {
      if (res === true) { this.search(); }
    });

    this.reviewManageService.getTagReviewList().subscribe((res) => {
      if(res.code === RestStatus.SUCCESS){
        console.info(res.message);
      }
    })
  }

  ngOnDestroy(): void {
    let sessionData = {page: this.paginator.nowPage, filter: this.validateForm.getRawValue()};
    this.storageService.putSessionVal(this.sessionKey, sessionData);
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
        width: '20%',
        class: 'left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      tagType: {
        title: '類型',
        type: 'string',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `${TagType[cell]}`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'string',
        width: '15%',
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
        width: '20%',
        class: 'left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      modificationTime: {
        title: '標籤有效起訖日',
        type: 'string',
        width: '20%',
        sort: false,
        valuePrepareFunction: (cell: string, row: TagSetting) => {
          return row.startDate + '~' + row.endDate;
        }
      },
      reviewStatus: {
        title: '狀態',
        type: 'html',
        width: '9%',
        valuePrepareFunction: (cell: string) => {
          return `<span class="${ColumnClass[cell]}">${ReviewStatus[cell]}</span>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: TagSetting) => row,
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
    if(!!sDate || !!eDate){
      this.dataSource.addFilter({ field: 'modificationTime', filter: undefined, search: [sDate, eDate] });
    }
    //search other
    for (const [k, v] of Object.entries(filter).filter(([key, val]) => !key.includes('Date') && !!val)) {
      this.dataSource.addFilter({ field: k, filter: undefined, search: v });
    }
  }
}
