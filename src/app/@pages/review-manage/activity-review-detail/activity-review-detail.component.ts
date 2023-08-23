import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivityReviewHistory, ActivitySetting, TagGroupView } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { combineLatest } from 'rxjs';
import { catchError, filter, takeUntil, tap } from 'rxjs/operators';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'activity-review-detail',
  templateUrl: './activity-review-detail.component.html',
  styleUrls: ['./activity-review-detail.component.scss'],
})
export class ActivityReviewDetailComponent extends BaseComponent implements OnInit {

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

  constructor(
    storageService: StorageService,
    private router: Router,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private reviewManageService: ReviewManageService,
  ) {
    super(storageService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;

    this.loadingService.open();
    combineLatest([
      this.reviewManageService.getActivityReviewRow(this.historyId),
      this.reviewManageService.getLastApprovedActivity(this.historyId)
    ]).pipe(
      filter(res => res[0].code === RestStatus.SUCCESS && res[1].code === RestStatus.SUCCESS),
      catchError(err => {
        this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回客群名單審核列表`, ['pages', 'review-manage', 'activity-review-list']);
        throw new Error(err.message);
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe(([reviewData, lastData]) => {
      this.newDetail = JSON.parse(JSON.stringify(reviewData.result));
      this.detail = this.newDetail;
      this.reviewStatus = reviewData.result.reviewStatus;
      this.reviewComment = reviewData.result.reviewComment;
      this.isCompare = !!lastData.result ? true : false;
      if (!!reviewData.result?.activityListCondition) {
        this.newDetail.tagGroupView = CommonUtil.groupBy(this.newReview.activityListCondition, 'tagGroup');
      }
      const processedData = CommonUtil.getHistoryProcessData<ActivitySetting>('activityReviewHistoryAud', this.oldReview as ActivitySetting);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail.historyGroupView = processedData.detail?.historyGroupView;
        this.newDetail.historyGroupView = this.detail.historyGroupView;
        this.oldDetail.historyGroupView = this.detail.historyGroupView;
        this.detail.tagGroupView = this.newDetail.tagGroupView;
        this.compareCondition(this.detail.tagGroupView, 'old');
        Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
      }
      if (this.isCompare) {
        this.oldDetail = JSON.parse(JSON.stringify(lastData.result));
        if (!!lastData.result?.activityListCondition) {
          this.oldDetail.tagGroupView = CommonUtil.groupBy(this.oldReview.activityListCondition, 'tagGroup');
        }
        this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
      }
      this.loadingService.close();
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
      return groups.map(group => group.tagKey);
    });
    let keysB = conB.map(con => {
      let groups = groupViewB[con] as TagGroupView[];
      return groups.map(group => group.tagKey);
    });
    // console.info(keysA, keysB);
    keysA.forEach((keyA, i) => {
      this.isSameCon[i] = JSON.stringify(keyA) === JSON.stringify(keysB[i]);
    });
  }

  send(reviewStatus: 'rejected' | 'approved') {
    let dialogOption = { title: '客群名單異動駁回說明', isApproved: reviewStatus === 'approved' };
    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateActivityReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => this.router.navigate(['pages', 'review-manage', 'activity-review-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'activity-review-list']);
  }
}
