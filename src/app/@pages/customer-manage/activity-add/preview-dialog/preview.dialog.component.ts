import { Component, Input, OnInit } from '@angular/core';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-preview',
  templateUrl: './preview.dialog.component.html',
  styleUrls: ['./preview.dialog.component.scss'],
  providers: [],
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() dataList: Array<string>;

  orderType: string = 'asc';
  orderBy: number = 110;
  orderList = new Map([
    [110, '消費金額'],
    [111, '交易次數'],
    [112, '換匯次數'],
    [113, '定存筆數'],
  ]);
  constructor(private ref: NbDialogRef<PreviewDialogComponent>) {
    super();
  }

  ngOnInit() {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(CustomerListMock);
    console.info(this.dataList);
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 5,          
    },
    columns: {
      custId: {
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
      birth: {
        title: '生日',
        type: 'string',
        class: 'col-4',
        sort: false,
      },
    },
    hideSubHeader: true, //起訖日查詢要用到
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

  close() {
    this.ref.close();
  }
}
