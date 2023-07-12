import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { Status } from '@common/enums/activity-list-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { NbDateService } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent extends BaseComponent implements OnInit {

    constructor(
        private router: Router,
        private dateService: NbDateService<Date>) {
        super();
        // 篩選條件
        this.validateForm = new FormGroup({
          activityName: new FormControl(''),
          status: new FormControl(''),
          startDate: new FormControl(null),
          endDate: new FormControl(null),
        });
    }

    statusList: Array<{key: string; val: string}> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
    selected: string = '';
    mockData: Array<ActivitySetting> = ActivityListMock;
    activityListSource = new LocalDataSource();

    ngOnInit(): void {
      this.mockData = this.mockData.map(mock => {
        return {...mock, during:`${mock.startDate}~${mock.endDate}`} //起訖日查詢篩選要用到
      })
      this.activityListSource.load(this.mockData);
    }

    ngDoCheck() {
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

    gridDefine = {
        pager: {
          display: true,
          perPage: 10,          
        },
        columns: {
          activityName: {
            title: '活動名稱',
            type: 'html',
            class: 'col-2 left',
            sort: false,
            valuePrepareFunction: (cell:string) => {
              return `<p class="left">${cell}</p>`;
            },
          },
          activityDescription: {
            title: '活動說明',
            type: 'html',
            class: 'col-3 left',
            sort: false,
            valuePrepareFunction: (cell:string) => {
              return `<p class="left">${cell}</p>`;
            },
          },
          filterOptions: {
            title: '差異過濾',
            type: 'custom',
            class: 'col-1',
            sort: false,
            renderComponent: CeckboxComponent,
          },
          listLimit: {
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
            valuePrepareFunction: (cell:any) => {
              return `<span class="date">${cell}</span>`;
            },
            sort: false,
            filterFunction: (cell?: string, search?: string[]) => {
              let cellSDate = cell.split('~')[0];
              let cellEDate = cell.split('~')[1];
              let sDate = search[0];
              let eDate = search[1];
              let isSDate = sDate !== null;
              let isEDate = eDate !== null;
              if(
                (!isSDate && !isEDate) ||
                ((isSDate && isEDate) && (
                  moment(cellSDate).isBetween(sDate, eDate, undefined, '[]') ||
                  moment(cellEDate).isBetween(sDate, eDate, undefined, '[]') ||
                  moment(sDate).isBetween(cellSDate, cellEDate, undefined, '[]') ||
                  moment(eDate).isBetween(cellSDate, cellEDate, undefined, '[]')
                )) ||
                ((isSDate && !isEDate) && (
                  moment(sDate).isBetween(cellSDate, cellEDate, undefined, '[]')
                )) ||
                ((!isSDate && isEDate) && (
                  moment(eDate).isBetween(cellSDate, cellEDate, undefined, '[]')
                ))
              ){
                return true
              }  else {
                return false
              }
            }   
          },
          action: {
            title: '查看',
            type: 'custom',
            class: 'col-1',
            valuePrepareFunction: (cell, row: ActivitySetting) => row,
            renderComponent: ActivityButtonComponent,
            sort: false,
          },
        },
        hideSubHeader: false, //起訖日查詢要用到
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

      add(){
        this.router.navigate(['pages', 'user-manage', 'activity-add']);
      }

      reset(){
        this.validateForm.reset({ activityName: '', status: '', startDate: null, endDate: null});
        this.activityListSource.reset();
      }
  
      search() {
        this.activityListSource.reset();
        let filter = this.validateForm.getRawValue();
        //search during
        let sDate = filter.startDate !== null? moment(filter.startDate).format('YYYY-MM-DD') : null;
        let eDate = filter.endDate !== null? moment(filter.endDate).format('YYYY-MM-DD') : null;
        this.activityListSource.addFilter({
          field: 'during',
          filter: undefined,
          search: [sDate, eDate],
        });
        //search other
        for (const [k, v] of Object.entries(filter).filter(([key, val])=> !key.includes('Date'))) {
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
    template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class ActivityButtonComponent implements OnInit {

    constructor(private router: Router) { }

    @Input() value: ActivitySetting;

    ngOnInit() {}
    
    search(){
      let passData: NavigationExtras = {state: this.value};
      this.router.navigate(['pages', 'user-manage', 'activity-detail'], passData);
    }

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
