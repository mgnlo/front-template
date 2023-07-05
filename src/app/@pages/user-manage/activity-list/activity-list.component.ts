import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '@api/models/activity-list.model';
import { BaseComponent } from '@pages/base.component';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { LocalDataSource } from 'ng2-smart-table';
import { UserManageService } from '../user-manage.service';


@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {

    constructor(
        private datePipe: DatePipe,
        private userManageService: UserManageService) {
        super();
    }
    selected: string = '';
    mockData: Array<Activity> = ActivityListMock;
    activityListSource = new LocalDataSource();
    // 頁面參數
    param = {
      filter: { // 篩選條件
        activityName: '',
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
        this.activityListSource.getAll().then((total)=>{this.paginator.totalCount = total.length});
        let page =this.activityListSource.getPaging().page;
        let perPage = this.activityListSource.getPaging().perPage;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount/perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        console.info(this.paginator.totalPage)
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
            type: 'string',
            class: 'col-2',
            sort: false
          },
          activity_description: {
            title: '活動說明',
            type: 'string',
            class: 'col-3',
            sort: false,
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
            class: 'col-1',
            valuePrepareFunction: (cell:string) => {
              switch (cell) {
                case 'active':
                  return '啟用'
                case 'stop':
                  return '停用'
                case 'processing':
                  return '審查中'
                default:
                  return '';
              }
            },
            sort: false,
          },
          during: {
            title: '起訖時間',
            type: 'string',
            class: 'col-3',
            valuePrepareFunction: (cell:any, row: Activity) => {
              return `${row.start_date}~${row.end_date}`;
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
    template: '<nb-checkbox [checked]="bool" status="basic"></nb-checkbox>',
})
export class CeckboxComponent implements OnInit {

    @Input() value: string;
    bool: boolean;

    ngOnInit() {
      this.bool = this.value === 'true' ? true : false;
    }
}
