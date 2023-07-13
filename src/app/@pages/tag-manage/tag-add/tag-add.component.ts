import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      setLimit: new FormControl(null, Validators.required),
    });

  }

  TagType = TagType;
  SetCondition = TagSetCondition;
  Status = Status;

  filterList: Array<{ key: string; val: string }> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{ key: string; val: string }> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }));
  //預設構面
  categoryList: Array<{ key: string; val: string }> = Object.entries(TagDimension).map(([k, v]) => ({ key: k, val: v }))
  subCategoryList: Array<{ key: string; val: string }> = Object.entries(TagSubDimension).map(([k, v]) => ({ key: k, val: v }))

  err: boolean = false;

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['pages', 'tag-manage', 'tag-list']);
  }

  preview() {
  }

  submit() {
  }

}
