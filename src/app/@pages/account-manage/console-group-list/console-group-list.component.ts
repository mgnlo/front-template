import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { ConsoleGroupDetailMock } from '@common/mock-data/console-group-detail-mock';
import { StorageService } from '@api/services/storage.service';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';

@Component({
  selector: 'console-group-list',
  templateUrl: './console-group-list.component.html',
  styleUrls: ['./console-group-list.component.scss'],
})
export class ConsoleGroupListComponent extends BaseComponent implements OnInit {
  consoleGroupList: Array<ConsoleGroup>;
  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      groupName: {
        title: '權限名稱',
        type: 'html',
        class: 'col-1 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      enable: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        sort: false,
        valuePrepareFunction: (cell: boolean) => {
          return cell ? "啟用" : "停用";
        },
      },
      modificationTime: {
        title: '異動時間',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: ConsoleGroup) => [row, this.consoleGroupList, this.isMock ? this.dataSource : this.restDataSource],
        renderComponent: ConsoleGroupButtonComponent,
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

  hasConsoleGroupCreate: boolean;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private accountManageService: AccountManageService,
    private tableService: Ng2SmartTableService
  ) {
    super(storageService, configService);
    this.hasConsoleGroupCreate = this.loginService.checkUserScope("console-group.create");
  }

  ngOnInit(): void {
    let cache = this.accountManageService.getConsoleGroupListCache();

    if (this.activatedRoute.snapshot.queryParamMap.get("restore") && cache) {
      // 返回頁面，需要 restore 資料與狀態
      this.consoleGroupList = cache.consoleGroupList;
      this.dataSource.load(this.consoleGroupList);
      requestAnimationFrame(() => {
        this.dataSource.setPage(cache.page)
        requestAnimationFrame(() => {
          document.querySelector("nb-layout-column").scrollTo(0, cache.scrollPosition);
        });
      });
    } else {
      // 這邊要發查電文 6.1 取得 ConsoleGroupList 內容
      this.loadingService.open();
      this.search();
      document.querySelector("nb-layout-column").scrollTo(0, 0);
    }
  }

  add() {
    let passData: NavigationExtras = {};

    passData.queryParams = {
      mode: 'add'
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_ADD_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
        this.accountManageService.setConsoleGroupListCache({
          scrollPosition: document.querySelector("nb-layout-column").scrollTop,
          page: !!this.dataSource ? this.dataSource.getPaging().page : this.restDataSource.getPaging().page,
          consoleGroupList: this.consoleGroupList
        });
      };
    });
  }

  search(key?: string) {

    if (this.isMock) {
      this.dataSource.reset();
      this.dataSource.load(ConsoleGroupListMock);
      return;
    }

    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);
    if (['search', 'reset'].includes(key)) { this.paginator.nowPage = 1; }
    let page = this.paginator.nowPage;
    if (key !== 'search' && !!getSessionVal?.filter) { page = getSessionVal.page; }
    if (key !== 'reset') { this.setSessionVal({ page: this.paginator.nowPage }); }

    let searchInfo: SearchInfo = {
      apiUrl: this.accountManageService.consoleGroupFunc,
      nowPage: page,
      errMsg: '權限管理列表查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }
}

// Table 內對應的 see detail Button Component
@Component({
  selector: 'ngx-console-group-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="seeDetail()"><nb-icon icon="search"></nb-icon></button>'
})
export class ConsoleGroupButtonComponent implements OnInit {
  @Input() value: Array<any>;

  constructor(
    private router: Router,
    public loginService: LoginService,
    private accountManageService: AccountManageService,
    private loadingService: LoadingService) {

  }

  ngOnInit() {
    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  seeDetail() {
    // 這邊要發查電文 7.2 取得 ConsoleGroup with ConsoleGroupScope with ConsoleUser 內容
    this.loadingService.open();
    this.accountManageService.getConsoleGroup(this.value[0].groupId).pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res)
        this.loadingService.close();
      })).subscribe(res => {
        if (res.code === RestStatus.SUCCESS) {
          this.navigateToDetailPage(res.result);
        }
      });
  }

  navigateToDetailPage(resData: ConsoleGroup) {
    let passData: NavigationExtras = {};

    passData.queryParams = {
      consoleGroupDetail: JSON.stringify(resData)
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_DETAIL_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
        this.accountManageService.setConsoleGroupListCache({
          scrollPosition: document.querySelector("nb-layout-column").scrollTop,
          page: this.value[2].getPaging().page,
          consoleGroupList: this.value[1]
        });
      };
    });
  }
}
