import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filter, Schedule } from '@common/enums/commom-enum';
import { BaseComponent } from '@pages/base.component';


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
      status: new FormControl(null, Validators.required),
      // listLimit: new FormControl(null),
      // filterOptions: new FormControl(null),
      // startDate: new FormControl(new Date(), Validators.required),
      // endDate: new FormControl(new Date(), Validators.required),
      // scheduleSettings: new FormControl(null, Validators.required),
      // activityDescription: new FormControl(null),
    });

  }

  filterList: Array<{key: string; val: string}> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{key: string; val: string}> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }));

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
