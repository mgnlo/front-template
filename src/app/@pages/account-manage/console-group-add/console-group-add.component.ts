import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { is } from 'date-fns/locale';
import { ValidationError } from 'ngx-awesome-uploader';

@Component({
  selector: 'console-group-add',
  templateUrl: './console-group-add.component.html',
  styleUrls: ['./console-group-add.component.scss'],
})
export class ConsoleGroupAddComponent extends BaseComponent implements OnInit {
  consoleGroup: ConsoleGroup;
  consoleUser: any;
  consoleGroupScope: Array<GridInnerCheckBox> = [
    { featureName: "dashboard", read: false },
    { featureName: "customer", read: false },
    { featureName: "activity", read: false, create: false, update: false, review: false },
    { featureName: "tag", read: false, create: false, update: false, review: false },
    { featureName: "schedule", read: false, create: false, update: false, review: false },
    { featureName: "console-user", read: false, create: false, update: false, review: false },
    { featureName: "console-group", read: false, create: false, update: false, review: false }
  ];
  featureNameMap = {
    dashboard: "儀表板",
    customer: "用戶管理 - 用戶列表",
    activity: "用戶管理 - 客群活動名單",
    tag: "標籤管理",
    schedule: "排程管理",
    "console-user": "帳號管理 - 使用者管理",
    "console-group": "帳號管理 - 權限管理"
  }

  enableOption: string = "true";
  groupName: string;
  consoleGroupAddForm: FormGroup;

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      featureName: {
        title: '功能單元',
        type: 'html',
        class: 'col-1 left',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${this.featureNameMap[cell]}</p>`;
        },
        sort: false,
      },
      read: {
        title: '查看',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'read'],
        renderComponent: ConsoleGroupAddCheckboxComponent,
        sort: false,
      },
      create: {
        title: '新增',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'create'],
        renderComponent: ConsoleGroupAddCheckboxComponent,
        sort: false,
      },
      update: {
        title: '編輯',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'update'],
        renderComponent: ConsoleGroupAddCheckboxComponent,
        sort: false,
      },
      review: {
        title: '審核',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'review'],
        renderComponent: ConsoleGroupAddCheckboxComponent,
        sort: false,
      }
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    }
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountManageService: AccountManageService,
    private dateService: NbDateService<Date>) {
    super();

    let mode = this.activatedRoute.snapshot.queryParamMap.get("mode");

    if (mode) {
      if (mode == "copy") {
        let groupScope = this.activatedRoute.snapshot.queryParamMap.get("consoleGroupScope");

        if (groupScope) {
          this.consoleGroupScope = JSON.parse(groupScope);
        }
      }
    } else {
      //防止瀏覽器 F5，重新導回 list
      this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH).then((res) => {
        if (res) {
          window.history.replaceState({}, '', this.router.url.split("?")[0]);
        };
      });
    }

    this.consoleGroupAddForm = new FormGroup({
      groupName: new FormControl('', [this.groupNameValidate(20)]),
    });
  }

  groupNameValidate(length: number): ValidatorFn{
    return (ctl: AbstractControl): ValidationErrors | null => {
      const value = ctl.value;

      if(!value){
        return { errMsg: "此欄位為必填欄位"};
      } else if (value.leangth > length) {
        return { errMsg: `欄位最長為${length}個字元`};
      } else {
        return null;
      }
    }
    
  }

  isError(formCtrlName: string) {
    let viewCtrl: AbstractControl = this.consoleGroupAddForm.get(formCtrlName);

    return (viewCtrl.touched || viewCtrl.dirty) && viewCtrl.errors?.errMsg;
  }

  reset(){
    this.enableOption = "true";
    
    this.consoleGroupAddForm.reset({
      groupName: ""
    });
  }

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.consoleGroupScope);

    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  cancel() {
    let passData: NavigationExtras = {};

    passData.queryParams = {
      restore: true
    };

    this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
      };
    });
  }

  ok() {
    if (!this.consoleGroupAddForm.invalid) {
      // 這邊要發送 6.3 電文去進行新增
      // 新增成功後要再發送電文重新 query 
      this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH).then((res) => {
        if (res) {
          window.history.replaceState({}, '', this.router.url.split("?")[0]);
        };
      });
    } else {
      for (const control of Object.keys(this.consoleGroupAddForm.controls)) {
        this.consoleGroupAddForm.controls[control].markAsTouched();
      }
    }
  }
}

@Component({
  selector: 'console-group-add-checkbox',
  template: '<nb-checkbox *ngIf="value && value[0][value[1]] != undefined" [(checked)]="value[0][value[1]]" (checkedChange)="change($event)" status="basic"></nb-checkbox>'
})
export class ConsoleGroupAddCheckboxComponent implements OnInit {
  @Input() value: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

  change(event: any) {
    console.log(this.value[0][this.value[1]]);
  }
}
