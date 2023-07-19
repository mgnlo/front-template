import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivitySetting } from '@api/models/activity-list.model';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  detail: ActivityDetail;
  editData: ActivitySetting;
  isConditionOpen: {[x: number]: boolean} = {}; //活動名單條件收合
  isHistoryOpen: {[x: number]: boolean} = {}; //異動歷程收合

  constructor(private router: Router) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      this.editData = this.router.getCurrentNavigation().extras.state as ActivitySetting;
      if(!this.editData){ return null};
      let activitySetting = this.editData
      this.detail = JSON.parse(JSON.stringify(activitySetting));

      this.detail.tagGroupView = CommonUtil.groupBy(activitySetting.activityListCondition, 'tagGroup');
      Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);

      this.detail.historyGroupView = {};
      activitySetting.activityReviewHistory.forEach(history => {
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
      
      console.info(this.detail)
    }
  }

  public ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['pages', 'customer-manage', 'activity-add', this.editData.activityId],{state: this.editData});
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }
}