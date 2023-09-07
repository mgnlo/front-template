import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@api/models/customer-list.model';
import { ConfigService } from '@api/services/config.service';
import { DialogService } from '@api/services/dialog.service';
import { LoginService } from '@api/services/login.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';
import { StorageService } from '@api/services/storage.service';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { CustomerManageService } from '../customer-manage.service';
import { DetailDialogComponent } from './detail-dialog/detail.dialog.component';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseComponent implements OnInit {

  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private dialogService: DialogService,
    private customerManageService: CustomerManageService,
    private tableService: Ng2SmartTableService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(storageService, configService, loginService);
    // 篩選條件
    this.validateForm = new FormGroup({
      customerId: new FormControl('', ValidatorsUtil.searchCustId),
      mobile: new FormControl('', ValidatorsUtil.number),
      tagKeyword: new FormControl(''),
    });
    this.sessionKey = this.activatedRoute.snapshot.routeConfig.path;
  }

  mockData: Array<Customer> = CustomerListMock;
  updateTime: string = moment(new Date()).format('YYYY/MM/DD');
  isSearch: boolean = false;

  ngOnInit(): void {
    this.search();
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      customerId: {
        title: '用戶編號',
        type: 'html',
        class: 'text_center w150',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + value + `</p>`;
        },
        sort: false
      },
      userName: {
        title: '姓名',
        type: 'html',
        class: 'text_center w100',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + value + `</p>`;
        },
        sort: false,
      },
      mobile: {
        title: '手機號碼',
        type: 'html',
        class: 'text_center w150',
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return `<p class="text_center">` + value + `</p>`;
        },
        sort: false,
      },
      tagKeyword: {
        title: `用戶標籤 (更新時間: ${this.updateTime})`,
        type: 'custom',
        class: 'text_center',
        valuePrepareFunction: (cell, row: Customer) => row.tagSetting,
        renderComponent: CustomerListTagComponent,
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        class: 'center',
        width: '3rem',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance: ColumnButtonComponent) => {
          instance.emitter.subscribe((res: Customer) => {
            this.dialogService.open(DetailDialogComponent, {
              customerId: res.customerId
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
    },
  };

  reset() {
    this.validateForm.reset({ customerId: '', mobile: '', tagKeyword: '' });
    this.isSearch = true;
    this.paginator.nowPage = 1;
    this.search('reset');
  }

  search(key?: string) {

    if (this.isMock) {
      this.dataSource.reset();
      let filter = this.validateForm.getRawValue();
      for (const [k, v] of Object.entries(filter).filter(([key, val]) => !!val)) {
        this.dataSource.addFilter({ field: k, filter: undefined, search: v });
        console.info(this.dataSource.getFilter())
        this.updateTime = moment(new Date()).format('YYYY/MM/DD');
      }
      this.dataSource.load(this.mockData);
      return;
    }

    this.isSearch = false;
    if (key === 'search') this.isSearch = true;

    if (['search', 'reset'].includes(key)) this.paginator.nowPage = 1;

    let page = this.paginator.nowPage;

    let searchInfo: SearchInfo = {
      apiUrl: this.customerManageService.customerFunc,
      nowPage: page,
      filters: this.validateForm.getRawValue(),
      errMsg: '用戶列表查無資料',
    }

    this.restDataSource = this.tableService.searchData(searchInfo);
  }
}

@Component({
  selector: 'customer-tag',
  template: '<div class="tagList"><nb-tag status="info" appearance="filled" size="large" *ngFor="let tag of value" [text]="tag.tagName"></nb-tag></div>'
})
export class CustomerListTagComponent {
  @Input() value: { tagName: string, tagDescription: string }[];
}
