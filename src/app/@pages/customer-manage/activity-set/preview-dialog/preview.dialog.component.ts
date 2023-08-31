import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.dialog.component.html',
  styleUrls: ['./preview.dialog.component.scss'],
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() dataList: Array<string>;

  orderByList = new Map([
    [110, '消費金額'],
    [111, '交易次數'],
    [112, '換匯次數'],
    [113, '定存筆數'],
    [114, '消費金額'],
    [115, '交易次數'],
    [116, '換匯次數'],
    [117, '定存筆數'],
    [118, '消費金額'],
    [119, '交易次數'],
    [120, '換匯次數'],
    [121, '定存筆數'],
  ]);
  sortList = new Map([
    ['asc', '升冪'],
    ['desc', '降冪'],
  ]);
  constructor(
    storageService: StorageService,
    configService: ConfigService,
    loginService: LoginService,
    private ref: NbDialogRef<PreviewDialogComponent>,
  ) {
    super(storageService, configService, loginService);
    this.validateForm = new FormGroup({
      listLimit: new FormControl('150', [Validators.required, ValidatorsUtil.notZero]),
      orderBy: new FormControl(110, Validators.required),
      sortType: new FormControl('asc', Validators.required),
    });
  }
  limit: number = 100;
  infos = [`名單預計可抓取共 ${this.limit} 位名單資料，若有預算上考量請設定名單上限與資料排序方式。`];

  ngOnInit() {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(CustomerListMock);
    if (!!this.dataList['listLimit']) {
      this.validateForm.get('listLimit').setValue(this.dataList['listLimit']);
      this.limit = this.dataList['listLimit']+100; //TODO: 待加上取值邏輯
    }
    console.info(this.dataList);
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
    },
    // rowClassFunction: (row: Row) => {
    //   console.info(row.getData().status)
    //   return row.getData().status === 'ing' ? 'aa' : '';
    // },
  };

  changeSort(sortType: string) {
    this.dataSource.setSort([{ field: 'custId', direction: sortType }]);
  }

  close() {
    this.ref.close();
  }
}
