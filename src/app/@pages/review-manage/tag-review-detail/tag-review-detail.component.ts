import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivitySetting, TagSetting } from '@api/models/activity-list.model';
import { TagDetailView, TagReviewHistory } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { filter, catchError, takeUntil, tap } from 'rxjs/operators';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'tag-review-detail',
  templateUrl: './tag-review-detail.component.html',
  styleUrls: ['./tag-review-detail.component.scss'],
})
export class TagReviewDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  oldDetail: TagDetailView;
  newDetail: TagDetailView;
  detail: TagDetailView;
  isConditionOpen: { [x: number]: boolean } = {}; //活動名單條件收合
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  isSameList: { [x: string]: boolean } = {}; //差異比較
  isBefore: boolean = false;
  reviewStatus: string;
  reviewComment: string;
  historyId: string

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
    private customerManageService: CustomerManageService,
    private reviewManageService: ReviewManageService,
    private loadingService: LoadingService,
  ) {
    super(storageService);
    if (!!this.router.getCurrentNavigation()?.extras) {
      let tagReview = this.router.getCurrentNavigation().extras.state as TagReviewHistory;
      let list = TagSettingMock.filter(row => row.tagId === tagReview.referenceId)[0];
      this.newDetail = JSON.parse(JSON.stringify(tagReview));
      this.oldDetail = JSON.parse(JSON.stringify(list));
      this.detail = this.newDetail;
      this.reviewStatus = tagReview.reviewStatus;
      this.reviewComment = tagReview.reviewComment;
      this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
      const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', list as TagSetting);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.oldDetail.historyGroupView = processedData.detail.historyGroupView;
        this.newDetail.historyGroupView = processedData.detail.historyGroupView;
      }
    }
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;
    let searchInfo: SearchInfo = {
      apiUrl: this.customerManageService.activityFunc,
      nowPage: this.paginator.nowPage,
      errMsg: '標籤使用範圍查無資料'
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
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
      department: {
        title: '所屬單位',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      owner: {
        title: '負責人',
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
        title: '起迄時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
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

  viewToggle() {
    this.isBefore = !this.isBefore;
    this.detail = this.isBefore === true ? this.oldDetail : this.newDetail;
  }

  changeClass(key1: string, key2?: string) {
    let isSame1 = this.isSameList[key1];
    if (!key2) {
      return !!isSame1 ? 'true' : !isSame1 && !!this.isBefore ? 'null' : 'false';
    } else {
      let isSame2 = this.isSameList[key2];
      return !!isSame1 && !!isSame2 ? 'true' : (!isSame1 || !isSame2) && !!this.isBefore ? 'null' : 'false';
    }
  }

  send(reviewStatus: 'rejected' | 'approved') {
    let dialogOption = { title: '標籤異動駁回說明', isApproved: reviewStatus === 'approved' };
    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateTagReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => this.router.navigate(['pages', 'review-manage', 'tag-review-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'tag-review-list']);
  }
}
