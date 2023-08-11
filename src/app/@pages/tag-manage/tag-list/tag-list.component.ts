import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagSetting } from '@api/models/tag-manage.model';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { TagType } from '@common/enums/tag-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import { TagManageService } from '../tag-manage.service';
import { Ng2SmartTableService, SearchInfo } from '@api/services/ng2-smart-table-service';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends BaseComponent implements OnInit {
  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  TagType: TagType

  constructor(
    storageService: StorageService,
    private router: Router,
    private tagManageService: TagManageService,
    private activatedRoute: ActivatedRoute,
    private tableService: Ng2SmartTableService,
  ) {
    super(storageService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);
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
        class: 'left',
        width: '20%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false
      },
      tagType: {
        title: '類型',
        type: 'string',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          return `${TagType[cell]}`;
        },
      },
      department: {
        title: '所屬單位',
        type: 'string',
        width: '15%',
        sort: false,
      },
      owner: {
        title: '負責人',
        type: 'string',
        width: '3%',
        sort: false,
      },
      tagDescription: {
        title: '說明',
        type: 'html',
        class: 'left',
        width: '39%',
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
        sort: false,
      },
      startDate: {
        title: '起始時間',
        type: 'html',
        sort: false,
        hide: true
      },
      endDate: {
        title: '結束時間',
        type: 'html',
        sort: false,
        hide: true
      },
      modificationTime: {
        title: '異動時間',
        type: 'html',
        width: '10%',
        sort: false,
        valuePrepareFunction: (cell: string) => {
          const datepipe: DatePipe = new DatePipe('en-US');
          return `<p class="date">${datepipe.transform(cell, this.dateFormat)}</p>`;
        },
      },
      status: {
        title: '狀態',
        type: 'string',
        width: '5%',
        class: 'alignCenter',
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      action: {
        title: '查看',
        type: 'custom',
        width: '1%',
        valuePrepareFunction: (cell, row: TagSetting) => row,
        renderComponent: DetailButtonComponent,
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
    this.search();
  }

  ngOnDestroy(): void {
    let sessionData = { page: this.paginator.nowPage, filter: this.validateForm.getRawValue() };
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  search() {
    let searchInfo: SearchInfo = {
      apiUrl: this.tagManageService.tagFunc,
      nowPage: this.paginator.nowPage,
      filters: this.validateForm.getRawValue()
    }
    this.restDataSource = this.tableService.searchData(searchInfo);
  }

  reset() {
    this.validateForm.reset({ tagName: '', status: '', startDate: null, endDate: null, });
    this.search();
  }

  add() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set']);
  }

}

