import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { ConsoleUser } from '@api/models/console-user.model';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { StorageService } from '@api/services/storage.service';
import { GroupScope } from '@common/enums/console-group-enum';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'console-group-detail',
  templateUrl: './console-group-detail.component.html',
  styleUrls: ['./console-group-detail.component.scss'],
})
export class ConsoleGroupDetailComponent extends BaseComponent implements OnInit {
  consoleGroupDetail: ConsoleGroup;
  consoleGroupScope: Array<GridInnerCheckBox> = this.accountManageService.createDefaultScopeGridInnerCheckBoxs();

  dataSource2: LocalDataSource;
  gridDefine2 = {
    pager: {
      display: true,
      perPage: 12,
    },
    columns: {
      featureName: {
        title: '功能單元',
        type: 'html',
        class: 'col-1 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${GroupScope[cell]}</p>`;
        },
        sort: false,
      },
      read: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => row.read,
        renderComponent: ConsoleGroupDetailCheckboxComponent,
        sort: false,
      },
      create: {
        title: '新增',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => row.create,
        renderComponent: ConsoleGroupDetailCheckboxComponent,
        sort: false,
      },
      update: {
        title: '編輯',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => row.update,
        renderComponent: ConsoleGroupDetailCheckboxComponent,
        sort: false,
      },
      delete: {
        title: '刪除',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => row.delete,
        renderComponent: ConsoleGroupDetailCheckboxComponent,
        sort: false,
      }
    },
    hideSubHeader: false,
    actions: {
      add: false,
      edit: false,
      delete: false,
    }
  };

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      account: {
        title: '帳號',
        type: 'html',
        class: 'col-2 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      name: {
        title: '姓名',
        type: 'string',
        class: 'col-2',
        valuePrepareFunction: (cell, row: any) => cell,
        sort: false,
      },
      email: {
        title: '電子郵件',
        type: 'string',
        class: 'col-6',
        valuePrepareFunction: (cell, row: any) => cell,
        sort: false,
      },
      businessUnit: {
        title: '所屬單位',
        type: 'html',
        class: 'col-2',
        // valuePrepareFunction: (cell, row: any) => cell,
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${BusinessUnit[cell]}</p>`;
        },
        sort: false,
      }
    },
    hideSubHeader: false,
    actions: {
      position: 'right',
      columnTitle: "移除",
      add: false,
      edit: false,
      delete: false,
    }
  };

  hasConsoleGroupCreate: boolean;
  hasConsoleGroupUpdate: boolean;

  constructor(
    storageService: StorageService,
    private router: Router,
    private loginService: LoginService,
    private accountManageService: AccountManageService,
    private activatedRoute: ActivatedRoute,
    private dateService: NbDateService<Date>) {
    super(storageService);
    this.dataSource = new LocalDataSource();
    this.dataSource2 = new LocalDataSource();
    this.hasConsoleGroupCreate = this.loginService.checkUserScope("console-group.create");
    this.hasConsoleGroupUpdate = this.loginService.checkUserScope("console-group.update");
  }

  ngOnInit(): void {
    let cache = this.accountManageService.getConsoleGroupDetailCache();

    if (this.activatedRoute.snapshot.queryParamMap.get("restore") && cache) {
      // 返回頁面，需要 restore 資料與狀態
      this.consoleGroupDetail = cache.consoleGroupDetail;

      for (let scopeObj of this.consoleGroupScope) {
        let keyList = Object.keys(scopeObj);

        for (let idx = 1; idx < keyList.length; idx++) {
          scopeObj[keyList[idx]] =
            (this.consoleGroupDetail.consoleGroupScope.filter(item => item.scope == `${scopeObj[keyList[0]]}.${keyList[idx]}`).length > 0 ? true : false);
        }
      }

      this.dataSource.load(this.consoleGroupDetail.consoleUser);
      this.dataSource2.load(this.consoleGroupScope);
      requestAnimationFrame(() => {
        this.dataSource.setPage(cache.page);
        requestAnimationFrame(() => {
          document.querySelector("nb-layout-column").scrollTo(0, cache.scrollPosition);
        });
      });
    } else {
      this.consoleGroupDetail = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get("consoleGroupDetail"));

      if (!this.consoleGroupDetail) {
        //防止瀏覽器 F5，重新導回 list
        this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH).then((res) => {
          if (res) {
            window.history.replaceState({}, '', this.router.url.split("?")[0]);
          };
        });
      }

      for (let scopeObj of this.consoleGroupScope) {
        let keyList = Object.keys(scopeObj);

        for (let idx = 1; idx < keyList.length; idx++) {
          scopeObj[keyList[idx]] =
            (this.consoleGroupDetail.consoleGroupScope.filter(item => item.scope == `${scopeObj[keyList[0]]}.${keyList[idx]}`).length > 0 ? true : false);
        }
      }

      // 這邊要發查電文取得 ConsoleGroupList 內容
      this.dataSource.load(this.consoleGroupDetail.consoleUser);
      this.dataSource2.load(this.consoleGroupScope);
      document.querySelector("nb-layout-column").scrollTo(0, 0);
    }
  }

  edit() {
    let passData: NavigationExtras = {};

    passData.queryParams = {
      consoleGroupDetail: JSON.stringify(this.consoleGroupDetail)
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_EDIT_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
        this.accountManageService.setConsoleGroupDetailCache({
          scrollPosition: document.querySelector("nb-layout-column").scrollTop,
          page: this.dataSource.getPaging().page,
          consoleGroupDetail: this.consoleGroupDetail
        });
      };
    });
  }

  copy() {
    let passData: NavigationExtras = {};

    passData.queryParams = {
      mode: 'copy',
      consoleGroupScope: JSON.stringify(this.consoleGroupScope)
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_ADD_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
      };
    });
  }
}

@Component({
  selector: 'console-group-detail-checkbox',
  template: '<nb-checkbox *ngIf="bool != undefined" [checked]="bool" disabled status="basic"></nb-checkbox>'
})
export class ConsoleGroupDetailCheckboxComponent implements OnInit {
  @Input() value: boolean;
  bool: boolean;

  constructor() { }

  ngOnInit(): void {
    this.bool = this.value;
  }
}
