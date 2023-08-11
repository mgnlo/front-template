import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleActivitySetting, ScheduleDetailView, ScheduleReviewHistory } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { StorageService } from '@api/services/storage.service';
import { ScheduleActivitySettingMock } from '@common/mock-data/schedule-activity-list-mock';
import { ScheduleReviewHistoryMock } from '@common/mock-data/schedule-review-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

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
  activitySettingView = { add: [], remove: [], same: [] }; //名單列表差異

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    storageService: StorageService,
  ) {
    super(storageService);
  }

  ngOnInit(): void {
    this.historyId = this.activatedRoute.snapshot.params.historyId;
    let scheduleReview = ScheduleReviewHistoryMock.filter(row => row.historyId === this.historyId)[0];
    let list = ScheduleActivitySettingMock.filter(row => row.scheduleId === scheduleReview.referenceId)[0];
    this.newDetail = JSON.parse(JSON.stringify(scheduleReview));
    this.oldDetail = JSON.parse(JSON.stringify(list));
    this.detail = this.newDetail;
    this.reviewStatus = scheduleReview.reviewStatus;
    this.reviewComment = scheduleReview.reviewComment;
    this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);

    let newActivityList = scheduleReview.newActivitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } })
    let oldActivityList = scheduleReview.lastActivitySetting.map(activity => { return { key: activity.activityId, value: activity.activityName } })
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

    // console.info(this.activitySettingView)
    const processedData = CommonUtil.getHistoryProcessData<ScheduleActivitySetting>('scheduleReviewHistory', list as ScheduleActivitySetting);
    if (!!processedData) {
      this.isHistoryOpen = processedData.isHistoryOpen;
      this.oldDetail.historyGroupView = processedData.detail.historyGroupView;
      this.newDetail.historyGroupView = processedData.detail.historyGroupView;
    }
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

  approve() {
    this.dialogService.openApprove({ bool: true, backTo: 'schedule-review-list' });
  }

  reject() {
    this.dialogService.openReject({ title: '名單排程異動駁回說明', backTo: 'schedule-review-list' });
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'schedule-review-list']);
  }

}
