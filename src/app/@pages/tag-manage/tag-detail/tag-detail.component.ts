import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitySetting } from '@api/models/activity-list.model';
import { TagDetailView, TagSetting } from '@api/models/tag-manage.model';
import { Status } from '@common/enums/common-enum';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { CommonUtil } from '@common/utils/common-util';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent extends BaseComponent implements OnInit {
  detail: TagDetailView;
  checkData: TagSetting;
  mockData: Array<ActivitySetting> = ActivityListMock;

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  fileName:string = "";

  constructor(private router: Router) {
    super();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!!currentNavigation?.extras) {
      const state = currentNavigation.extras.state;
      const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', state as TagSetting); // 異動歷程處理
      if (!!processedData) {
        this.isHistoryOpen = processedData.isHistoryOpen;
        this.detail = processedData.detail;
      }
      else{
        //之後可能加導頁pop-up提醒
        this.router.navigate(['pages', 'tag-manage', 'tag-list']);
      }
    }
    //取得檔案名稱
    if(!!this.detail.filePath){
      this.fileName = this.detail.filePath.split('/').pop();
    }

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
      department: {
        title: '所屬單位',
        type: 'string',
        class: 'col-2',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        class: 'col-1',
        sort: false,
      },
      status: {
        title: '狀態',
        type: 'string',
        class: 'col-1',
        valuePrepareFunction: (cell:string) => {
          return Status[cell];
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
      },
    },
    hideSubHeader: false, //起訖日查詢要用到
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.mockData = this.mockData.map(mock => {
      return {...mock, during:`${mock.startDate}~${mock.endDate}`} //起訖日查詢篩選要用到
    })
    this.dataSource.load(this.mockData);
  }

  edit() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set', 'edit', this.detail.tagId], { state: this.detail });
  }

  copy() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set', 'copy', this.detail.tagId], { state: this.detail });
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

}
