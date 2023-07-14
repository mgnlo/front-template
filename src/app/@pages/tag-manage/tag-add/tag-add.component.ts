import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filter, Status, Schedule } from '@common/enums/common-enum';
import { TagType, TagSetCondition, TagDimension, TagSubDimension } from '@common/enums/tag-enum';
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

  fileName: string;
  isFile: boolean = true;//是否上傳檔案
  err: boolean = false;
  // maxSizeInMB = 5;//檔案大小
  // isFileSize = false;//檔案大小是否錯誤

  constructor(private router: Router) {
    super();
    this.validateForm = new FormGroup({
      tagName: new FormControl(null, Validators.required),
      status: new FormControl('active', Validators.required),
      tagType: new FormControl('normal', Validators.required),
      setCondition: new FormControl('normal', Validators.required),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), Validators.required),
      tagDimension: new FormControl(null, Validators.required),
      tagSubDimension: new FormControl(null, Validators.required),
      scheduleSettings: new FormControl(null, Validators.required),
      tagDescription: new FormControl(null),
      setLimit: new FormControl(null, Validators.required),
    });

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
      this.removeField('uploadFile');
      this.addField('setCondition', 'normal', [Validators.required]);
    } else if (key === 'document') {
      this.removeField('setCondition');
      this.addField('uploadFile', null, [Validators.required]);
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
