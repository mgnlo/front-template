import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { GroupScope } from '@common/enums/console-group-enum';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { RestStatus, WarningCode } from '@common/enums/rest-enum';
import { ConsoleGroupDetailMock } from '@common/mock-data/console-group-detail-mock';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, tap } from 'rxjs/operators';
import { AccountManageService } from '../account.manage.service';

@Component({
  selector: 'console-group-detail',
  templateUrl: './console-group-detail.component.html',
  styleUrls: ['./console-group-detail.component.scss'],
})
export class ConsoleGroupDetailComponent extends BaseComponent implements OnInit {
  consoleGroupDetail: ConsoleGroup;
  consoleGroupScope: Array<GridInnerCheckBox> = this.accountManageService.createDefaultScopeGridInnerCheckBoxs();
  groupId: string;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

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
        valuePrepareFunction: (cell: string) => {
          return `<p>${GroupScope[cell]}</p>`;
        },
        sort: false,
      },
      read: {
        title: '查看',
        type: 'custom',
        class: 'center',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'read' }, isCheckedParam: { key: 'read' }, disable: true };
        },
        sort: false,
      },
      create: {
        title: '新增',
        type: 'custom',
        class: 'center',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'create' }, isCheckedParam: { key: 'create' }, disable: true };
        },
        sort: false,
      },
      update: {
        title: '編輯',
        type: 'custom',
        class: 'center',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'update' }, isCheckedParam: { key: 'update' }, disable: true };
        },
        sort: false,
      },
      delete: {
        title: '刪除',
        type: 'custom',
        class: 'center',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'delete' }, isCheckedParam: { key: 'delete' }, disable: true };
        },
        sort: false,
      }
    },
    hideSubHeader: true,
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
        type: 'string',
        sort: false,
      },
      name: {
        title: '姓名',
        type: 'string',
        sort: false,
      },
      email: {
        title: '電子郵件',
        type: 'string',
        sort: false,
      },
      businessUnit: {
        title: '所屬單位',
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (cell: string) => {
          return `<p class="text_center">${BusinessUnit[cell]}</p>`;
        },
        sort: false,
      }
    },
    hideSubHeader: true,
    actions: {
      position: 'right',
      columnTitle: "移除",
      add: false,
      edit: false,
      delete: false,
    }
  };

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private router: Router,
    private accountManageService: AccountManageService,
    private loadingService: LoadingService,
    private tableService: Ng2SmartTableService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute) {
    super(storageService, configService, loginService);
    this.dataSource = new LocalDataSource();
    this.dataSource2 = new LocalDataSource();
  }

  ngOnInit(): void {
    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);
    this.groupId = !!this.activatedRoute.snapshot.params.groupId ? this.activatedRoute.snapshot.params.groupId : getSessionVal.groupId;
    this.loadingService.open();
    if (this.isMock) {
      this.consoleGroupDetail = ConsoleGroupDetailMock;
      let scopeInfo = this.consoleGroupDetail.consoleGroupScope.map((groupScope) => {
        let scope = groupScope.scope.split(".");
        return { featureName: scope[0], [scope[1]]: true };
      });
      let scopeData = CommonUtil.groupBy(scopeInfo, 'featureName', false);
      let scopeTableData = CommonUtil.flatGroupItem(scopeData, 'featureName');
      this.accountManageService.updateCheckbox(this.consoleGroupScope, scopeTableData);
      this.dataSource2.load(this.consoleGroupScope);
      this.dataSource.load(this.consoleGroupDetail.consoleUser);
      this.loadingService.close();
      return;
    }
    this.accountManageService.getConsoleGroup(this.groupId).pipe(
      catchError((err) => {
        this.loadingService.close();
        let status = Object.values(WarningCode).includes(err.code) ? null : false;
        this.dialogService.alertAndBackToList(status, `${err.message}，將為您導回權限管理列表`, this.accountManageService.CONSOLE_GROUP_LIST_PATH);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        this.loadingService.close();
      })).subscribe(res => {
        if (!!res.result.consoleGroupScope) {
          this.consoleGroupDetail = JSON.parse(JSON.stringify(res.result));
          let scopeInfo = res.result.consoleGroupScope.map((groupScope) => {
            let scope = groupScope.scope.split(".");
            return { featureName: scope[0], [scope[1]]: true };
          });
          let scopeData = CommonUtil.groupBy(scopeInfo, 'featureName', false);
          let scopeTableData = CommonUtil.flatGroupItem(scopeData, 'featureName');
          this.accountManageService.updateCheckbox(this.consoleGroupScope, scopeTableData);
          this.dataSource2.load(this.consoleGroupScope);
          this.dataSource.load(this.consoleGroupDetail.consoleUser);
        }
      });
  }

  edit() {
    this.router.navigate(['pages', 'account-manage', 'console-group-set', 'edit', this.groupId]);
  }

  copy() {
    this.router.navigate(['pages', 'account-manage', 'console-group-set', 'copy', this.groupId]);
  }

  ngOnDestroy() {
    let sessionData = { page: this.paginator.nowPage, groupId: this.groupId };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  cancel() {
    this.router.navigate(['pages', 'account-manage', 'console-group-list']);
  }

}
