import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@api/models/activity-list.model';
import { Status } from '@common/enums/activity-list-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';
import { UserManageService } from '../user-manage.service';


@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {

    constructor(
        private userManageService: UserManageService,
        private router: Router) {
        super();
    }
    statusList: Array<{key: string; val: string}> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
    selected: string = '';
    mockData: Array<Activity> = ActivityListMock;
    activityListSource = new LocalDataSource();
    // 頁面參數
    params = {
      filter: { // 篩選條件
        activity_name: '',
        status: '',
      },
      search: { // 搜尋條件(打API)
        startDate: new Date(),
        endDate: new Date(),
      },
      page: 1,
      sort: [],
    };

    public ngOnInit(): void {
      this.activityListSource.load(this.mockData);
      this.activityListSource.onChanged().subscribe(()=>{
        this.paginator.totalCount = this.activityListSource.count();
        let page =this.activityListSource.getPaging().page;
        let perPage = this.activityListSource.getPaging().perPage;
        this.paginator.nowPage = page;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount/perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        this.paginator.rowEnd = this.paginator.totalPage !== page ? page * perPage : (page-1) * perPage + this.paginator.totalCount % perPage;
      });
    }

    ngDoCheck() {}

    gridDefine = {
        pager: {
          display: true,
          perPage: 10,
        },
        columns: {
          activity_name: {
            title: '活動名稱',
            type: 'html',
            class: 'col-2 left',
            sort: false,
            valuePrepareFunction: (cell:string) => {
              return `<p class="left">${cell}</p>`;
            },
          },
          activity_description: {
            title: '活動說明',
            type: 'html',
            class: 'col-3 left',
            sort: false,
            valuePrepareFunction: (cell:string) => {
              return `<p class="left">${cell}</p>`;
            },
          },
          filter_options: {
            title: '差異過濾',
            type: 'custom',
            class: 'col-1',
            sort: false,
            renderComponent: CeckboxComponent,
          },
          list_limit: {
            title: '名單上限',
            type: 'string',
            class: 'col-1',
            sort: false,
          },
          status: {
            title: '狀態',
            type: 'string',
            class: 'col-1 alignCenter',
            valuePrepareFunction: (cell:string) => {
              return this.statusList.filter(status => status.key === cell)[0].val;
            },
            sort: false,
          },
          during: {
            title: '起訖時間',
            type: 'html',
            class: 'col-3',
            valuePrepareFunction: (cell:any, row: Activity) => {
              return `<span class="date">${row.start_date}~${row.end_date}</span>`;
            },
            sort: false,
          },
          action: {
            title: '查看',
            type: 'custom',
            class: 'col-1',
            renderComponent: ActivityButtonComponent,
            sort: false,
          },
        },
        hideSubHeader: true,
        actions: {
          add: false,
          edit: false,
          delete: false,
        },
        // rowClassFunction: (row: Row) => {
        //   console.info(row.getData().status)
        //   return row.getData().status === 'ing' ? 'aa' : '';
        // },
      };

      filter(field: string, search: any): void {
        if (typeof search === 'number') {
          search = search.toString(10);
        }
        this.activityListSource.addFilter({
          field: field,
          filter: undefined,
          search: search,
        });
        
      }

      add(){
        this.router.navigate(['pages', 'user-manage', 'activity-add']);
      }

      reset(){
        this.params.filter = { activity_name: '', status: ''};
        this.activityListSource.reset();
      }
  
      submit() {
        for (const [k, v] of Object.entries(this.params.filter)) {
          this.activityListSource.addFilter({
            field: k,
            filter: undefined,
            search: v,
          });
        }
      }
}

@Component({
    selector: 'ngx-activity-button',
    template: '<button nbButton ghost status="info" size="medium"><nb-icon icon="search"></nb-icon></button>'
})
export class ActivityButtonComponent implements OnInit {

    constructor() { }

    @Input() value: {id: string, writeScope: boolean};

    ngOnInit() {}

    edit(): void {}
}

@Component({
    selector: 'ngx-ceckbox',
    template: '<nb-checkbox [checked]="bool" status="basic" ></nb-checkbox>',
})
export class CeckboxComponent implements OnInit {

    @Input() value: string;
    bool: boolean;

    ngOnInit() {
      this.bool = this.value === 'true' ? true : false;
    }
}
