import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagDimension, TagSetCondition, TagSubDimension, TagType } from '@common/enums/tag-enum';
import { TagSetting, TagDetailView } from '@api/models/tag-list.model';
import { Filter, Status, Schedule } from '@common/enums/common-enum';
import { RegExpEnum } from '@common/enums/reg-exp-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';

@Component({
  selector: 'tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
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

  detail: TagDetailView;
  fileName: string;
  isFile: boolean = true;//是否上傳檔案
  err: boolean = false;
  params: any;//路由參數
  // maxSizeInMB = 5;//檔案大小
  // isFileSize = false;//檔案大小是否錯誤

  isHistoryOpen: { [x: number]: boolean } = []; //異動歷程收合

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, Validators.required),
      status: new FormControl('active', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      setCondition: new FormControl('normal', Validators.required),
      uploadFile: new FormControl(null, Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), Validators.required),
      tagDimension: new FormControl(null, Validators.required),
      tagSubDimension: new FormControl(null, Validators.required),
      scheduleSettings: new FormControl(null, Validators.required),
      tagDescription: new FormControl(null),
      conditionSettingQuery: new FormControl(null, Validators.required),
    }, [ValidatorsUtil.dateRange]);

    this.params = this.activatedRoute.snapshot.params;
    this.changeTagType(this.validateForm.get('tagType').value)
    if (!!this.router.getCurrentNavigation().extras) {
      let checkData = this.router.getCurrentNavigation().extras.state as TagSetting;
      if (!checkData) return
      if (this.params['changeRoute'] === 'edit') {
        this.detail = JSON.parse(JSON.stringify(checkData));
        this.detail.historyGroupView = {};
        checkData.tagReviewHistory.forEach(history => {
          if (!this.detail.historyGroupView || !this.detail.historyGroupView[history.groupId]) {
            this.isHistoryOpen[history.groupId] = true;
            this.detail.historyGroupView[history.groupId] = {
              type: history.type,
              flows: [{ time: history.time, title: history.title, detail: history.detail }]
            };
          } else {
            this.detail.historyGroupView[history.groupId].flows.push({ time: history.time, title: history.title, detail: history.detail });
          }
        });
      }

      if (!!checkData) {
        Object.keys(checkData).forEach(key => {
          if (!!this.validateForm.controls[key]) {
            switch (key) {
              case 'startDate':
              case 'endDate':
                this.validateForm.controls[key].setValue(new Date(checkData[key]))
                break;
              default:
                this.validateForm.controls[key].setValue(checkData[key]);
                break;
            }
          }
        })
      }
    }
    this.changeTagType(this.validateForm.get('tagType').value)

  }

  //檔案判斷(白名單)
  // static isPassFile(file: File): boolean {
  //   const allowedTypes = ['text/csv'];
  //   var aa = allowedTypes.includes(file.type);
  //   debugger
  //   return allowedTypes.includes(file.type);
  // }

  ngOnInit(): void {
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
  }

  removeField(fieldName: string) {
    this.validateForm.removeControl(fieldName);
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

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  submit() {
  }

}
