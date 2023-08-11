import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, LoadChildren, NavigationExtras, Router } from '@angular/router';
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
import { ConsoleUser, ConsoleUserReq } from '@api/models/console-user.model';
import { ChangeDialogComponent } from './change-dialog/change.dialog.component';
import { DialogService } from '@api/services/dialog.service';
import { ValidateUtil } from '@common/utils/validate-util';
import { StorageService } from '@api/services/storage.service';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@api/services/loading.service';
import { RestStatus } from '@common/enums/rest-enum';
import { LoginService } from '@api/services/login.service';

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
  digitalFinancialSelect: boolean;
  consumerFinanceSelect: boolean;
  wealthManagementSelect: boolean;
  creditCardsSelect: boolean;
  businessUnit = BusinessUnit;

  dataSource: LocalDataSource; //table
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
        onComponentInitFunction: (instance: any) => {
          instance.update.subscribe((updatedRow: ConsoleUser) => {
            // Handle the save action here
            const rowData = this.consoleUserList.find((row: any) => row.account === updatedRow.account);

            if (rowData) {
              Object.assign(rowData, updatedRow);
              this.dataSource.update(rowData, updatedRow); // Update the data source
            }
          });
        },
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

  constructor(
    storageService: StorageService,
    private loadingService: LoadingService,
    private router: Router,
    private accountManageService: AccountManageService,
    private loginService: LoginService,
    private dateService: NbDateService<Date>) {
    super(storageService);

    this.consoleUserForm = new FormGroup({
      account: new FormControl('', [this.maxLengthValidate(20)]),
      name: new FormControl('', [this.maxLengthValidate(20)]),
      email: new FormControl('', {
        validators: [this.maxLengthValidate(50), this.emailFormatValidate],
        updateOn: 'blur'
      }),
    });

    if(!this.loginService.checkMenuScope("console-user.update")) {
      delete this.gridDefine.columns.action;
    }
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
    this.queryAllConsoleGroup();
    this.queryAllConsoleUser();
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.consoleUserList);
  }

  search() {
    if (!this.consoleUserForm.invalid) {
      let rqData: ConsoleUserReq = {};
      let isQueryAll = true;
      let busineeUnit = "";

      if(this.account) {
        isQueryAll = false;
        rqData['account'] = this.account;
      }
        
      if(this.name) {
        isQueryAll = false;
        rqData['name'] = this.account;
      }

      if(this.email)  {
        isQueryAll = false;
        rqData['email'] = this.email;
      }

      if (this.digitalFinancialSelect) {
        busineeUnit += "Digital_Financial";
      }

      if (this.consumerFinanceSelect) {
        busineeUnit += (busineeUnit.length > 0 ? "," : "") + "Consumer_Finance";
      }

      if (this.wealthManagementSelect) {
        busineeUnit += (busineeUnit.length > 0 ? "," : "") + "Wealth_Management";
      }

      if (this.creditCardsSelect) {
        busineeUnit += (busineeUnit.length > 0 ? "," : "") + "Credit_Cards";
      }

      if(busineeUnit.length > 0) {
        isQueryAll = false;
        rqData['busineeUnit'] = busineeUnit;
      }

      if(this.groupId.length > 0) {
        isQueryAll = false;
        rqData['groupId'] = this.groupId;
      }

      // 這邊要判斷發送 6.1 or 6.2 電文去查詢
      if(isQueryAll){
        this.queryAllConsoleUser();
      } else {
        this.queryConsoleUserByParam(rqData);
      }
    } else {
      for (const control of Object.keys(this.consoleUserForm.controls)) {
        this.consoleUserForm.controls[control].markAsTouched();
      }
    }
  }

  queryAllConsoleGroup() {
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
          this.consoleGroupList = res.result;
        }
      });

    // 主機串接後，底下要拿掉
    this.consoleGroupList = ConsoleGroupListMock;
  }

  queryAllConsoleUser() {
    this.accountManageService.getAllConsoleUser().pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res)
        this.loadingService.close();
      })).subscribe(res => {
        if (res.code === RestStatus.SUCCESS) {
          this.consoleUserList = res.result;
        }
      });

    // 主機串接後，底下要拿掉
    this.consoleUserList = ConsoleUserListMock;
  }

  queryConsoleUserByParam(rqData: ConsoleUserReq) {    
    this.accountManageService.getConsoleUser(rqData).pipe(
      catchError((err) => {
        this.loadingService.close();
        throw new Error(err.message);
      }),
      tap(res => {
        console.info(res)
        this.loadingService.close();
      })).subscribe(res => {
        if (res.code === RestStatus.SUCCESS) {
          this.consoleUserList = res.result;
        }
      });

    // 主機串接後，底下要拿掉
    this.consoleUserList = ConsoleUserListMock;
  }

  reset() {
    this.digitalFinancialSelect = false;
    this.consumerFinanceSelect = false;
    this.wealthManagementSelect = false;
    this.creditCardsSelect = false;
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
  template: '<button nbButton status="info" size="tiny" class="iconBtn" (click)="edit()"><nb-icon icon="edit-outline"></nb-icon></button>'
})
export class ConsoleUserButtonComponent implements OnInit {
  @Input() value: Array<any>;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    // document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  edit() {
    const dialogRef = this.dialogService.open(ChangeDialogComponent, {
      consoleUser: JSON.stringify(this.value[0].row),
      consoleGroupList: JSON.stringify(this.value[0].consoleGroupList),
    });

    dialogRef.onClose.subscribe(res => {
      if (res) {
        // 這邊收到異動成功的時候，是否重新電文？
        this.update.emit(res);
      }
    });
  }
}
