import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@pages/base.component';
import { Status } from '@common/enums/commom-enum';
import { TagManageService } from '../tag-manage.service';
import { LocalDataSource } from 'ng2-smart-table';
import * as moment from 'moment';
import { TagList } from '@api/models/tag-list.model';
import { TagListMock } from '@common/mock-data/tag-list-mock';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends BaseComponent implements OnInit {
  constructor(
    private tagManageService: TagManageService,
    private router: Router) {
    super();
  }

  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  updateTime: string = moment(new Date()).format('YYYY/MM/DD');
  mockData: Array<TagList> = TagListMock;
  tagListSource = new LocalDataSource();

  params = {
    filter: {
      tagName: '',
      status: '',
      startDate: null,
      endDate: null,
    },
    page: 1,
    sort: [],
  };


  ngOnInit(): void {
    this.tagListSource.load(this.mockData);
    this.paginator.totalCount = this.mockData.length;

    this.tagListSource.onChanged().subscribe(() => {
      this.paginator.totalCount = this.tagListSource.count();
      let page = this.tagListSource.getPaging().page;
      this.paginator.nowPage = page;
      let perPage = this.tagListSource.getPaging().perPage;
      this.paginator.totalPage = Math.ceil(this.paginator.totalCount / perPage);
      this.paginator.rowStart = (page - 1) * perPage + 1;
      this.paginator.rowEnd = this.paginator.totalPage !== page ? page * perPage : (page - 1) * perPage + this.paginator.totalCount % perPage;
    });
  }

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      tagName: {
        title: '標籤名稱',
        type: 'html',
        class: 'col-1',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      tagType: {
        title: '類型',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      department: {
        title: '所屬單位',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      startDate: {
        title: '起始時間',
        type: 'html',
        class: 'col-2',
        sort: false,
        hide: true
      },
      endDate: {
        title: '結束時間',
        type: 'html',
        class: 'col-2',
        sort: false,
        hide: true
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        class: 'col-2',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1 alignCenter',
        valuePrepareFunction: (cell: string) => {
          return this.statusList.filter(status => status.key === cell)[0].val;
        },
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

  reset() {
    this.params.filter = { tagName: '', status: '', startDate: null, endDate: null, };
    this.tagListSource.reset();
  }

  search() {
    this.tagListSource.reset();
    const { startDate, endDate } = this.params.filter;

    //search date
    const addDateFilter = (field: string, value: Date | null, filterFn: (value: string, searchValue: string[]) => boolean) => {
      const formatDate = value !== null ? moment(value).format('YYYY-MM-DD') : null;

      if (formatDate) {
        this.tagListSource.addFilter({
          field,
          filter: filterFn,
          search: [formatDate],
        });
      }
    };
    addDateFilter('startDate', startDate, (value, searchValue) => new Date(value) >= new Date(searchValue[0]));
    addDateFilter('endDate', endDate, (value, searchValue) => new Date(value) <= new Date(searchValue[0]));

    //search other
    for (const [k, v] of Object.entries(this.params.filter).filter(([key, val]) => !key.includes('Date'))) {
      this.tagListSource.addFilter({
        field: k,
        filter: undefined,
        search: v,
      });
    }
  }

  add() {
    this.router.navigate(['pages', 'tag-manage', 'tag-add']);
  }

}

@Component({
  selector: 'ngx-custom-button',
  template: '<button nbButton ghost status="info" size="medium"><nb-icon icon="search"></nb-icon></button>',
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
  template: '<button class="left" *ngFor="let tag of value" nbButton status="info" size="small">{{tag}}</button>'
})
export class TagComponent implements OnInit {

  constructor() { }
  renderValue: string;
  @Input() value: Array<string>;

  ngOnInit() { }
}
