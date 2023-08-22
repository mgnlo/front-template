import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsoleGroup } from '@api/models/console-group.model';
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

@Component({
  selector: 'console-user',
  templateUrl: './console-user.component.html',
  styleUrls: ['./console-user.component.scss'],
})
export class ConsoleUserComponent extends BaseComponent implements OnInit {
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
        type: 'html',
        class: 'col-1 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      name: {
        title: '姓名',
        type: 'string',
        class: 'col-2',
        valuePrepareFunction: (cell: boolean) => cell,
        sort: false,
      },
      email: {
        title: '電子郵件',
        type: 'string',
        class: 'col-4',
        valuePrepareFunction: (cell: boolean) => cell,
        sort: false,
      },
      businessUnit: {
        title: '所屬單位',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${BusinessUnit[cell]}</p>`;
        },
        sort: false,
      },
      consoleGroup: {
        title: '權限',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: any) => {
          return `<p class="left">${cell.groupName}</p>`;
        },
        sort: false,
      },
      action: {
        title: '變更',
        class: 'col-1',
        type: 'custom',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.settings = { btnStatus: 'primary', btnIcon: 'edit-outline' }
          instance.emitter.subscribe((row) => {
            const dialogRef = this.dialogService.open(ChangeDialogComponent, {
              consoleUser: JSON.stringify(row),
              consoleGroupList: JSON.stringify(this.consoleGroupList),
            });
            dialogRef.onClose.subscribe(res => {
              if (res) {
                // TODO: 這邊收到異動成功的時候，是否重新電文？
              }
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
    private loadingService: LoadingService,
    private accountManageService: AccountManageService,
    private dialogService: DialogService,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);

    this.validateForm = new FormGroup({
      account: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null, { validators: ValidatorsUtil.email, updateOn: 'blur' }),
      businessUnit: new FormGroup({}),
      groupId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.queryAllConsoleGroup();
    this.search();
    let fg = this.validateForm.get('businessUnit') as FormGroup;
    this.businessUnit.forEach(unit => { fg.setControl(unit.key, new FormControl(false)) })
  }

  search(key?: string) {
    const getSessionVal = this.storageService.getSessionVal(this.sessionKey);

    this.isSearch = false;

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;

    let page = this.paginator.nowPage;

    if (key !== 'search' && !!getSessionVal?.page) {
      page = getSessionVal.page;
    }

    if (key !== 'reset') this.setSessionData();

    let req = this.validateForm.getRawValue();
    if (!!req['businessUnit']) {
      req['businessUnit'] = Object.keys(req['businessUnit']).filter((unit) => req['businessUnit'][unit] === true).map((unit) => unit);
    }

    let searchInfo: SearchInfo = {
      apiUrl: this.accountManageService.consoleUserFunc,
      nowPage: page,
      filters: req,
      errMsg: '使用者管理查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  setSessionData() {
    const filterVal = this.isSearch ? this.validateForm.getRawValue() :
      this.storageService.getSessionVal(this.sessionKey)?.filter ?? this.validateForm.getRawValue();
    this.setSessionVal({ page: this.paginator.nowPage, filter: filterVal });
  }

  queryAllConsoleGroup() {
    this.accountManageService.getConsoleGroupList().pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        this.consoleGroupList = res.result;
        this.loadingService.close();
      })).subscribe();
  }

  reset() {
    this.validateForm.reset({ account: null, name: null, email: null, businessUnit: new FormGroup({}), groupId: '' });
    let fg = this.validateForm.get('businessUnit') as FormGroup;
    this.businessUnit.forEach(unit => { fg.setControl(unit.key, new FormControl(false)) });
    this.isSearch = true;
    this.setSessionData();
    this.search('reset');
  }
}
