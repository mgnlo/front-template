import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserList } from '@api/models/user-list.model';
import { BaseComponent } from '@pages/base.component';
import { UserListMock } from '@common/mock-data/user-list-mock';
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
    
    queryForm: FormGroup;
    mockData: Array<UserList> = UserListMock;
    userListSource = new LocalDataSource();

    param = {
      filter: { // 篩選條件
        name: '', // 範本名稱
        questionType: '', // 題目類別
        description: '', // 題目名稱
      },
      search: { // 搜尋條件(打API)
        startDate: new Date(),
        endDate: new Date(),
      },
      activeTab: 'template',
      templateTab: {
        page: 1,
        sort: [],
      },
      questionTab: {
        page: 1,
        sort: [],
      },
    };

    ngOnInit(): void {
      this.userListSource.load(this.mockData);
      this.paginator.totalCount = this.mockData.length;

      this.queryForm = new FormGroup({
        custId: new FormControl('', []),
        mobile: new FormControl('', []),
      });

      this.userListSource.onChanged().subscribe(()=>{
        let page =this.userListSource.getPaging().page;
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
      this.queryForm.reset();
    }

    submit() {
      console.info(this.queryForm.getRawValue());
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
