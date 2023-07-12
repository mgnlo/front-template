import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserList } from '@api/models/user-list.model';
import { DialogService } from '@api/services/dialog.service';
import { UserListMock } from '@common/mock-data/user-list-mock';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { DetailDialogComponent } from './detail-dialog/detail.dialog.component';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseComponent implements OnInit {

    constructor() {
      super();
      // 篩選條件
      this.validateForm = new FormGroup({
        custId: new FormControl('', Validators.pattern("^[A-Z]{0,2}[0-9]{0,9}$")),
        mobile: new FormControl('', Validators.pattern("^[0-9]*$")),
      });
    }

    mockData: Array<UserList> = UserListMock;
    userListSource = new LocalDataSource();
    updateTime: string = moment(new Date()).format('YYYY/MM/DD');

    ngOnInit(): void {
      this.userListSource.load(this.mockData);
      this.paginator.totalCount = this.mockData.length;

      this.userListSource.onChanged().subscribe(()=>{
        this.paginator.totalCount = this.userListSource.count();
        let page =this.userListSource.getPaging().page;
        this.paginator.nowPage = page;
        let perPage = this.userListSource.getPaging().perPage;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount/perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        this.paginator.rowEnd = this.paginator.totalPage !== page ? page * perPage : (page-1) * perPage + this.paginator.totalCount % perPage;
      });
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
          renderComponent: UserListTagComponent,
          sort: false,
        },
        action: {
          title: '查看',
          type: 'custom',
          class: 'col-1',
          renderComponent: UserListButtonComponent,
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
      this.validateForm.reset({custId: '', mobile: ''});
      this.userListSource.reset();
    }

    search() {
      let filter = this.validateForm.getRawValue();
      for (const [k, v] of Object.entries(filter)) {
        this.userListSource.addFilter({field: k, filter: undefined, search: v});
        this.updateTime = moment(new Date()).format('YYYY/MM/DD');
      }
    }
}

@Component({
    selector: 'ngx-user-list-button',
    template: '<button nbButton ghost status="info" size="medium" (click)="detail()"><nb-icon icon="search"></nb-icon></button>'
})
export class UserListButtonComponent implements OnInit {

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
  selector: 'tmp-tag',
  template: '<div class="tag"><nb-tag status="info" appearance="filled" *ngFor="let tag of tags" [text]="tag.tagTitle"></nb-tag></div>'
})
export class UserListTagComponent implements OnInit {

  constructor() { }
  renderValue: string;
  @Input() value: Array<string>;
  tags: {tagTitle: string, tagRule: string}[];

  ngOnInit() {
    this.tags = JSON.parse(JSON.stringify(this.value));
  }
}
