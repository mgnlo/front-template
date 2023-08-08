import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { ConsoleGroupDetailMock } from '@common/mock-data/console-group-detail-mock';
import { StorageService } from '@api/services/storage.service';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';

@Component({
  selector: 'console-group-list',
  templateUrl: './console-group-list.component.html',
  styleUrls: ['./console-group-list.component.scss'],
})
export class ConsoleGroupListComponent extends BaseComponent implements OnInit {
  constructor(
    storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private accountManageService: AccountManageService,
    private dateService: NbDateService<Date>) {
    super(storageService);
  }

  // 這邊要發查電文 6.1 取得 ConsoleGroupList 內容
  consoleGroupList: Array<ConsoleGroup>;

  ngOnInit(): void {
    let cache = this.accountManageService.getConsoleGroupListCache();

    this.dataSource = new LocalDataSource();

    if (this.activatedRoute.snapshot.queryParamMap.get("restore") && cache) {
      this.consoleGroupList = cache.consoleGroupList;
      this.dataSource.load(this.consoleGroupList);
      requestAnimationFrame(() => {
        this.dataSource.setPage(cache.page)
        requestAnimationFrame(() => {
          document.querySelector("nb-layout-column").scrollTo(0, cache.scrollPosition);
        });        
      });
    } else {
      // 這邊要發查電文取得 ConsoleGroupList 內容
      this.accountManageService.getConsoleGroupList().pipe(
          catchError((err) => {
            this.loadingService.close();
            throw new Error(err.message);
          }),
          tap(res => {
            console.info(res)
            this.loadingService.close();
          })).subscribe(res => {
            if (res.code === RestStatus.SUCCESS) {
            }
          });
      this.consoleGroupList = ConsoleGroupListMock;

      this.dataSource.load(this.consoleGroupList);
      document.querySelector("nb-layout-column").scrollTo(0, 0);
    }
  }

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
        valuePrepareFunction: (cell, row: ConsoleGroup) => [row, this.consoleGroupList, this.dataSource],
        renderComponent: ConsoleGroupButtonComponent,
        sort: false,
      },
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    }
  };

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
          page: this.dataSource.getPaging().page,
          consoleGroupList: this.consoleGroupList
        });
      };
    });
  }
}

@Component({
  selector: 'ngx-console-group-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="seeDetail()"><nb-icon icon="search"></nb-icon></button>'
})
export class ConsoleGroupButtonComponent implements OnInit {
  constructor(
    private router: Router, 
    private accountManageService: AccountManageService,
    private loadingService: LoadingService) { }

  @Input() value: Array<any>;

  ngOnInit() {
    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  seeDetail() {
    let passData: NavigationExtras = {};

    // 這邊要發查
    // 電文 7.2 取得 ConsoleUserList 內容
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
          }
        });
    let consoleGroupDetail = ConsoleGroupDetailMock;

    passData.queryParams = {
      consoleGroupDetail: JSON.stringify(consoleGroupDetail)
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
