import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagDetailView, TagSetting } from '@api/models/tag-manage.model';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent extends BaseComponent implements OnInit {
  detail: TagDetailView;
  checkData: TagSetting;
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  constructor(private router: Router) {
    super();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!!currentNavigation?.extras) {
      const state = currentNavigation.extras.state;
      const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', state as TagSetting); // 異動歷程處理
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail = processedData.detail;
      }
    }

  }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['pages', 'tag-manage', 'tag-add', 'edit', this.checkData.tagId], { state: this.detail });
  }

  copy() {
    this.router.navigate(['pages', 'tag-manage', 'tag-add', 'copy', this.checkData.tagId], { state: this.checkData });
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

}
