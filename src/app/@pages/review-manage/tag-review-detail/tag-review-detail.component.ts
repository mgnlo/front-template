import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { TagDetailView, TagReviewHistory } from '@api/models/tag-list.model';
import { DialogService } from '@api/services/dialog.service';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'tag-review-detail',
  templateUrl: './tag-review-detail.component.html',
  styleUrls: ['./tag-review-detail.component.scss'],
})
export class TagReviewDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  oldDetail: TagDetailView;
  newDetail: TagDetailView;
  detail: TagDetailView;
  isConditionOpen: {[x: number]: boolean} = {}; //活動名單條件收合
  isHistoryOpen: {[x: number]: boolean} = {}; //異動歷程收合
  isSameList: {[x:string]: boolean} = {};
  isBefore: boolean = false;
  reviewStatus: string;
  reviewComment: string;

  constructor(private router: Router, private dialogService: DialogService) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      let tagReview = this.router.getCurrentNavigation().extras.state as TagReviewHistory;
      let list = TagSettingMock.filter(row => row.tagId === tagReview.referenceId)[0];
      this.newDetail = JSON.parse(JSON.stringify(tagReview));
      this.oldDetail = JSON.parse(JSON.stringify(list));
      this.detail = this.newDetail;
      this.reviewStatus = tagReview.reviewStatus;
      this.reviewComment = tagReview.reviewComment;
      this.isSameList = CommonUtil.compareObj(this.newDetail, this.oldDetail);
      console.info(this.isSameList)
      this.oldDetail.historyGroupView = {};
      list.tagReviewHistory.forEach(history => {
        if(!this.oldDetail.historyGroupView || !this.oldDetail.historyGroupView[history.groupId]){
          this.isHistoryOpen[history.groupId] = true;
          this.oldDetail.historyGroupView[history.groupId] = {
            type: history.type,
            flows: [
              {historyId: history.historyId, time: history.time, title: history.title, detail: history.detail}
            ]
          };
        } else {
          this.oldDetail.historyGroupView[history.groupId].flows.push(
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
    this.detail = this.isBefore === true ? this.oldDetail: this.newDetail;
  }

  changeClass(key1: string, key2?: string){
    let isSame1 = this.isSameList[key1];
    if(!key2){
      return !!isSame1 ? 'true' : !isSame1 && !!this.isBefore ? 'null' : 'false';
    } else {
      let isSame2 = this.isSameList[key2];
      return !!isSame1 && !!isSame2 ? 'true' : (!isSame1 || !isSame2) && !!this.isBefore ? 'null' : 'false';
    }
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