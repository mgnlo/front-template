import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileReq } from '@api/models/file.model';
import { Schedule_Batch_History } from '@api/models/schedule-activity.model';
import { ScheduleTagSetting } from '@api/models/schedule-tag.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { FileService } from '@api/services/file.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { ColumnClass, StatusResult } from '@common/enums/common-enum';
import { ScheduleTagSettingMock } from '@common/mock-data/schedule-tag-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-tag-export-detail',
  templateUrl: './schedule-tag-export-detail.component.html',
  styleUrls: ['./schedule-tag-export-detail.component.scss']
})
export class ScheduleTagExportDetailComponent extends BaseComponent implements OnInit {

  params: any;//路由參數

  //預設資料來源
  detail: ScheduleTagSetting = ScheduleTagSettingMock[0];//Call API

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private dialogService: DialogService,
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
          return `<p class="text_center">` + cell + `</p>`;
        },
        sort: false
      },
      batchTime: {
        title: '批次時間',
        type: 'string',
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
          return `<p class="text_center ${ColumnClass[cellLow]}">${lableName}${StatusResult[cellLow]}</p>`;
        },
        sort: false,
      },
      batchResultCount: {
        title: '貼標比數',
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
          instance.settings = { btnStatus: 'success', btnIcon: 'cloud-download-outline' }
          instance.getRow.subscribe((res: Schedule_Batch_History) => {
            instance.isShow = res.batchResult.toLowerCase() === 'success';
          });
          instance.emitter.subscribe((res: Schedule_Batch_History) => {
            // TODO: download API
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
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.detail.scheduleBatchHistory);
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-tag-detail']);
  }

}
