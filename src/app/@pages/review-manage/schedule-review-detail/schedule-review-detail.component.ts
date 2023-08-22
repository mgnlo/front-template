import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryGroupView, ScheduleDetailView, ScheduleReviewHistory } from '@api/models/schedule-activity.model';
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
  selector: 'schedule-review-detail',
  templateUrl: './schedule-review-detail.component.html',
  styleUrls: ['./schedule-review-detail.component.scss']
})
export class ScheduleReviewDetailComponent extends BaseComponent implements OnInit {

  detail: ScheduleDetailView;
  oldDetail: ScheduleDetailView;
  newDetail: ScheduleDetailView;
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  isSameList: { [x: string]: boolean } = {}; //差異比較
  isBefore: boolean = false;
  reviewStatus: string;
  reviewComment: string;
  historyId: string;
  isCompare: boolean = false;
  activitySettingView = { add: [], remove: [], same: [] }; //名單列表差異
  historyGroupView: { [x: number]: HistoryGroupView } //歷史紀錄

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private reviewManageService: ReviewManageService,
    private dialogService: DialogService,
    storageService: StorageService,
  ) {
    super(storageService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;

    this.loadingService.open();
    combineLatest([
      this.reviewManageService.getScheduleReviewRow(this.historyId),
      this.reviewManageService.getLastApprovedSchedule(this.historyId)
    ]).pipe(
      filter(res => res[0].code === RestStatus.SUCCESS && res[1].code === RestStatus.SUCCESS),
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回名單排程審核列表`, ['pages', 'review-manage', 'schedule-review-list']);
        throw new Error(err.message);
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe(([reviewData, lastData]) => {
      this.newDetail = JSON.parse(JSON.stringify(reviewData.result));
      this.detail = this.newDetail;
      this.reviewStatus = reviewData.result.reviewStatus;
      this.reviewComment = reviewData.result.reviewComment;
      this.isCompare = !!lastData.result ? true : false;
      let newActivityList: { key: string, value: string }[] = [];
      if (!!reviewData.result?.activitySetting) {
        newActivityList = reviewData.result.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } });
      }
      const processedData = CommonUtil.getHistoryProcessData<ScheduleReviewHistory>('scheduleReviewHistory', reviewData.result as ScheduleReviewHistory);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.historyGroupView = processedData.detail.historyGroupView;
      }
      if (this.isCompare) {
        this.oldDetail = JSON.parse(JSON.stringify(lastData.result));
        this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
        let oldActivityList: { key: string, value: string }[] = [];
        if (!!lastData.result?.activitySetting) {
          oldActivityList = lastData.result.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } })
        }
        let allActivityList = newActivityList.concat(oldActivityList.filter(oldActivity => !newActivityList.find(newActivity => newActivity.key == oldActivity.key)));
        allActivityList.forEach(activity => {
          let activityId = activity.key;
          let oldActivityIds = oldActivityList.map(oldActivity => oldActivity.key);
          let newActivityIds = newActivityList.map(newActivity => newActivity.key);
          if (oldActivityIds.includes(activityId) && newActivityIds.includes(activityId)) {
            this.activitySettingView.same.push(activity.value);
          } else if (oldActivityIds.includes(activityId) && !newActivityIds.includes(activityId)) {
            this.activitySettingView.remove.push(activity.value);
          } else if (!oldActivityIds.includes(activityId) && newActivityIds.includes(activityId)) {
            this.activitySettingView.add.push(activity.value);
          }
        });
      } else {
        this.activitySettingView.add.push(newActivityList.map(activity => activity.value));
      }
      this.loadingService.close();
    });

    // console.info(this.detail)
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

  viewToggle() {
    this.isBefore = !this.isBefore;
    this.detail = this.isBefore === true ? this.oldDetail : this.newDetail;
  }

  send(reviewStatus: 'rejected' | 'approved') {
    let dialogOption = { title: '名單排程異動駁回說明', isApproved: reviewStatus === 'approved' };
    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateScheduleReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => this.router.navigate(['pages', 'review-manage', 'schedule-review-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'schedule-review-list']);
  }

}
