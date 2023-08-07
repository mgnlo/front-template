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
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@api/services/loading.service';
import { DialogService } from '@api/services/dialog.service';
import { RestStatus } from '@common/enums/rest-enum';

@Component({
  selector: 'console-group-edit',
  templateUrl: './console-group-edit.component.html',
  styleUrls: ['./console-group-edit.component.scss'],
})
export class ConsoleGroupEditComponent extends BaseComponent implements OnInit {
  consoleGroupDetail: ConsoleGroup;
  // consoleUser: any;
  consoleGroupScope: Array<GridInnerCheckBox> = [
    {featureName: "dashboard", read: false},
    {featureName: "customer", read: false},
    {featureName: "activity", read: false, create: false, update: false, review: false},
    {featureName: "tag", read: false, create: false, update: false, review: false},
    {featureName: "schedule", read: false, create: false, update: false, review: false},
    {featureName: "console-user", read: false, create: false, update: false, review: false},
    {featureName: "console-group", read: false, create: false, update: false, review: false}
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
  dataSource2: LocalDataSource;
  enableOption: any;

  gridDefine2 = {
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
        renderComponent: ConsoleGroupEditCheckboxComponent,
        sort: false,        
      },
      create: {
        title: '新增',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'create'],
        renderComponent: ConsoleGroupEditCheckboxComponent,
        sort: false,
      },
      update: {
        title: '編輯',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'update'],
        renderComponent: ConsoleGroupEditCheckboxComponent,
        sort: false,
      },
      review: {
        title: '審核',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'review'],
        renderComponent: ConsoleGroupEditCheckboxComponent,
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
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${BusinessUnit[cell]}</p>`;
        },
        sort: false,
      }
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      position: 'right',
      columnTitle: "移除",
      add: false,
      edit: false,
      delete: true,
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<img width="21px" src="assets/images/icon-delete-hover.svg" alt="">'
    }
  };

  constructor(
    storageService: StorageService,
    private router: Router,
    private accountManageService: AccountManageService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private dateService: NbDateService<Date>) {
    super(storageService);

    try{
      this.consoleGroupDetail = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get("consoleGroupDetail"));
      this.enableOption = "" + this.consoleGroupDetail.enable;
  
      for (let scopeObj of this.consoleGroupScope) {
        let keyList = Object.keys(scopeObj);
  
        for(let idx = 1; idx < keyList.length; idx++){
          scopeObj[keyList[idx]] = 
          (this.consoleGroupDetail.consoleGroupScope.filter( item => item.scope == `${scopeObj[keyList[0]]}.${keyList[idx]}`).length > 0 ? true : false);
        }      
      }
    } catch(e) {
      //防止瀏覽器 F5，重新導回 list
      this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH).then((res) => {
        if (res) {
          window.history.replaceState({}, '', this.router.url.split("?")[0]);
        };
      });
    }    
  }
  
  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource2 = new LocalDataSource();
    this.dataSource.load(this.consoleGroupDetail.consoleUser);
    this.dataSource2.load(this.consoleGroupScope);
    document.querySelector("nb-layout-column").scrollTo(0, 0);
  }

  onDeleteConfirm(event) {
    event.confirm.resolve();
    // setTimeout(() => {
    //   this.dataSource.getAll().then(rs => {
    //   });
    // }, 100);    
  }

  cancel(){
    let passData: NavigationExtras = {};

    passData.queryParams = {
      restore: true
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_DETAIL_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
      };
    });
  }

  ok(){
    let passData: NavigationExtras = {};

    this.consoleGroupDetail.consoleGroupScope = [];
    this.consoleGroupDetail.enable = new RegExp("true").test(this.enableOption);

    for (let scopeObj of this.dataSource2['data']) {
      let keyList = Object.keys(scopeObj);

      for(let idx = 1; idx < keyList.length; idx++){
        if(scopeObj[keyList[idx]]){
          this.consoleGroupDetail.consoleGroupScope.push({
            groupId: this.consoleGroupDetail.groupId,
            scope: `${scopeObj[keyList[0]]}.${keyList[idx]}`
          });
        }
      }
    }

    // 這邊要發送電文 7.4 更新群組設定去進行修改，request 內容同 7.2 的 response
    this.accountManageService.updateConsoleGroup(this.consoleGroupDetail.groupId, this.consoleGroupDetail).pipe(
        catchError((err) => {
          this.loadingService.close();
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
          // 修改成功後是否要再發送電文重新 query 資料或者是就直接 update?  
          }
        });

    passData.queryParams = {
      consoleGroupDetail: JSON.stringify(this.consoleGroupDetail)
    };
    this.router.navigate(this.accountManageService.CONSOLE_GROUP_DETAIL_PATH, passData).then((res) => {
      if (res) {
        window.history.replaceState({}, '', this.router.url.split("?")[0]);
      };
    });
  }
}

@Component({
  selector: 'console-group-edit-checkbox',
  template: '<nb-checkbox *ngIf="value && value[0][value[1]] != undefined" [(checked)]="value[0][value[1]]" (checkedChange)="change($event)" status="basic"></nb-checkbox>'
})
export class ConsoleGroupEditCheckboxComponent implements OnInit {
  @Input() value: Array<any>;

  constructor() {}

  ngOnInit(): void {
  }

  change(event: any){
    // 測試用
    // console.log(this.value[0][this.value[1]]);
  }
}
