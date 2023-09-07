import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { WarningCode, RestStatus } from '@common/enums/rest-enum';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import { catchError, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.dialog.component.html',
  styleUrls: ['./preview.dialog.component.scss'],
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() listLimit: string;

  orderByList = new Map<string, string>();
  sortList = new Map([
    ['asc', '升冪'],
    ['desc', '降冪'],
  ]);
  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private loadingService: LoadingService,
    private tagManageService: TagManageService,
    private dialogService: DialogService,
    private ref: NbDialogRef<PreviewDialogComponent>,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      listLimit: new FormControl('150', [Validators.required, ValidatorsUtil.notZero]),
      orderBy: new FormControl('', Validators.required),
      sortType: new FormControl('asc', Validators.required),
    });
  }
  info: string;
  limit: string;

  ngOnInit(): void {
    this.tagManageService.getTagConditionList().pipe(
      catchError((err) => {
        this.loadingService.close();
        let status = Object.values(WarningCode).includes(err.code) ? null : false;
        this.dialogService.alertAndBackToList(status, '無可選的資料排序方式');
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap(res => {
        //L2裡面用到的L1標籤
        res.result.forEach(option => this.orderByList.set(option.conditionKey, option.conditionName));
        this.loadingService.close();
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.listLimit.currentValue) {
      this.validateForm.get('listLimit').setValue(changes.listLimit.currentValue, { emitEvent: false });
    }
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      customerId: {
        title: '用戶編號',
        type: 'string',
        class: 'col-3',
        sort: false,
      },
      userName: {
        title: '姓名',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      mobile: {
        title: '手機號碼',
        type: 'string',
        class: 'col-3',
        sort: false,
      },
      birthday: {
        title: '生日',
        type: 'string',
        class: 'col-4',
        sort: false,
      },
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    attr: {
      class: 'dialogTable'
    }
  };

  changeSort(sortType: string) {
    this.dataSource.setSort([{ field: 'custId', direction: sortType }]);
  }

  search() {
    this.loadingService.open();
    if (this.isMock) {
      this.dataSource.load(CustomerListMock);
      this.loadingService.close();
      return;
    }
    //TODO: 回傳的客戶總數
    this.info = `名單預計可抓取共`+ this.limit + `位名單資料，若有預算上考量請設定名單上限與資料排序方式。`;
    this.loadingService.close();
  }

  close() {
    this.ref.close();
  }
}
