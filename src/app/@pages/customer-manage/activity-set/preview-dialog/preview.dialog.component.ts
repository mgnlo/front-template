import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityListCondition, PreviewCustomerReq, TagGroupView } from '@api/models/activity-list.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { WarningCode, RestStatus } from '@common/enums/rest-enum';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { TagConditionMock } from '@common/mock-data/tag-condition-mock';
import { CommonUtil } from '@common/utils/common-util';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import { LocalData } from 'ng2-completer';
import { LocalDataSource } from 'ng2-smart-table';
import { catchError, filter, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.dialog.component.html',
  styleUrls: ['./preview.dialog.component.scss'],
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() size: string;
  @Input() conditionList: Array<ActivityListCondition>;

  info: string;
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
    private customerManageService: CustomerManageService,
    private dialogService: DialogService,
    private ref: NbDialogRef<PreviewDialogComponent>,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      size: new FormControl(null, ValidatorsUtil.listLimitRequired),
      conditionKey: new FormControl('', Validators.required),
      orderby: new FormControl('asc', Validators.required),
    });
  }

  ngOnInit(): void {
    this.validateForm.get('size').setValue(this.size);
    if (this.isMock) {
      TagConditionMock.forEach(condition => this.orderByList.set(condition.conditionKey, condition.conditionName));
      return;
    }
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
    if (this.validateForm.invalid) { return; }
    this.loadingService.open();

    if (this.isMock) {
      this.dataSource.load(CustomerListMock);
      this.info = `名單預計可抓取共` + CustomerListMock.length + `位名單資料，若有預算上考量請設定名單上限與資料排序方式。`;
      this.loadingService.close();
      return;
    }

    let req: PreviewCustomerReq = this.validateForm.getRawValue();
    let conditionOr: { [x: number]: TagGroupView[] } = CommonUtil.groupBy(this.conditionList, 'tagGroup', false);
    let conditions: Array<string>[] = Object.keys(conditionOr).map(conditionAnd => {
      return conditionOr[conditionAnd].map((and: TagGroupView) => and.tagId);
    });
    req.activityListCondition = conditions;
    this.customerManageService.getPreviewCustomerByActivityListCondition(req).pipe(
      catchError((err) => {
        this.dialogService.alertAndBackToList(false, err.message);
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS),
      tap((res) => {
        this.dataSource = new LocalDataSource();
        this.dataSource.load(res.result);
        this.info = `名單預計可抓取共` + res.result.length + `位名單資料，若有預算上考量請設定名單上限與資料排序方式。`;
      }),
      finalize(() => this.loadingService.close())
    ).subscribe();
  }

  close() {
    this.ref.close();
  }
}
