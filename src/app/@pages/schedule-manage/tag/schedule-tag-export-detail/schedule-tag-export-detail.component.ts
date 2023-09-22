import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileReq } from '@api/models/file.model';
import { Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { ScheduleTagSetting } from '@api/models/schedule-tag.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { FileService } from '@api/services/file.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, StatusResult } from '@common/enums/common-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { ScheduleManageService } from '@pages/schedule-manage/schedule-manage.service';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'schedule-tag-export-detail',
  templateUrl: './schedule-tag-export-detail.component.html',
  styleUrls: ['./schedule-tag-export-detail.component.scss']
})
export class ScheduleTagExportDetailComponent extends BaseComponent implements OnInit {

  params: any;//路由參數

  //預設資料來源
  detail: ScheduleTagSetting;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private fileService: FileService,
    private dialogService: DialogService,
    private tagManageService: TagManageService,
    private scheduleManageService: ScheduleManageService,
  ) {
    super(storageService, configService, loginService);
    this.params = this.activatedRoute.snapshot.params;
  }


  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    tableId: 'true',
    columns: {
      historyId: {
        title: '項次',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">` + (cell ?? "") + `</p>`;
        },
        sort: false
      },
      batchTime: {
        title: '批次時間',
        type: 'html',
        class: 'w300',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p>${datepipe.transform(cell, "yyyy-MM-dd HH:mm:ss")}</p>`;
        },
        sort: false,
      },
      batchResult: {
        title: '排程結果',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          const lableName = '批次排程'
          const cellLow = cell?.toLowerCase();
          if (CommonUtil.isBlank(cellLow)) return cellLow
          return `<p class="text_center ${(ColumnClass[cellLow] || '')}">${lableName}${(StatusResult[cellLow] || '')}</p>`;
        },
        sort: false,
      },
      batchResultCount: {
        title: '貼標筆數',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">${cell ?? 0}</p>`;
        },
        sort: false
      },
      action: {
        title: '匯出',
        type: 'custom',
        class: 'center',
        width: '3rem',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = {
            btnStatus: 'success',
            btnIcon: 'cloud-download-outline',
            disabled:
            (
              this.loginService.userProfileSubject?.value?.businessUnit?.toLowerCase()
              !==
              this.detail?.department?.toLowerCase()
            )
          }
          instance.getRow.subscribe((res: Schedule_Batch_History) => {
            instance.isShow = res.batchResult.toLowerCase() === 'success';
          });
          instance.emitter.subscribe((res: Schedule_Batch_History) => {
            this.scheduleManageService.batchDownload(res.historyId, this.detail.tagName);
          })
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

  ngOnInit(): void {
    this.loadingService.open();
    if (this.isMock) {
      this.detail = ScheduleTagSettingMock[0];
      this.dataSource.load(this.detail.scheduleBatchHistory);
      this.loadingService.close();
      return;
    }

    let tagId = this.activatedRoute.snapshot.params.tagId;
    this.dataSource = new LocalDataSource();
    this.tagManageService.getTagSettingRow(tagId).pipe(
      catchError(err => {
        this.dialogService.alertAndBackToList(false, '查無此筆資料，將為您導回貼標排程', ['pages', 'schedule-manage', 'schedule-tag-list']);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.detail = JSON.parse(JSON.stringify(res.result));
        this.dataSource.load(this.detail.scheduleBatchHistory);
        this.dataSource.setSort([{ field: 'batchTime', direction: 'desc' }]);
      }),
      finalize(() => this.loadingService.close())
    ).subscribe();
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-list']);
  }

}
