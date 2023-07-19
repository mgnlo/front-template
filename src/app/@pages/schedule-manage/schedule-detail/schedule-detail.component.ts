import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleDetailView, ScheduleSetting } from '@api/models/schedule-manage.model';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent extends BaseComponent implements OnInit {
  detail: ScheduleDetailView;
  checkData: ScheduleSetting;
  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合

  constructor(private router: Router) {
    super();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!!currentNavigation?.extras) {
      const state = currentNavigation.extras.state;
      //const processedData = CommonUtil.getHistoryProcessData<ScheduleSetting>(state); // 将Person类型作为类型参数传递
      ///console.log('Processed Data:', processedData);
    }
  }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-add', 'edit', this.checkData.scheduleId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-list']);
  }
}
