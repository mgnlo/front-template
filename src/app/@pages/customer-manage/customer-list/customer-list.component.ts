import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerList } from '@api/models/customer-list.model';
import { DialogService } from '@api/services/dialog.service';
import { StorageService } from '@api/services/storage.service';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { ColumnButtonComponent } from '@component/table/column-button/column-button.component';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { DetailDialogComponent } from './detail-dialog/detail.dialog.component';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseComponent implements OnInit {

  constructor(storageService: StorageService, private dialogService: DialogService) {
    super(storageService);
    // 篩選條件
    this.validateForm = new FormGroup({
      customerId: new FormControl('', [ValidatorsUtil.searchCustId]),
      mobile: new FormControl('', ValidatorsUtil.number),
    });
  }

  mockData: Array<CustomerList> = CustomerListMock;
  updateTime: string = moment(new Date()).format('YYYY/MM/DD');

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
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
        width: '15%',
        sort: false
      },
      userName: {
        title: '姓名',
        type: 'string',
        width: '10%',
        sort: false,
      },
      mobile: {
        title: '手機號碼',
        type: 'string',
        width: '15%',
        sort: false,
      },
      userTag: {
        title: `用戶標籤 (更新時間: ${this.updateTime})`,
        type: 'custom',
        width: '55%',
        renderComponent: CustomerListTagComponent,
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '5%',
        renderComponent: ColumnButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.settings = { buttonStatus: 'info', buttonIcon: 'search'}
          instance.emitter.subscribe((res) => {
            this.dialogService.open(DetailDialogComponent, {
              title: `${res['customerId']}`,
              dataList: res,
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
    this.dataSource.reset();
    this.validateForm.reset({ customerId: '', mobile: '' });
  }

  search() {
    this.dataSource.reset();
    let filter = this.validateForm.getRawValue();
    for (const [k, v] of Object.entries(filter).filter(([key, val]) => !!val)) {
      this.dataSource.addFilter({ field: k, filter: undefined, search: v });
      this.updateTime = moment(new Date()).format('YYYY/MM/DD');
    }
  }
}

@Component({
  selector: 'customer-tag',
  template: '<div class="tag left"><nb-tag status="info" appearance="filled" size="large" *ngFor="let tag of tags" [text]="tag.tagTitle"></nb-tag></div>'
})
export class CustomerListTagComponent implements OnInit {

  constructor() { }
  renderValue: string;
  @Input() value: Array<string>;
  tags: { tagTitle: string, tagRule: string }[];

  ngOnInit() {
    this.tags = JSON.parse(JSON.stringify(this.value));
  }
}
