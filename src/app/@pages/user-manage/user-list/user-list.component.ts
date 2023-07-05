import { Component, Input, OnInit } from '@angular/core';
import { UserList } from '@api/models/user-list.model';
import { UserListMock } from '@common/mock-data/user-list-mock';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseComponent implements OnInit {

    constructor() {
      super();
    }
    mockData: Array<UserList> = UserListMock;
    userListSource = new LocalDataSource();

    params = {
      filter: { // 篩選條件
        custId: '',
        mobile: '',
      }
    };

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
          title: '用戶標籤',
          type: 'custom',
          class: 'col-8',
          renderComponent: TagComponent,
          sort: false,
        },
        action: {
          title: '查看',
          type: 'custom',
          class: 'col-1',
          renderComponent: ButtonComponent,
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
      this.params.filter = {custId: '', mobile: ''};
      this.userListSource.reset();
    }

    submit() {
      for (const [k, v] of Object.entries(this.params.filter)) {
        this.userListSource.addFilter({field: k, filter: undefined, search: v});
      }
    }
}

@Component({
    selector: 'ngx-custom-button',
    template: '<button nbButton ghost status="info" size="small"><nb-icon icon="search"></nb-icon></button>',
})
export class ButtonComponent implements OnInit {

    constructor() { }
    @Input() rowData: Array<string>;
    ngOnInit() { }
    edit(): void {
        // this.router.navigate(['/pages/system-setting/system-manage/edit', this.value.id]);
    }
}

@Component({
  selector: 'tmp-tag',
  template: '<span *ngFor="let tag of value"><button nbButton status="info" size="small">{{tag}}</button></span>'
})
export class TagComponent implements OnInit {

  constructor() { }
  renderValue: string;
  @Input() value: Array<string>;

  ngOnInit() {}
}
