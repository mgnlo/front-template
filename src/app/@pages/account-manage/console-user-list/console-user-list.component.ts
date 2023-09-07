import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { RestStatus } from '@common/enums/rest-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import { catchError, filter, tap } from 'rxjs/operators';
import { AccountManageService } from '../account.manage.service';
import { ChangeDialogComponent } from './change-dialog/change.dialog.component';
import { LoginService } from '@api/services/login.service';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { ConsoleUserListMock } from '@common/mock-data/console-user-list-mock';

@Component({
  selector: 'console-user-list',
  templateUrl: './console-user-list.component.html',
  styleUrls: ['./console-user-list.component.scss'],
})
export class ConsoleUserListComponent extends BaseComponent implements OnInit {
  consoleGroupList: Array<ConsoleGroup>;
  businessUnit: Array<{ key: string; val: string }> = Object.entries(BusinessUnit).map(([k, v]) => ({ key: k, val: v }));
  isSearch: boolean = false;
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
        type: 'html',
        class: 'text_center',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + (value ?? "") + `</p>`;
        },
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
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + BusinessUnit[value] + `</p>`;
        },
        sort: false,
      },
      consoleGroup: {
        title: '權限',
        type: 'string',
        valuePrepareFunction: (cell: any) => cell?.groupName,
        sort: false,
      },
      action: {
        title: '變更',
        type: 'custom',
        class: 'center',
        width: '3rem',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = { btnStatus: 'primary', btnIcon: 'edit-outline' }
          instance.emitter.subscribe((row) => {
            const dialogRef = this.dialogService.open(ChangeDialogComponent, {
              consoleUser: row,
              consoleGroupList: this.consoleGroupList,
            });
            dialogRef.onClose.subscribe(res => {
              if (res) { this.search() }
            });
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

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private loadingService: LoadingService,
    private accountManageService: AccountManageService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      account: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null, { validators: ValidatorsUtil.email, updateOn: 'blur' }),
      businessUnit: new FormGroup({}),
      groupId: new FormControl(''),
    });

    if (!this.isCrud['update']) { delete this.gridDefine.columns.action; }
  }

  ngOnInit(): void {
    this.queryAllConsoleGroup();
    this.search();
    let fg = this.validateForm.get('businessUnit') as FormGroup;
    this.businessUnit.forEach(unit => { fg.setControl(unit.key, new FormControl(false)) })
  }

  search(key?: string) {

    if (this.isMock) {
      this.dataSource.reset();
      let filter = this.validateForm.getRawValue();
      for (const [k, v] of Object.entries(filter).filter(([key, val]) => !!val)) {
        if (k === 'businessUnit') {
          Object.entries(v).filter(([key, val]) => val === true).map(([key, val]) => key).forEach(unit => {
            this.dataSource.addFilter({ field: k, filter: undefined, search: unit });
          })
        } else {
          this.dataSource.addFilter({ field: k, filter: undefined, search: v });
        }
      }
      this.dataSource.load(ConsoleUserListMock);
      return;
    }

    this.isSearch = false;

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;

    let page = this.paginator.nowPage;

    let req = this.validateForm.getRawValue();
    if (!!req['businessUnit']) {
      req['businessUnit'] = Object.keys(req['businessUnit']).filter((unit) => req['businessUnit'][unit] === true).map((unit) => unit).toString();
    }

    let searchInfo: SearchInfo = {
      apiUrl: this.accountManageService.consoleUserFunc,
      nowPage: page,
      filters: req,
      errMsg: '使用者管理查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  queryAllConsoleGroup() {
    this.loadingService.open();

    if (this.isMock) {
      this.dataSource.load(ConsoleGroupListMock);
      this.consoleGroupList = ConsoleGroupListMock;
      this.loadingService.close();
      return;
    }

    // 有分頁但下拉選單需要一次取全部
    this.accountManageService.getConsoleGroupList(100).pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        this.consoleGroupList = res.result['content'];
        this.loadingService.close();
      })).subscribe();
  }

  reset() {
    this.validateForm.reset({ account: null, name: null, email: null, businessUnit: new FormGroup({}), groupId: '' });
    let fg = this.validateForm.get('businessUnit') as FormGroup;
    this.businessUnit.forEach(unit => { fg.setControl(unit.key, new FormControl(false)) });
    this.isSearch = true;
    this.search('reset');
  }
}
