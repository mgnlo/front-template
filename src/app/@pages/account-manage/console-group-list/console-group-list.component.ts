import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConfigService } from '@api/services/config.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { AccountManageService } from '../account.manage.service';

@Component({
  selector: 'console-group-list',
  templateUrl: './console-group-list.component.html',
  styleUrls: ['./console-group-list.component.scss'],
})
export class ConsoleGroupListComponent extends BaseComponent implements OnInit {

  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private accountManageService: AccountManageService,
    private tableService: Ng2SmartTableService
  ) {
    super(storageService, configService, loginService);
  }

  ngOnInit(): void {
    // 這邊要發查電文 6.1 取得 ConsoleGroupList 內容
    this.loadingService.open();
    
    if (this.isMock) {
      this.dataSource.reset();
      this.dataSource.load(ConsoleGroupListMock);
      this.loadingService.close();
      return;
    }

    const page = this.storageService.getSessionVal(this.sessionKey)?.page;

    let searchInfo: SearchInfo = {
      apiUrl: this.accountManageService.consoleGroupFunc,
      nowPage: page ? page : this.paginator.nowPage,
      errMsg: '權限管理列表查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  consoleGroupList: Array<ConsoleGroup>;
  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      groupName: {
        title: '權限名稱',
        type: 'string',
        sort: false,
      },
      enable: {
        title: '狀態',
        type: 'html',
        class: 'text_center',
        sort: false,
        valuePrepareFunction: (cell: boolean) => {
          const text: string = cell ? "啟用" : "停用";
          return `<p class="text_center">` + text + `</p>`;
        }
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          if (!cell) { return '' }
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="text_center">` + datepipe.transform(cell, this.dateFormat) + `</p>`;
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'center',
        width: '3rem',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.emitter.subscribe((res: ConsoleGroup) => {
            this.router.navigate(['pages', 'account-manage', 'console-group-detail', res.groupId]);
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
    }
  };

  add() {
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_SET_PATH);
  }

  ngOnDestroy() {
    let sessionData = { page: this.paginator.nowPage };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

}
