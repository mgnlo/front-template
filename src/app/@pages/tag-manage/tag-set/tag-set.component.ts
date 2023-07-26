import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagDimension, TagSetCondition, TagSubDimension, TagType } from '@common/enums/tag-enum';
import { TagSetting, TagDetailView } from '@api/models/tag-manage.model';
import { Filter, Status, Schedule, MathSymbol } from '@common/enums/common-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { CommonUtil } from '@common/utils/common-util';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivitySetting } from '@api/models/activity-list.model';
import { ActivityListMock } from '@common/mock-data/activity-list-mock';
import { DialogService } from '@api/services/dialog.service';
import { TagConditionDialogComponent } from './condition-dialog/condition-dialog.component';

@Component({
  selector: 'tag-set',
  templateUrl: './tag-set.component.html',
  styleUrls: ['./tag-set.component.scss']
})
export class TagAddComponent extends BaseComponent implements OnInit {
  TagType = TagType;
  SetCondition = TagSetCondition;
  Status = Status;

  filterList: Array<{ key: string; val: string }> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{ key: string; val: string }> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }));
  //預設構面
  categoryList: Array<{ key: string; val: string }> = Object.entries(TagDimension).map(([k, v]) => ({ key: k, val: v }))
  subCategoryList: Array<{ key: string; val: string }> = Object.entries(TagSubDimension).map(([k, v]) => ({ key: k, val: v }))

  //預設數學符號
  tagMathSymbolList = [MathSymbol.$gt, MathSymbol.$lt, MathSymbol.$eq];
  mathSymbolList: Array<{ key: string; val: string }> = Object.entries(MathSymbol)
    .filter(([k, v]) => {
      return this.tagMathSymbolList.includes(v);
    }).map(([k, v]) => ({ key: k, val: v }));

  //預設標籤類型
  tagTypeList: Array<{ key: string; val: string }> = Object.entries(TagType).map(([k, v]) => ({ key: k, val: v }))

  //預設檔案存放地方
  condition_valueList: Array<{ key: string; val: string }> = [{ key: 'condition_A', val: '近三個月_基金_申購金額' }, { key: 'condition_B', val: '假資料B' }, { key: 'condition_C', val: '假資料C' }];


  detail: TagDetailView;
  fileName: string;
  isFile: boolean = true;//是否上傳檔案
  params: any = [];//路由參數
  actionName: string;// 新增/編輯/複製

  mockData: Array<ActivitySetting> = ActivityListMock;

  // maxSizeInMB = 5;//檔案大小
  // isFileSize = false;//檔案大小是否錯誤

  isHistoryOpen: { [x: number]: boolean } = {}; //異動歷程收合

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService) {
    super();
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, Validators.required),
      status: new FormControl('enabled', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      setCondition: new FormControl('normal', Validators.required),
      uploadFile: new FormControl(null, Validators.required),
      startDate: new FormControl(new Date(), ValidatorsUtil.dateFmt),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), ValidatorsUtil.dateFmt),
      tagDimension: new FormControl(null, Validators.required),
      tagSubDimension: new FormControl(null, Validators.required),
      scheduleSettings: new FormControl(null, Validators.required),
      tagDescription: new FormControl(null),
      condition_value: new FormControl(null, Validators.required),
      conditionSettingQuery: new FormArray([
        new FormGroup({
          id: new FormControl(0),
          detection_condition0: new FormControl(null, Validators.required),
          threshold_value0: new FormControl(null, [Validators.required,ValidatorsUtil.number]),
          //C1: new FormControl(null, Validators.required),
        }),
      ]),
    }, [ValidatorsUtil.dateRange]);

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);
    const getRawValue = this.validateForm.getRawValue();

    this.changeTagType(getRawValue.tagType)

    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (!!state) {
      const processedData = CommonUtil.getHistoryProcessData<TagSetting>('tagReviewHistory', state as TagSetting); // 異動歷程處理
      Object.keys(state).forEach(key => {
        if (!!this.validateForm.controls[key]) {
          switch (key) {
            case 'startDate':
            case 'endDate':
              this.validateForm.controls[key].setValue(new Date(state[key]))
              break;
            case 'conditionSettingQuery':
              this.conditions.removeAt(0);
              //這裡要改呀呀呀
              this.conditions.push(new FormGroup({
                id: new FormControl(0),
                ['detection_condition' + 0]: new FormControl(null, Validators.required),
                ['threshold_value' + 0]: new FormControl(null, Validators.required)
              }));
              // let groupData = CommonUtil.groupBy(editData[key], 'tagGroup');
              // Object.keys(groupData).forEach(key => {
              //   let fg = new FormGroup({});
              //   let condition = groupData[key] as Array<ActivityListCondition>;
              //   condition.forEach(con => {
              //     fg.setControl(con.tagKey.replace('tag-', ''), new FormControl(con.tagName, Validators.required));
              //   });
              //   this.conditions.push(fg);
              // })
              break;
            default:
              this.validateForm.controls[key].setValue(state[key]);
              break;
          }
        }
      })
      if (!!processedData) {
        if (changeRouteName === 'edit') {
          this.isHistoryOpen = processedData.isHistoryOpen;
          this.detail = processedData.detail;
        }
      }
      else {
        //之後可能加導頁pop-up提醒
        this.router.navigate(['pages', 'tag-manage', 'tag-list']);
      }
    }

    this.changeTagType(getRawValue.tagType)

  }

  //檔案判斷(白名單)
  // static isPassFile(file: File): boolean {
  //   const allowedTypes = ['text/csv'];
  //   var aa = allowedTypes.includes(file.type);
  //   debugger
  //   return allowedTypes.includes(file.type);
  // }

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
        valuePrepareFunction: (cell: string) => {
          return `<p class="left">${cell}</p>`;
        },
      },
      activityDescription: {
        title: '活動說明',
        type: 'html',
        class: 'col-3 left',
        sort: false,
        valuePrepareFunction: (cell: string) => {
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
        valuePrepareFunction: (cell: string) => {
          return Status[cell];
        },
        sort: false,
      },
      during: {
        title: '起訖時間',
        type: 'html',
        class: 'col-3',
        valuePrepareFunction: (cell: any) => {
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
      return { ...mock, during: `${mock.startDate}~${mock.endDate}` } //起訖日查詢篩選要用到
    })
    this.dataSource.load(this.mockData);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  //標籤類型 更動時切換驗證
  changeTagType(key: string) {
    this.isFile = true;
    this.fileName = '';
    if (key === 'normal') {
      if (!this.validateForm.contains('setCondition')) {
        this.addField('setCondition', 'normal', Validators.required);
      }
      if (this.validateForm.contains('uploadFile')) {
        this.removeField('uploadFile');
      }
    }

    if (key === 'document') {
      if (!this.validateForm.contains('uploadFile')) {
        this.addField('uploadFile', null, Validators.required);
      }
      if (this.validateForm.contains('setCondition')) {
        this.removeField('setCondition');
      }
      //this.addField('uploadFile', null, [Validators.required,this.validateFileType]);
    }

  }

  addField(fieldName: string, formState: any, fileFormatValidator: any) {
    this.validateForm.addControl(fieldName, new FormControl(formState, fileFormatValidator));
    //this.validateForm.controls[fieldName].updateValueAndValidity();
  }

  removeField(fieldName: string) {
    this.validateForm.removeControl(fieldName);
  }

  or(action: 'add' | 'remove', index: number) {
    if (action === 'add') {
      while (this.conditions.controls.filter(f => f.value.id === index).length > 0) {
        index = index + 1
      }
      this.conditions.push(new FormGroup({
        id: new FormControl(index),
        ['detection_condition' + index]: new FormControl(null, Validators.required),
        ['threshold_value' + index]: new FormControl(null, Validators.required)
      }));
      //最後一個選單前加入其餘欄位驗證
      for (let i = 0; i < this.conditions.length - 1; i++) {
        if (Object.keys(this.conditions.controls[i]?.value).length === 3) {
          this.and('add', 'selectedRadio', this.conditions.controls[i].get('id').value, i)
        }
      }
    } else {
      this.conditions.removeAt(index);
    }

    //console.info('or', this.conditions.getRawValue())
  }

  and(action: 'add' | 'remove', key: string, id: number, index: number) {
    let fg = this.conditions.at(index) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key + id}`, new FormControl(null, Validators.required));
    } else {
      fg.removeControl(`${key}`);
    }
    //console.info('and', this.conditions.getRawValue())
  }


  get conditions(): FormArray {
    return this.validateForm.get('conditionSettingQuery') as FormArray
  }

  uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isFile = true;
      this.fileName = file.name;
      //this.validateFileSize(event, this.maxSizeInMB)
      //this.validateForm.updateValueAndValidity();
      // const uploadFile = this.validateForm.get('uploadFile');
      // const uploadFile_Form = uploadFile as FormControl;

      // if (!TagAddComponent.isPassFile(file)) {
      //   this.isFile = false;
      // }
    }
  }

  //檔案大小限制
  // validateFileSize(event: any, maxSizeInMB: number) {
  //   const file = event.target.files[0];
  //   const maxSize = maxSizeInMB * 1024 * 1024; // MB
  //   if (file && file.size < maxSize) {
  //     this.isFileSize = true;
  //   } else {
  //     this.isFileSize = false;
  //   }
  // }

  // validateFileSize(control: AbstractControl) {
  //   const file = control.value;
  //   const maxSize = 5 * 1024 * 1024; // 5MB
  //   if (file && file.size > maxSize) {
  //     return { maxSize: true };
  //   }
  //   return null;
  // }

  //檔案限制(副檔名)
  // validateFileType(control: AbstractControl): { [key: string]: boolean } | null {
  //   const file: File = control.value;
  //   if (file && !TagAddComponent.isPassFile(file)) {
  //     return { invalidFormat: true };
  //   }
  //   return null;
  // }

  conditionDialog() {
    this.dialogService.open(TagConditionDialogComponent, {
      title: '條件分佈級距',
      dataList: this.validateForm,
    });
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  submit() {
  }

}
