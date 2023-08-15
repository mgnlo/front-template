import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivityReviewHistory, ActivitySetting, TagGroupView } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { StorageService } from '@api/services/storage.service';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

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

  constructor(storageService: StorageService, private router: Router, private dialogService: DialogService) {
    super(storageService);
    if (!!this.router.getCurrentNavigation()?.extras) {
      this.newReview = this.router.getCurrentNavigation().extras.state as ActivityReviewHistory;
      this.reviewStatus = this.newReview.reviewStatus;
      this.reviewComment = this.newReview.reviewComment;
      this.oldReview = ActivityListMock.filter(row => row.activityId === this.newReview.referenceId)[0];
      this.newDetail = JSON.parse(JSON.stringify(this.newReview));
      this.oldDetail = JSON.parse(JSON.stringify(this.oldReview));
      this.newDetail.tagGroupView = CommonUtil.groupBy(this.newReview.activityListCondition, 'tagGroup');
      this.oldDetail.tagGroupView = CommonUtil.groupBy(this.oldReview.activityListCondition, 'tagGroup');
      this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
      this.detail = this.newDetail;
      this.compareCondition(this.detail.tagGroupView, 'old');
      Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
      console.info(this.detail.tagGroupView)
      const processedData = CommonUtil.getHistoryProcessData<ActivitySetting>('activityReviewHistory', this.oldReview as ActivitySetting);
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail = processedData.detail;
      }
    }
  }

  ngOnInit(): void {
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

  approve() {
    this.dialogService.openApprove({ bool: true, backTo: 'activity-review-list' });
  }

  reject() {
    this.dialogService.openReject({ title: '客群名單異動駁回說明', backTo: 'activity-review-list' });
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'activity-review-list']);
  }
}