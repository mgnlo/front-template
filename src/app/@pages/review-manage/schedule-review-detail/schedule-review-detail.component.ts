import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleDetailView } from '@api/models/schedule-activity.model';
import { DialogService } from '@api/services/dialog.service';
import { StorageService } from '@api/services/storage.service';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'schedule-review-detail',
  templateUrl: './schedule-review-detail.component.html',
  styleUrls: ['./schedule-review-detail.component.scss']
})
export class ScheduleReviewDetailComponent extends BaseComponent implements OnInit {

  detail: ScheduleDetailView;

  isSameList: { [x: string]: boolean } = {}; //差異比較
  isBefore: boolean = false;

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  beforeAfterTitle: string = '前';

  constructor(
    private router: Router,
    private dialogService: DialogService,
    storageService: StorageService,
  ) {
    super(storageService);
  }

  ngOnInit(): void {
  }

  //#region 更改欄位顯示顏色
  changeClass(key1: string, key2?: string) {
    let isSame1 = this.isSameList[key1];
    if (!key2) {
      return !!isSame1 ? 'true' : !isSame1 && !!this.isBefore ? 'null' : 'false';
    } else {
      let isSame2 = this.isSameList[key2];
      return !!isSame1 && !!isSame2 ? 'true' : (!isSame1 || !isSame2) && !!this.isBefore ? 'null' : 'false';
    }
  }
  //#endregion

  changeBeforeAfter() {
    this.beforeAfterTitle = (this.beforeAfterTitle === '前') ? '後' : '前';
  }

  approve() {
    this.dialogService.openApprove({ bool: true, backTo: 'schedule-review-list' });
  }

  reject() {
    this.dialogService.openReject({ title: '客群名單異動駁回說明', backTo: 'schedule-review-list' });
  }

  cancel() {
    this.router.navigate(['pages', 'review-manage', 'schedule-review-list']);
  }

}
