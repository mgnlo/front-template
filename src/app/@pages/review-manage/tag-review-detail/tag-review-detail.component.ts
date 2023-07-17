import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { TagReview, TagReviewDetail } from '@api/models/tag-review.model';
import { DialogService } from '@api/services/dialog.service';
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
  isBefore: boolean = false;

  constructor(private router: Router, private dialogService: DialogService) {
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

  viewToggle() {
    this.isBefore = !this.isBefore;
  }

  agree() {
    this.dialogService.openAgree('tag-review');
  }

  reject() {
    this.dialogService.openReject({title: '標籤異動駁回說明', backTo: 'tag-review'});
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'tag-review']);
  }
}