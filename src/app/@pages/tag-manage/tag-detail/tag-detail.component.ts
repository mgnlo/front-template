import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagDetailView, TagSetting } from '@api/models/tag-list.model';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent extends BaseComponent implements OnInit {
  detail: TagDetailView;
  editData: TagSetting;
  isHistoryOpen: {[x: number]: boolean} = []; //異動歷程收合

  constructor(private router: Router) {
    super();
    if(!!this.router.getCurrentNavigation()?.extras){
      debugger
      this.editData = this.router.getCurrentNavigation().extras.state as TagSetting;
      if(!this.editData){ return null};
      let tagSetting = this.editData
      this.detail = JSON.parse(JSON.stringify(tagSetting));

      this.detail.historyGroupView = {};
      tagSetting.tagReviewHistory.forEach(history => {
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

  ngOnInit(): void {
  }

  edit() {
  }

  cancel(){
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

}
