import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagDetailView, TagSetting } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { CustomServerDataSource } from '@common/custom/ng2-smart-table/custom-server-data-source';
import { Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { catchError, filter, takeUntil, tap } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent extends BaseComponent implements OnInit {
  detail: TagDetailView;
  checkData: TagSetting;

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  tagId: string;

  fileName: string = "";

  constructor(
    storageService: StorageService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagManageService: TagManageService,
    private customerManageService: CustomerManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
  ) {
    super(storageService);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'html',
        class: 'col-2 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<span class="date">${row.startDate}~${row.endDate}</span>` : '';
        },
        sort: false,
      },
    },
    hideSubHeader: true, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  ngOnInit(): void {
    this.tagId = this.activatedRoute.snapshot.params.tagId;
    //#region 取得標籤明細
    this.loadingService.open();
    this.tagManageService.getTagSettingRow(this.tagId).pipe(
      catchError(err => {
        this.loadingService.close();
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回標籤管理', ['pages', 'tag-manage', 'tag-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', res.result as TagSetting); // 異動歷程處理
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail = processedData.detail;
        }

        this.loadingService.close();
      }),
    ).subscribe();
    //#endregion

    //#region 取得全部活動明細===>後續應該要改用tagId抓個別活動
    this.restDataSource = new CustomServerDataSource(this.http, {
      endPoint: this.customerManageService.getActivitySettingListURL,
      dataKey: 'result.content',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      filterFieldKey: '#field#',
      sortDirKey: 'dir',
      sortFieldKey: 'sort',
      totalKey: 'result.totalElements',
    }, {
      page: this.paginator.nowPage,
    });

    this.restDataSource.apiStatus().pipe(takeUntil(this.unsubscribe$)).subscribe(status => {
      switch (status) {
        case 'init':
          this.loadingService.open();
          break;
        case 'error':
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, '標籤使用範圍查無資料');
          break;
        default:
          this.loadingService.close();
          break;
      }
    });
    //#endregion
  }

  edit() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set', 'edit', this.detail.tagId]);
  }

  copy() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set', 'copy', this.detail.tagId]);
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

}
