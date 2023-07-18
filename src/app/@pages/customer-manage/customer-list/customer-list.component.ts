import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerList } from '@api/models/customer-list.model';
import { DialogService } from '@api/services/dialog.service';
import { CustomerListMock } from '@common/mock-data/customer-list-mock';
import { RegExp } from '@common/enums/reg-exp-enum';
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

    constructor() {
      super();
      // 篩選條件
      this.validateForm = new FormGroup({
        custId: new FormControl('', Validators.pattern(RegExp.custIdSearch)),
        mobile: new FormControl('', Validators.pattern(RegExp.integer)),
      });
    }

    mockData: Array<CustomerList> = CustomerListMock;
    updateTime: string = moment(new Date()).format('YYYY/MM/DD');
    
    ngOnInit(): void {
      this.dataSource = new LocalDataSource();
      this.dataSource.load(this.mockData);
    }

    ngDoCheck(): void {
    }

    gridDefine = {
      pager: {
        display: true,
        perPage: 10,
      },
      columns: {
        custId: {
          title: '用戶編號',
          type: 'string',
          class: 'col-1',
          sort: false
        },
        userName: {
          title: '姓名',
          type: 'string',
          class: 'col-1',
          sort: false,
        },
        mobile: {
          title: '手機號碼',
          type: 'string',
          class: 'col-1',
          sort: false,
        },
        userTag: {
          title: `用戶標籤 (更新時間: ${this.updateTime})`,
          type: 'custom',
          class: 'col-8',
          renderComponent: CustomerListTagComponent,
          sort: false,
        },
        action: {
          title: '查看',
          type: 'custom',
          class: 'col-1',
          renderComponent: CustomerListButtonComponent,
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
      
    reset(){
      this.dataSource.reset();
      this.validateForm.reset({custId: '', mobile: ''});
    }

    search() {
      this.dataSource.reset();
      let filter = this.validateForm.getRawValue();
      for (const [k, v] of Object.entries(filter)) {
        this.dataSource.addFilter({field: k, filter: undefined, search: v});
        this.updateTime = moment(new Date()).format('YYYY/MM/DD');
      }
    }
}

@Component({
    selector: 'customer-list-button',
    template: '<button nbButton ghost status="info" size="medium" (click)="detail()"><nb-icon icon="search"></nb-icon></button>'
})
export class CustomerListButtonComponent implements OnInit {

    constructor(private dialogService: DialogService) { }
    @Input() rowData: Array<string>;
    ngOnInit() { }

    detail(){
      this.dialogService.open(DetailDialogComponent, {
        title: `${this.rowData['custId']}`,
        dataList: this.rowData,
      });
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
  tags: {tagTitle: string, tagRule: string}[];

  ngOnInit() {
    this.tags = JSON.parse(JSON.stringify(this.value));
  }
}
