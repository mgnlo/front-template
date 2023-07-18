import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivityReviewHistory } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'activity-review-detail',
  templateUrl: './activity-review-detail.component.html',
  styleUrls: ['./activity-review-detail.component.scss'],
})
export class ActivityReviewDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  detail: ActivityDetail;
  isConditionOpen: {[x: number]: boolean} = {}; //活動名單條件收合
  isHistoryOpen: {[x: number]: boolean} = []; //異動歷程收合
  isBefore: boolean = false;
  isSame: {[x:string]: boolean} = {};
  reviewStatus: string;
  reviewComment: string;

  constructor(private router: Router, private dialogService: DialogService) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      let activityReviewHistory = this.router.getCurrentNavigation().extras.state as ActivityReviewHistory;
      this.reviewStatus = activityReviewHistory.reviewStatus;
      this.reviewComment = activityReviewHistory.reviewComment;
      let list = ActivityListMock.filter(row => row.activityId === activityReviewHistory.referenceId)[0];
      this.detail = JSON.parse(JSON.stringify(list));

      this.detail.tagGroupView = this.groupBy(list.activityListCondition, 'tagGroup');
      Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);

      this.detail.historyGroupView = {};
      list.activityReviewHistory.forEach(history => {
        if(!this.detail.historyGroupView || !this.detail.historyGroupView[history.groupId]){
          this.isHistoryOpen[history.groupId] = true;
          this.detail.historyGroupView[history.groupId] = {
            type: history.type,
            flows: [{time: history.time, title: history.title, detail: history.detail}]
          };
        } else {
          this.detail.historyGroupView[history.groupId].flows.push({time: history.time, title: history.title, detail: history.detail});
        }
      });
    }
  }

  ngOnInit(): void {
  }

  viewToggle() {
    this.isBefore = !this.isBefore;
  }
  
  agree() {
    this.dialogService.openAgree('activity-review-list');
  }

  reject() {
    this.dialogService.openReject({title: '客群名單異動駁回說明', backTo: 'activity-review-list'});
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'activity-review-list']);
  }
}