import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { TagReview, TagReviewDetail } from '@api/models/tag-review.model';
import { Schedule, Status } from '@common/enums/common-enum';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'tag-review-detail',
  templateUrl: './tag-review-detail.component.html',
  styleUrls: ['./tag-review-detail.component.scss'],
})
export class TagReviewDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  detail: TagReviewDetail;
  isConditionOpen: {[x: number]: boolean} = {}; //活動名單條件收合
  isHistoryOpen: {[x: number]: boolean} = []; //異動歷程收合

  constructor(private router: Router) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      let tagReview = this.router.getCurrentNavigation().extras.state as TagReview;
      if(!tagReview){ return null};
      this.detail = JSON.parse(JSON.stringify(tagReview));
      console.info(this.detail)
      this.detail.tagConditionSettingView = this.groupBy(tagReview.tagConditionSetting, 'groupId');

      this.detail.tagReviewHistoryView = {};
      tagReview.tagReviewHistory.forEach(history => {
        if(!this.detail.tagReviewHistoryView || !this.detail.tagReviewHistoryView[history.groupId]){
          this.isHistoryOpen[history.groupId] = true;
          this.detail.tagReviewHistoryView[history.groupId] = {
            type: history.type,
            flows: [
              {historyId: history.historyId, time: history.time, title: history.title, detail: history.detail}
            ]
          };
        } else {
          this.detail.tagReviewHistoryView[history.groupId].flows.push(
            {historyId: history.historyId, time: history.time, title: history.title, detail: history.detail}
          );
        }
      });
    }
  }

  public ngOnInit(): void {
  }

  viewBefore() {

  }

  agree() {
    this.router.navigate(['pages', 'review-manage', 'tag-review']);
  }

  disagree() {
    this.router.navigate(['pages', 'review-manage', 'tag-review']);
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'tag-review']);
  }
}