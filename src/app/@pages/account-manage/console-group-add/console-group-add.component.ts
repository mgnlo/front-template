import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { StorageService } from '@api/services/storage.service';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { AccountManageService } from '../account.manage.service';
import { LoadingService } from '@api/services/loading.service';
import { catchError, tap } from 'rxjs/operators';
import { RestStatus } from '@common/enums/rest-enum';
import { GroupScope } from '@common/enums/console-group-enum';
import { ConfigService } from '@api/services/config.service';

@Component({
  selector: 'console-group-add',
  templateUrl: './console-group-add.component.html',
  styleUrls: ['./console-group-add.component.scss'],
})
export class ConsoleGroupAddComponent extends BaseComponent implements OnInit {
  consoleGroup: ConsoleGroup = {
    consoleGroupScope: [],
    groupId: null,
    groupName: '',
    description: null,
    priority: null,
    enable: true,
    createTime: null,
    modificationTime: null
  };
  consoleUser: any;
  consoleGroupScope: Array<GridInnerCheckBox> = this.accountManageService.createDefaultScopeGridInnerCheckBoxs();

  enableOption: string = "true";
  consoleGroupAddForm: FormGroup;

  gridDefine = {
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
      delete: {
        title: '刪除',
        type: 'custom',
        class: 'col-1',
        valuePrepareFunction: (cell, row: GridInnerCheckBox) => [row, 'delete'],
        renderComponent: ConsoleGroupAddCheckboxComponent,
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

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private accountManageService: AccountManageService,
    private dateService: NbDateService<Date>) {
    super(storageService, configService);

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

  groupNameValidate(length: number): ValidatorFn {
    return (ctl: AbstractControl): ValidationErrors | null => {
      const value = ctl.value;

      if (!value) {
        return { errMsg: "此欄位為必填欄位" };
      } else if (value.leangth > length) {
        return { errMsg: `欄位最長為${length}個字元` };
      } else {
        return null;
      }
    }
  }

  isError(formCtrlName: string) {
    let viewCtrl: AbstractControl = this.consoleGroupAddForm.get(formCtrlName);

    return (viewCtrl.touched || viewCtrl.dirty) && viewCtrl.errors?.errMsg;
  }

  reset() {
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
      // 這邊要發送 7.3 電文去進行新增
      this.consoleGroup.enable = new RegExp("true").test(this.enableOption);

      for (let scopeObj of this.consoleGroupScope) {
        let keyList = Object.keys(scopeObj);

        for (let idx = 1; idx < keyList.length; idx++) {
          if (scopeObj[keyList[idx]]) {
            this.consoleGroup.consoleGroupScope.push({
              groupId: this.consoleGroup.groupId,
              scope: `${scopeObj[keyList[0]]}.${keyList[idx]}`
            });
          }
        }
      }

      this.loadingService.open();
      this.accountManageService.createConsoleGroup(this.consoleGroup).pipe(
        catchError((err) => {
          this.loadingService.close();
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            this.router.navigate(this.accountManageService.CONSOLE_GROUP_LIST_PATH).then((res) => {
              if (res) {
                window.history.replaceState({}, '', this.router.url.split("?")[0]);
              };
            });
          }
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
