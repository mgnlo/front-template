import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { ActivitySetting, TagSetting } from '@api/models/activity-list.model';
import { TagDetailView, TagReviewHistory } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { CommonConf, CommonServerDataSource } from '@common/ng2-smart-table/common-server-data-source';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { takeUntil } from 'rxjs/operators';

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
  // mockData: Array<ActivitySetting> = ActivityListMock;

  constructor(
    storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private customerManageService: CustomerManageService,
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
        this.detail = processedData.detail;
      }
    }
  }

  ngOnInit(): void {
    this.restDataSource = new CommonServerDataSource(this.http, new CommonConf({ endPoint: this.customerManageService.activityFunc }), {
      page: this.paginator.nowPage,
    });

    this.restDataSource.apiStatus().pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      switch (status) {
        case 'init':
          this.loadingService.open();
          break;
        case 'error':
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '標籤使用範圍查無資料');
          break;
        default:
          this.loadingService.close();
          break;
      }
    });
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
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
        sort: false,
      },
    },
    hideSubHeader: true, //起訖日查詢要用到
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

  approve() {
    this.dialogService.openApprove({ bool: true, backTo: 'tag-review-list' });
  }

  reject() {
    this.dialogService.openReject({ title: '標籤異動駁回說明', backTo: 'tag-review-list' });
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'tag-review-list']);
  }
}
