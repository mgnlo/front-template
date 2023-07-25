import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleGroupListMock } from '@common/mock-data/console-group-list-mock';
import { ConsoleUserListMock } from '@common/mock-data/console-user-list-mock';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BusinessUnit } from '@common/enums/console-user-enum';
import { ConsoleUser } from '@api/models/console-user.model';
import { ChangeDialogComponent } from './change-dialog/change.dialog.component';
import { DialogService } from '@api/services/dialog.service';
import { ValidateUtil } from '@common/utils/validate-util';

@Component({
  selector: 'console-user',
  templateUrl: './console-user.component.html',
  styleUrls: ['./console-user.component.scss'],
})
export class ConsoleUserComponent extends BaseComponent implements OnInit {
  account: string = "";
  name: string = "";
  email: string = "";
  groupId: string = "";

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

    this.consoleUserForm = new FormGroup({
      account: new FormControl('', [this.maxLengthValidate(20)]),
      name: new FormControl('', [this.maxLengthValidate(20)]),
      email: new FormControl('', {
        validators: [this.maxLengthValidate(50), this.emailFormatValidate],
        updateOn: 'blur'
      }),
    });
  }

  maxLengthValidate(length: number): ValidatorFn {
    return (ctl: AbstractControl): ValidationErrors | null => {
      const value = ctl.value;

      if (value && value.leangth > length) {
        return { errMsg: `欄位最長為${length}個字元` };
      } else {
        return null;
      }
    }
  }

  emailFormatValidate(ctl: AbstractControl) {
    const val = ctl.value;

    if (val && !ValidateUtil.checkEmail(val)) {
      ctl['_updateOn'] = "change";
      return { errMsg: "電子郵件輸入錯誤" };
    } else {
      ctl['_updateOn'] = "blur";
    }

    return null;
  }

  isError(formCtrlName: string) {
    let viewCtrl: AbstractControl = this.consoleUserForm.get(formCtrlName);

    return (viewCtrl.touched || viewCtrl.dirty) && viewCtrl.errors?.errMsg;
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
    if (!this.consoleUserForm.invalid) {
      // 這邊要發送 5.1 or 5.2 電文去查詢

    } else {
      for (const control of Object.keys(this.consoleUserForm.controls)) {
        this.consoleUserForm.controls[control].markAsTouched();
      }
    }
  }

  reset() {
    this.digitalSelect = false;
    this.personalSelect = false;
    this.moneySelect = false;
    this.creditlSelect = false;
    this.groupId = "";

    this.consoleUserForm.reset({
      account: "",
      name: "",
      email: ""
    });
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
      if (res) {
        // 這邊收到異動成功的時候，是否重新電文？
      }
    });
  }
}
