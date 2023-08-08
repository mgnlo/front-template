import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagDetailView, TagSetting } from '@api/models/tag-manage.model';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, tap } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent extends BaseComponent implements OnInit {
  detail: TagDetailView;
  checkData: TagSetting;
  mockData: Array<ActivitySetting> = ActivityListMock;

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合
  tagId: string;

  fileName: string = "";

  constructor(
    storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagManageService: TagManageService,
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
        valuePrepareFunction: (cell: any) => {
          return `<span class="date">${cell}</span>`;
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
    this.dataSource = new LocalDataSource();
    this.mockData = this.mockData.map(mock => {
      return { ...mock, during: `${mock.startDate}~${mock.endDate}` } //起訖日區間
    })
    this.dataSource.load(this.mockData);
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
