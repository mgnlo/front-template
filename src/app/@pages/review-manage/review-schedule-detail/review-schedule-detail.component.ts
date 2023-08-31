import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryGroupView, ScheduleDetailView, ScheduleReviewHistory } from '@api/models/schedule-activity.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { ScheduleReviewHistoryMock } from '@common/mock-data/schedule-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { catchError, filter, takeUntil, tap } from 'rxjs/operators';
import { ReviewManageService } from '../review-manage.service';

@Component({
  selector: 'review-schedule-detail',
  templateUrl: './review-schedule-detail.component.html',
  styleUrls: ['./review-schedule-detail.component.scss']
})
export class ReviewScheduleDetailComponent extends BaseComponent implements OnInit {

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
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private reviewManageService: ReviewManageService,
    private dialogService: DialogService,
  ) {
    super(storageService, configService, loginService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;

    this.loadingService.open();

    if (this.isMock) {
      let newMockData = ScheduleReviewHistoryMock.find(schedule => schedule.historyId === this.historyId);
      this.newDetail = JSON.parse(JSON.stringify(newMockData));
      this.detail = this.newDetail;
      this.reviewStatus = newMockData.reviewStatus;
      this.reviewComment = newMockData.reviewComment;
      const processedData = CommonUtil.getHistoryProcessData<ScheduleReviewHistory>('scheduleReviewHistoryAud', newMockData as ScheduleReviewHistory);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.historyGroupView = processedData.detail.historyGroupView;
      }
      let newActivityList: { key: string, value: string }[] = [];
      if (!!newMockData?.activitySetting) {
        newActivityList = newMockData.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } });
      }
      let oldMockData = ScheduleActivitySettingMock.find(schedule => schedule.scheduleId === newMockData.referenceId);
      this.isCompare = !!oldMockData ? true : false;
      if (this.isCompare) {
        this.oldDetail = JSON.parse(JSON.stringify(oldMockData));
        this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
        let oldActivityList: { key: string, value: string }[] = [];
        if (!!oldMockData?.activitySetting) {
          oldActivityList = oldMockData.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } })
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
      return;
    }

    this.reviewManageService.getScheduleReviewRow(this.historyId).pipe(
      filter(res => res.code === RestStatus.SUCCESS),
      catchError(err => {
        this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回名單排程審核列表`, ['pages', 'review-manage', 'review-schedule-list']);
        this.loadingService.close();
        throw new Error(err.message);
      }),
      takeUntil(this.unsubscribe$),
      tap(res => {
        this.newDetail = JSON.parse(JSON.stringify(res.result));
        this.detail = this.newDetail;
        this.reviewStatus = res.result.reviewStatus;
        this.reviewComment = res.result.reviewComment;
        const processedData = CommonUtil.getHistoryProcessData<ScheduleReviewHistory>('scheduleReviewHistoryAud', res.result as ScheduleReviewHistory);
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.historyGroupView = processedData.detail.historyGroupView;
        }
        this.loadingService.close();
      })
    ).subscribe(res => {
      let newActivityList: { key: string, value: string }[] = [];
      if (!!res.result?.activitySetting) {
        newActivityList = res.result.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } });
      }

      this.reviewManageService.getLastApprovedSchedule(this.historyId).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.dialogService.alertAndBackToList(false, `${err.message}，無前次核准紀錄`);
          this.loadingService.close();
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => {
          this.isCompare = !!res.result ? true : false;
          if (this.isCompare) {
            this.oldDetail = JSON.parse(JSON.stringify(res.result));
            this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
            let oldActivityList: { key: string, value: string }[] = [];
            if (!!res.result?.activitySetting) {
              oldActivityList = res.result.activitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } })
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
        })
      ).subscribe();
    })
  }

  processExecutionFrequency(frequency: string, frequencyTime: string) {
    return CommonUtil.processExecutionFrequency(frequency, frequencyTime);
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

    if (this.isMock) {
      this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(mockInfo => {
        this.dialogService.openReview(dialogOption).close();
        this.router.navigate(['pages', 'review-manage', 'review-schedule-list']);
      });
      return;
    }

    this.dialogService.openReview(dialogOption).componentRef.instance.emit.subscribe(reviewInfo => {
      let req = { reviewStatus: reviewStatus, reviewComment: reviewInfo.reviewComment }
      this.reviewManageService.updateScheduleReview(this.historyId, req).pipe(
        filter(res => res.code === RestStatus.SUCCESS),
        catchError(err => {
          this.dialogService.alertAndBackToList(false, err);
          throw new Error(err.message);
        }),
        takeUntil(this.unsubscribe$),
        tap(res => this.router.navigate(['pages', 'review-manage', 'review-schedule-list']))
      ).subscribe();
    })
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'review-schedule-list']);
  }

}
