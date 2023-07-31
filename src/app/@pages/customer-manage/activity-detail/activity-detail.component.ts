import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivitySetting } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { catchError, filter, tap } from 'rxjs/operators';
import { CustomerManageService } from '../customer-manage.service';

@Component({
  selector: 'activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent extends BaseComponent implements OnInit {

  navigation: Navigation;
  detail: ActivityDetail;
  editData: ActivitySetting;
  isConditionOpen: { [x: number]: boolean } = {}; //活動名單條件收合
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  activityId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CustomerManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params.activityId;
    this.loadingService.open();
    this.service.getActivitySettingGet(this.activityId).pipe(
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回客群活動名單', ['pages', 'customer-manage', 'activity-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.detail = JSON.parse(JSON.stringify(res.result));
        this.detail.tagGroupView = CommonUtil.groupBy(res.result.activityListCondition, 'tagGroup');
        Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);

        if (res.result.activityReviewHistory.length > 0) {
          this.detail.historyGroupView = {};
          res.result.activityReviewHistory.forEach(history => {
            if (!this.detail.historyGroupView || !this.detail.historyGroupView[history.groupId]) {
              this.isHistoryOpen[history.groupId] = true;
              this.detail.historyGroupView[history.groupId] = {
                type: history.type,
                flows: [{ time: history.time, title: history.title, detail: history.detail }]
              };
            } else {
              this.detail.historyGroupView[history.groupId].flows.push({ time: history.time, title: history.title, detail: history.detail });
            }
          });
        }

        this.loadingService.close();
      }),
    ).subscribe()
  }

  edit() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set', this.activityId], { state: this.editData });
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }
}