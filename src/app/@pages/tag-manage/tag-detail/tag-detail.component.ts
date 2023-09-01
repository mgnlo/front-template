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
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { catchError, filter, tap, finalize } from 'rxjs/operators';
import { TagManageService } from '../tag-manage.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { ConfigService } from '@api/services/config.service';
import { FileService } from '@api/services/file.service';
import { FileReq } from '@api/models/file.model';
import { LoginService } from '@api/services/login.service';

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
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private tagManageService: TagManageService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      activityName: {
        title: '活動名稱',
        type: 'string',
        sort: false,
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `<p>${!!cell ? cell : ''}</p>`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + value + `</p>`;
        },
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + value + `</p>`;
        },
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + Status[cell] + `</p>`;
        },
        sort: false,
      },
      during: {
        title: '起迄時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: any, row: ActivitySetting) => {
          return row.startDate && row.endDate ? `<p class="text_center">${row.startDate} ~ ${row.endDate}</p>` : '';
        },
        sort: false,
      },
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  ngOnInit(): void {
    this.tagId = this.activatedRoute.snapshot.params.tagId;

    if (this.isMock) {
      let mockData = TagSettingMock.find(tag => tag.tagId === this.tagId)
      this.detail = JSON.parse(JSON.stringify(mockData));
      const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistoryAud', mockData as TagSetting); // 異動歷程處理
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail.historyGroupView = processedData.detail?.historyGroupView;
      }
      this.loadingService.close();
      this.dataSource.load(ActivityListMock);
      return;
    }

    //#region 取得標籤明細
    this.loadingService.open();
    this.tagManageService.getTagSettingRow(this.tagId).pipe(
      catchError(err => {
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回標籤管理', ['pages', 'tag-manage', 'tag-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.detail = JSON.parse(JSON.stringify(res.result));
        console.info('this.detail', this.detail)
        const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistoryAud', res.result as TagSetting); // 異動歷程處理
        if (!!processedData) {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail.historyGroupView = processedData.detail?.historyGroupView;
        }
      }),
      finalize(() => this.loadingService.close())
    ).subscribe();
    //#endregion

    //#region 搜尋客群名單 BY TagId
    let searchInfo: SearchInfo = {
      apiUrl: `${this.tagManageService.tagFunc}${this.tagId}/activity-setting`,
      nowPage: this.paginator.nowPage,
      //filters: this.validateForm.getRawValue(),
      errMsg: '標籤使用範圍查無資料'
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
    //#endregion
  }

  //#region 檔案下載
  onDownloadFile() {
    //this.detail.fileData = 'fd79b9b3-e71e-441d-91b3-43594462d3c8';
    if (CommonUtil.isBlank(this.detail?.fileData)) {
      this.dialogService.alertAndBackToList(false, '檔案下載失敗(無識別碼)');
      return
    }

    this.fileService.downloadFileService(new FileReq({
      fileDataId: this.detail.fileData,
      fileName: this.detail?.fileName,
      uploadType: this.detail?.uploadType
    }));
  }
  //#endregion

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
