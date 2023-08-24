import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ActivityDetail, ActivitySetting } from '@api/models/activity-list.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { RestStatus } from '@common/enums/rest-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
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
  isConditionOpen: { [x: number]: boolean } = {}; //活動名單條件收合
  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  activityId: string;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerManageService: CustomerManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super(storageService, configService);
  }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.params.activityId;
    this.loadingService.open();

    if (this.isMock) {
      let mockData = ActivityListMock.find(activity => activity.activityId === this.activityId)
      this.setData(mockData);
      this.loadingService.close();
      return;
    }

    this.customerManageService.getActivitySettingRow(this.activityId).pipe(
      catchError(err => {
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回客群活動名單', ['pages', 'customer-manage', 'activity-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.setData(res.result);
        this.loadingService.close();
      }),
    ).subscribe();
  }

  setData(result: ActivitySetting) {
    this.detail = JSON.parse(JSON.stringify(result));
    const processedData = CommonUtil.getHistoryProcessData<ActivitySetting>('activityReviewHistoryAud', result as ActivitySetting);
    if (!!processedData) {
      this.isHistoryOpen = processedData.isHistoryOpen;
      this.detail.historyGroupView = processedData.detail?.historyGroupView;
    }
    this.detail.tagGroupView = CommonUtil.groupBy(result.activityListCondition, 'tagGroup');
    Object.keys(this.detail.tagGroupView).forEach(key => this.isConditionOpen[key] = true);
  }

  edit() {
    this.router.navigate(['pages', 'customer-manage', 'activity-set', this.activityId]);
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }
}
