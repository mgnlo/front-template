import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Filter, Status, Schedule } from '@common/enums/commom-enum';
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

  constructor(private router: Router, private formBuilder: FormBuilder) {
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
  static isPassFile(file: File): boolean {
    const allowedFormats = ['csv'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    return allowedFormats.includes(fileExt);
  }

  ngOnInit(): void {
  }

  //標籤類型 更動時切換驗證
  changeTagType() {
    this.isFile = true;
    this.fileName = '';
    const tagType = this.validateForm.get('tagType').value;

    if (tagType === 'normal') {
      this.addField('uploadFile', null, [Validators.required, this.fileFormatValidator]);
      this.removeField('setCondition');
    } else if (tagType === 'document') {
      this.addField('setCondition', 'normal', [Validators.required]);
      this.removeField('uploadFile');
    }
  }

  addField(fieldName: string, formState, fileFormatValidator) {
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

      if (!TagAddComponent.isPassFile(file)) {
        this.isFile = false;
      }
    }
  }

  fileFormatValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file: File = control.value;
    if (file && !TagAddComponent.isPassFile(file)) {
      return { invalidFormat: true };
    }
    return null;
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  submit() {
  }

}
