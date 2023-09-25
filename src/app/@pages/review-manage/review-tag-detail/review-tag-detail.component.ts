import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { HistoryGroupView, TagDetailView } from '@api/models/tag-manage.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { RestStatus, WarningCode } from '@common/enums/rest-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { ReviewTagListMock } from '@common/mock-data/tag-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import { catchError, filter, tap } from 'rxjs/operators';
import { ReviewManageService } from '../review-manage.service';
import { FileReq } from '@api/models/file.model';
import { FileService } from '@api/services/file.service';
import { Scope } from '@common/enums/file-enum';

@Component({
  selector: 'review-tag-detail',
  templateUrl: './review-tag-detail.component.html',
  styleUrls: ['./review-tag-detail.component.scss'],
})
export class ReviewTagDetailComponent extends BaseComponent implements OnInit {

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
  historyId: string;
  isCompare: boolean = false;
  historyGroupView: { [x: number]: HistoryGroupView };
  isfileDownload: boolean = false;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
    private reviewManageService: ReviewManageService,
    private loadingService: LoadingService,
    private fileService: FileService,
    private tagManageService: TagManageService,
  ) {
    super(storageService, configService, loginService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;

    this.loadingService.open();

    if (this.isMock) {
      let newMockData = ReviewTagListMock.find(tag => tag.historyId === this.historyId);
      this.newDetail = JSON.parse(JSON.stringify(newMockData));
      this.detail = this.newDetail;
      this.reviewStatus = newMockData.reviewStatus;
      this.reviewComment = newMockData.reviewComment;
      let oldMockData = TagSettingMock.find(tag => tag.tagId === newMockData.referenceId);
      if (!!oldMockData) {
        this.isCompare = !!oldMockData ? true : false;
        this.oldDetail = JSON.parse(JSON.stringify(oldMockData));
        const processedData = CommonUtil.getHistoryProcessData<TagDetailView>('tagReviewHistoryAud', this.oldDetail as TagDetailView);
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.historyGroupView = processedData.detail.historyGroupView;
        }
        this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
      }
      this.dataSource.load(ActivityListMock);
      this.loadingService.close();
      return;
    }

    this.reviewManageService.getTagReviewRow(this.historyId).pipe(
      filter(res => res.code === RestStatus.SUCCESS),
      catchError(err => {
        this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回標籤審核列表`, ['pages', 'review-manage', 'review-tag-list']);
        throw new Error(err.message);
      }),
      tap(res => {
        this.newDetail = JSON.parse(JSON.stringify(res.result));
        this.detail = this.newDetail;
        this.reviewStatus = res.result.reviewStatus;
        this.reviewComment = res.result.reviewComment;
        const processedData = CommonUtil.getHistoryProcessData<TagDetailView>('tagReviewHistoryAud', this.newDetail as TagDetailView);
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.historyGroupView = processedData.detail.historyGroupView;
        }
        this.isfileDownload =
          (
            this.loginService.userProfileSubject?.value?.businessUnit?.toLowerCase()
            ===
            this.detail?.department?.toLocaleLowerCase()
          )
        this.loadingService.close();
      })
    ).subscribe(res => {

      if (!!res.result.referenceId) {
        let searchInfo: SearchInfo = {
          apiUrl: `${this.tagManageService.tagFunc}${res.result.referenceId}/activity-setting`,
          nowPage: this.paginator.nowPage,
          errMsg: '標籤使用範圍查無資料'
        }
        this.restDataSource = this.tableService.searchData(searchInfo);
      }

      this.reviewManageService.getLastApprovedTag(this.historyId).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          let status = Object.values(WarningCode).includes(err.code) ? null : false;
          this.dialogService.alertAndBackToList(status, `${err.message}，無前次核准紀錄`);
          this.loadingService.close();
          throw new Error(err.message);
        }),
        tap(res => {
          this.isCompare = !!res.result ? true : false;
          this.oldDetail = JSON.parse(JSON.stringify(res.result));
          this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
          this.loadingService.close();
        })
      ).subscribe();
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
        type: 'string',
        sort: false,
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p>${(cell ?? "")}</p>`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + (value ?? "") + `</p>`;
        },
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + (value ?? "") + `</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          return `<p class="text_center">` + (Status[cell] || '') + `</p>`;
        },
        sort: false,
      },
      during: {
        title: '起迄時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row?.startDate} ~ ${row?.endDate}</p>` : '';
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

  //#region 檔案下載
  onDownloadFile() {
    // this.detail.fileData = '2058fd0b-9307-428c-b82f-5a23d5530c83';
    if (CommonUtil.isBlank(this.detail?.fileData)) {
      this.dialogService.alertAndBackToList(false, '檔案下載失敗(無識別碼)');
      return
    }

    this.fileService.downloadFileService(
      Scope.ReviewTag,
      new FileReq({
        fileDataId: this.detail.fileData,
        fileName: this.detail?.fileName,
        uploadType: this.detail?.uploadType
      }));
  }
  //#endregion

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

    if (this.isMock) {
      this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(mockInfo => {
        this.dialogService.openReview(dialogOption).close();
        this.router.navigate(['pages', 'review-manage', 'review-tag-list']);
      });
      return;
    }

    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateTagReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        tap(res => this.router.navigate(['pages', 'review-manage', 'review-tag-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'review-tag-list']);
  }
}
