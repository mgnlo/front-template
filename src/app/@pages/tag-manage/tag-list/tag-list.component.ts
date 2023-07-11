import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@pages/base.component';
import { Status } from '@common/enums/activity-list-enum';
import { TagManageService } from '../tag-manage.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Activity } from '@api/models/activity-list.model';
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
    filter: { // 篩選條件
      tagId: '',
      status: '',
    },
    page: 1,
    sort: [],
  };

  gridDefine = {
    pager: {
      display: true,
      perPage: 10,
    },
    columns: {
      // tagId: {
      //   title: '標籤Id',
      //   type: 'string',
      //   class: 'col-1',
      //   sort: false
      // },
      tagName: {
        title: '標籤名稱',
        type: 'string',
        class: 'col-1',
        sort: false
      },
      type: {
        title: '類型',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      responsibleUnit: {
        title: '所屬單位',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      principal: {
        title: '負責人',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      directions: {
        title: '說明',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      updateTime: {
        title: '異動時間',
        type: 'html',
        class: 'col-2',
        valuePrepareFunction: (cell: any, row: Activity) => {
          return `<span class="date">${row.start_date}~${row.end_date}</span>`;
        },
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

  ngOnInit(): void {
  }

  reset() {
    this.params.filter = { tagId: '', status: '' };
  }

  submit() {

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

  ngOnInit() {}
}
