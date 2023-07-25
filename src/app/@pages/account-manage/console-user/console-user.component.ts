import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { ConsoleGroupScopeListMock } from '@common/mock-data/console-group-scope-list-mock';
import { ConsoleUserListMock } from '@common/mock-data/console-user-list-mock';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { ConsoleUser } from '@api/models/console-user.model';
import { ChangeDialogComponent } from './change-dialog/change.dialog.component';
import { DialogService } from '@api/services/dialog.service';

@Component({
  selector: 'console-user',
  templateUrl: './console-user.component.html',
  styleUrls: ['./console-user.component.scss'],
})
export class ConsoleUserComponent extends BaseComponent implements OnInit {
  account: string;
  name: string;
  email: string;
  groupId: string;

  consoleGroupList: Array<ConsoleGroup>;
  consoleUserList: Array<ConsoleUser>;
  mockData: any;

  consoleUserForm: FormGroup;
  digitalSelect: boolean;
  personalSelect: boolean;
  moneySelect: boolean;
  creditlSelect: boolean;
  businessUnit = BusinessUnit;

  dataSource: LocalDataSource; //table

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private accountManageService: AccountManageService,
    private dateService: NbDateService<Date>) {
    super();
    this.consoleUserForm = formBuilder.group({
      account: [null, null],
      name: [null, null],
      email: [null, null]
    });

  }

  ngOnInit(): void {
    this.consoleGroupList = ConsoleGroupListMock;
    this.consoleUserList = ConsoleUserListMock;
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.consoleUserList);
  }

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
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: ConsoleUser) => [{
          row: row,
          consoleGroupList: this.consoleGroupList
        }],
        renderComponent: ConsoleUserButtonComponent,
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

  search() {

  }

  reset() {
    this.account = "";
    this.name = "";
    this.email = "";
    this.digitalSelect = false;
    this.personalSelect = false;
    this.moneySelect = false;
    this.creditlSelect = false;
    this.groupId = "";
  }
}

@Component({
  selector: 'ngx-console-user-button',
  template: '<button nbButton status="info" size="tiny" class="iconBtn" (click)="change()"><nb-icon icon="edit-outline"></nb-icon></button>'
})
export class ConsoleUserButtonComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  @Input() value: Array<any>;

  ngOnInit() {
    // document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  change() {
    const dialogRef = this.dialogService.open(ChangeDialogComponent, {
      consoleUser: JSON.stringify(this.value[0].row),
      consoleGroupList: JSON.stringify(this.value[0].consoleGroupList),
    });

    dialogRef.onClose.subscribe(res => {
      if(res){
        // 這邊收到異動成功的時候，是否重新電文？
      }
    });
  }
}
