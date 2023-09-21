import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivityReviewHistory, ActivitySetting, HistoryGroupView, TagGroupView } from '@api/models/activity-list.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { RestStatus, WarningCode } from '@common/enums/rest-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { ReviewActivityListMock } from '@common/mock-data/activity-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { catchError, filter, takeUntil, tap } from 'rxjs/operators';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'review-activity-detail',
  templateUrl: './review-activity-detail.component.html',
  styleUrls: ['./review-activity-detail.component.scss'],
})
export class ReviewActivityDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  oldDetail: ActivityDetail;
  newDetail: ActivityDetail;
  detail: ActivityDetail;
  newReview: ActivityReviewHistory;
  oldReview: ActivitySetting;
  isConditionOpen: { [x: number]: boolean } = {}; //活動名單條件收合
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  isSameList: { [x: string]: boolean } = {}; //差異比較
  isSameCon: { [x: number]: boolean } = {}; //條件比較
  isBefore: boolean = false;
  reviewStatus: string;
  reviewComment: string;
  historyId: string;
  isCompare: boolean = false;
  historyGroupView: { [x: number]: HistoryGroupView };

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private reviewManageService: ReviewManageService,
  ) {
    super(storageService, configService, loginService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;

    this.loadingService.open();

    if (this.isMock) {
      let newMockData = ReviewActivityListMock.find(activity => activity.historyId === this.historyId);
      this.newDetail = JSON.parse(JSON.stringify(newMockData));
      this.newReview = JSON.parse(JSON.stringify(newMockData));
      this.reviewStatus = newMockData.reviewStatus;
      this.reviewComment = newMockData.reviewComment;
      this.newDetail.tagGroupView = CommonUtil.groupBy(newMockData.activityListCondition, 'tagGroup');
      this.detail = this.newDetail;
      Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
      const processedData = CommonUtil.getHistoryProcessData<ActivityDetail>('activityReviewHistoryAud', this.newDetail as ActivityDetail);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail = processedData.detail;
        this.historyGroupView = this.detail.historyGroupView;
      }
      let oldMockData = ActivityListMock.find(activity => activity.activityId === newMockData.referenceId);
      this.isCompare = !!oldMockData ? true : false;
      if (this.isCompare) {
        this.oldDetail = JSON.parse(JSON.stringify(oldMockData));
        this.oldReview = JSON.parse(JSON.stringify(oldMockData));
        if (!!oldMockData?.activityListCondition) {
          this.oldDetail.tagGroupView = CommonUtil.groupBy(oldMockData.activityListCondition, 'tagGroup');
        }
        this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
        this.compareCondition(this.detail.tagGroupView, 'old');
      }
      this.loadingService.close();
      return;
    }

    this.reviewManageService.getActivityReviewRow(this.historyId).pipe(
      filter(res => res.code === RestStatus.SUCCESS),
      catchError(err => {
        this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回標籤審核列表`);
        this.loadingService.close();
        throw new Error(err.message);
      }),
      takeUntil(this.unsubscribe$),
      tap(res => {
        this.newDetail = JSON.parse(JSON.stringify(res.result));
        this.newReview = JSON.parse(JSON.stringify(res.result));
        this.reviewStatus = res.result.reviewStatus;
        this.reviewComment = res.result.reviewComment;
        this.newDetail.tagGroupView = CommonUtil.groupBy(res.result.activityListCondition, 'tagGroup');
        this.detail = this.newDetail;
        Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
        const processedData = CommonUtil.getHistoryProcessData<ActivityDetail>('activityReviewHistoryAud', this.newDetail as ActivityDetail);
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail = processedData.detail;
          this.historyGroupView = this.detail.historyGroupView;
        }
        this.loadingService.close();
      })
    ).subscribe(() => {
      this.reviewManageService.getLastApprovedActivity(this.historyId).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          let status = Object.values(WarningCode).includes(err.code) ? null : false;
          this.dialogService.alertAndBackToList(status, `${err.message}，無前次核准紀錄`);
          this.loadingService.close();
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => {
          this.isCompare = !!res.result ? true : false;
          if (this.isCompare) {
            this.oldDetail = JSON.parse(JSON.stringify(res.result));
            this.oldReview = JSON.parse(JSON.stringify(res.result));
            if (!!res.result?.activityListCondition) {
              this.oldDetail.tagGroupView = CommonUtil.groupBy(res.result.activityListCondition, 'tagGroup');
            }
            this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
            this.compareCondition(this.detail.tagGroupView, 'old');
          }
          this.loadingService.close();
        })
      ).subscribe();
    });

  }

  viewToggle() {
    this.isBefore = !this.isBefore;
    this.detail = this.isBefore === true ? this.oldDetail : this.newDetail;
    let review = this.isBefore === true ? this.oldReview : this.newReview;
    this.detail.tagGroupView = CommonUtil.groupBy(review.activityListCondition, 'tagGroup');
    this.compareCondition(this.detail.tagGroupView, this.isBefore === true ? 'new' : 'old');
    Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
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

  getConditionClass(key: number) {
    let isSame = this.isSameCon[key];
    return !!isSame ? 'true' : !isSame && !!this.isBefore ? 'null' : 'false';
  }

  compareCondition(groupViewA: { [x: number]: TagGroupView[] }, compareToType: 'new' | 'old') {
    this.isSameCon = {};
    let groupViewB = compareToType === 'new' ? this.newDetail.tagGroupView : this.oldDetail.tagGroupView;
    let conA = Object.keys(groupViewA);
    let conB = Object.keys(groupViewB);
    let keysA = conA.map(con => {
      let groups = groupViewA[con] as TagGroupView[];
      return groups.map(group => group.tagId);
    });
    let keysB = conB.map(con => {
      let groups = groupViewB[con] as TagGroupView[];
      return groups.map(group => group.tagId);
    });
    // console.info(keysA, keysB);
    keysA.forEach((keyA, i) => {
      this.isSameCon[i] = JSON.stringify(keyA) === JSON.stringify(keysB[i]);
    });
  }

  send(reviewStatus: 'rejected' | 'approved') {
    let dialogOption = { title: '客群名單異動駁回說明', isApproved: reviewStatus === 'approved' };

    if (this.isMock) {
      this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(mockInfo => {
        this.dialogService.openReview(dialogOption).close();
        this.router.navigate(['pages', 'review-manage', 'review-activity-list']);
      });
      return;
    }

    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateActivityReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => this.router.navigate(['pages', 'review-manage', 'review-activity-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'review-activity-list']);
  }
}
