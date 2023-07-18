import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { TagDetailView, TagReviewHistory } from '@api/models/tag-list.model';
import { DialogService } from '@api/services/dialog.service';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'tag-review-detail',
  templateUrl: './tag-review-detail.component.html',
  styleUrls: ['./tag-review-detail.component.scss'],
})
export class TagReviewDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  detail: TagDetailView;
  isConditionOpen: {[x: number]: boolean} = {}; //活動名單條件收合
  isHistoryOpen: {[x: number]: boolean} = []; //異動歷程收合
  isBefore: boolean = false;
  isSame: {[x:string]: boolean} = {};
  reviewStatus: string;
  reviewComment: string;

  mongoDB = "{variables: {$elemMatch: {key:'產品持有數', value: {$gte: 3}}}}";

  constructor(private router: Router, private dialogService: DialogService) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      let tagReview = this.router.getCurrentNavigation().extras.state as TagReviewHistory;
      let list = TagSettingMock.filter(row => row.tagId === tagReview.referenceId)[0];
      this.detail = JSON.parse(JSON.stringify(list));
      this.reviewStatus = tagReview.reviewStatus;
      this.reviewComment = tagReview.reviewComment;
      console.info(this.detail)

      this.detail.historyGroupView = {};
      list.tagReviewHistory.forEach(history => {
        if(!this.detail.historyGroupView || !this.detail.historyGroupView[history.groupId]){
          this.isHistoryOpen[history.groupId] = true;
          this.detail.historyGroupView[history.groupId] = {
            type: history.type,
            flows: [
              {historyId: history.historyId, time: history.time, title: history.title, detail: history.detail}
            ]
          };
        } else {
          this.detail.historyGroupView[history.groupId].flows.push(
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

  approve() {
    this.dialogService.openApprove({bool: true, backTo: 'tag-review-list'});
  }

  reject() {
    this.dialogService.openReject({title: '標籤異動駁回說明', backTo: 'tag-review-list'});
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'tag-review-list']);
  }
}