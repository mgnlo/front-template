import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { StorageService } from '@api/services/storage.service';
import { GroupScope } from '@common/enums/console-group-enum';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { CommonUtil } from '@common/utils/common-util';
import { CheckboxColumnComponent } from '@component/table/checkbox-column.ts/checkbox.component';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, tap } from 'rxjs/operators';
import { AccountManageService } from '../account.manage.service';

@Component({
  selector: 'console-group-set',
  templateUrl: './console-group-set.component.html',
  styleUrls: ['./console-group-set.component.scss'],
})
export class ConsoleGroupSetComponent extends BaseComponent implements OnInit {
  consoleGroupDetail: ConsoleGroup = new ConsoleGroup();
  // consoleUser: any;
  consoleGroupScope: Array<GridInnerCheckBox> = this.accountManageService.createDefaultScopeGridInnerCheckBoxs();
  changeRouteName: string;
  actionName: string;// 新增/編輯/複製
  groupId: string;

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    private router: Router,
    private accountManageService: AccountManageService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private dialogService: DialogService,) {
    super(storageService, configService);

    this.validateForm = new FormGroup({
      groupName: new FormControl(null, Validators.required),
      enable: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.changeRouteName = this.activatedRoute.snapshot.params?.changeRoute;
    this.actionName = CommonUtil.getActionName(this.changeRouteName);
    this.groupId = this.activatedRoute.snapshot.params.groupId;
    this.dataSource = new LocalDataSource();
    this.dataSource2 = new LocalDataSource(this.consoleGroupScope);
    if (this.changeRouteName === undefined) { return; }
    this.loadingService.open();
    this.accountManageService.getConsoleGroup(this.groupId).pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        if (!!res.result.consoleGroupScope) {
          this.consoleGroupDetail = JSON.parse(JSON.stringify(res.result));
          this.validateForm.get('groupName').setValue(this.consoleGroupDetail.groupName);
          this.validateForm.get('enable').setValue(this.consoleGroupDetail.enable.toString());
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
        this.loadingService.close();
      })).subscribe();
  }

  dataSource2: LocalDataSource;
  enableOption: any;
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
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'read' }, isCheckedParam: { key: 'read' } };
        },
        sort: false,
      },
      create: {
        title: '新增',
        type: 'custom',
        class: 'col-1',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'create' }, isCheckedParam: { key: 'create' } };
        },
        sort: false,
      },
      update: {
        title: '編輯',
        type: 'custom',
        class: 'col-1',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'update' }, isCheckedParam: { key: 'update' } };
        },
        sort: false,
      },
      delete: {
        title: '刪除',
        type: 'custom',
        class: 'col-1',
        renderComponent: CheckboxColumnComponent,
        onComponentInitFunction: (instance: CheckboxColumnComponent) => {
          instance.settings = { isShowParam: { key: 'delete' }, isCheckedParam: { key: 'delete' } };
        },
        sort: false,
      }
    },
    hideSubHeader: true,
    actions: false,
  };

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    hideSubHeader: true,
    actions: false,
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
        sort: false,
      },
      email: {
        title: '電子郵件',
        type: 'html',
        class: 'col-6 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      businessUnit: {
        title: '所屬單位',
        type: 'string',
        class: 'col-2',
        valuePrepareFunction: (cell: string) => {
          return `${BusinessUnit[cell]}`;
        },
        sort: false,
      },
      delete: {
        title: '移除',
        class: 'col-1',
        type: 'custom',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = { btnStatus: 'danger', btnIcon: 'trash-2-outline' }
          instance.emitter.subscribe((row) => {
            this.onDeleteConfirm(row); // 訂閱自訂刪除按鈕組件的 delete 事件，觸發 onDeleteConfirm 方法
          })
        },
        sort: false,
      },
    }
  };

  onDeleteConfirm(row: any): void {
    this.dataSource.remove(row);
  }

  cancel() {
    this.changeRouteName !== 'edit' ? this.router.navigate(['pages', 'account-manage', 'console-group-list'])
      : this.router.navigate(['pages', 'account-manage', 'console-group-detail', this.consoleGroupDetail.groupId]);
  }

  send() {
    if (this.validateForm.valid) {
      this.consoleGroupDetail.consoleGroupScope = [];
      let req = this.validateForm.getRawValue();
      this.consoleGroupDetail.groupName = req.groupName;
      this.consoleGroupDetail.enable = req.enable === 'true' ? true : false;

      for (let scopeObj of this.dataSource2['data']) {
        let keyList = Object.keys(scopeObj);

        for (let idx = 1; idx < keyList.length; idx++) {
          if (scopeObj[keyList[idx]]) {
            this.consoleGroupDetail.consoleGroupScope.push({
              groupId: this.consoleGroupDetail.groupId,
              scope: `${scopeObj[keyList[0]]}.${keyList[idx]}`
            });
          }
        }
      }

      this.consoleGroupDetail.consoleUser = this.dataSource["data"];

      this.loadingService.open();
      let api = this.changeRouteName !== 'edit' ?
        this.accountManageService.createConsoleGroup(this.consoleGroupDetail) :
        this.accountManageService.updateConsoleGroup(this.groupId, this.consoleGroupDetail);

      api.pipe(
        catchError((err) => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(false, `${err.message}，將為您導回權限管理列表`, this.accountManageService.CONSOLE_GROUP_LIST_PATH);
          throw new Error(err.message);
        }),
        filter(res => res.code === RestStatus.SUCCESS),
        tap(res => {
          this.loadingService.close();
          this.dialogService.alertAndBackToList(true, `${this.actionName}成功`, ['pages', 'account-manage', 'console-group-detail', res.result.groupId]);
        })).subscribe();
    }

  }
}
