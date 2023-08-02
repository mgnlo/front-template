import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagSetting } from '@api/models/tag-manage.model';
import { StorageService } from '@api/services/storage.service';
import { Status } from '@common/enums/common-enum';
import { TagType } from '@common/enums/tag-enum';
import { TagSettingMock } from '@common/mock-data/tag-list-mock';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { DetailButtonComponent } from '@component/table/detail-button/detail-button.component';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { TagManageService } from '../tag-manage.service';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent extends BaseComponent implements OnInit {
  constructor(
    storageService: StorageService,
    private router: Router,
    private tagManageService: TagManageService,
    private activatedRoute: ActivatedRoute,) {
    super(storageService);
    this.validateForm = new FormGroup({
      tagName: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(null, ValidatorsUtil.dateFmt),
      endDate: new FormControl(null, ValidatorsUtil.dateFmt),
    }, [ValidatorsUtil.dateRange]);
  }

  statusList: Array<{ key: string; val: string }> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  mockData: Array<TagSetting> = TagSettingMock;
  sessionKey: string = this.activatedRoute.snapshot.routeConfig.path;

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    this.dataSource.load(this.mockData);
    //get session filter
    this.storageService.getSessionFilter(this.sessionKey, this.validateForm).subscribe((res) => {
      if (res === true) { this.search(); }
    });
  }

  ngOnDestroy(): void {
    let sessionData = {page: this.paginator.nowPage, filter: this.validateForm.getRawValue()};
    this.storageService.putSessionVal(this.sessionKey, sessionData);
  }

  TagType: TagType

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
        // filterFunction: (cell?: string, search?: string[]) => {
        //   let date = cell;
        //   let sDate = search[0];
        //   let eDate = search[1];
        //   let isSDate = sDate !== null;
        //   let isEDate = eDate !== null;
        //   if(
        //     (!isSDate && !isEDate) ||
        //     ((isSDate && isEDate) && (
        //       moment(date).isBetween(sDate, eDate, undefined, '[]')
        //     )) ||
        //     ((isSDate && !isEDate) && (
        //       moment(sDate).isSameOrBefore(date)
        //     )) ||
        //     ((!isSDate && isEDate) && (
        //       moment(eDate).isSameOrAfter(date)
        //     ))
        //   ){
        //     return true
        //   }  else {
        //     return false
        //   }
        // }
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

  reset() {
    this.validateForm.reset({ tagName: '', status: '', startDate: null, endDate: null, });
    this.dataSource.reset();
    console.info(this.validateForm.controls)
  }

  search() {
    this.dataSource.reset();
    const getForm = this.validateForm.getRawValue();
    const startDate = getForm.startDate;
    const endDate = getForm.endDate;

    //search date
    const addDateFilter = (field: string, value: Date | null, filterFn: (value: string, searchValue: string[]) => boolean) => {
      const formatDate = value !== null ? moment(value) : null;
      if (formatDate) {
        this.dataSource.addFilter({
          field,
          filter: filterFn,
          search: [formatDate],
        });
      }
    };
    addDateFilter('startDate', startDate, (value, searchValue) => new Date(value) >= new Date(searchValue[0]));
    addDateFilter('endDate', endDate, (value, searchValue) => new Date(value) <= new Date(searchValue[0]));

    //search other
    for (const [k, v] of Object.entries(getForm).filter(([key, val]) => !key.includes('Date') && !!val)) {
      this.dataSource.addFilter({ field: k, filter: undefined, search: v });
    }
  }

  add() {
    this.router.navigate(['pages', 'tag-manage', 'tag-set']);
  }

}

