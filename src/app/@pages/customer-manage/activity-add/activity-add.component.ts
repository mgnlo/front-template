import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityListCondition, ActivitySetting } from '@api/models/activity-list.model';
import { DialogService } from '@api/services/dialog.service';
import { Filter, Schedule } from '@common/enums/common-enum';
import { RegExp } from '@common/enums/reg-exp-enum';
import { ValidatorsUtil } from '@common/utils/validators-util';
import { BaseComponent } from '@pages/base.component';
import * as moment from 'moment';
import { PreviewDialogComponent } from './preview-dialog/preview.dialog.component';

@Component({
  selector: 'activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss'],
})
export class ActivityAddComponent extends BaseComponent implements OnInit {

  filterList: Array<{key: string; val: string}> = Object.entries(Filter).map(([k, v]) => ({ key: k, val: v }));
  scheduleList: Array<{key: string; val: string}> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }));

  constructor(private router: Router, private dialogService: DialogService) {
    super();

    this.validateForm = new FormGroup({
      activityName: new FormControl(null, Validators.required),
      status: new FormControl('stop', Validators.required),
      listLimit: new FormControl(null, Validators.pattern(RegExp.integer)),
      filterOptions: new FormControl(false),
      startDate: new FormControl(new Date(), Validators.required),
      endDate: new FormControl(moment(new Date()).add(3, 'months').toDate(), Validators.required),
      scheduleSettings: new FormControl(null, Validators.required),
      activityDescription: new FormControl(null),
      activityListCondition: new FormArray([
        new FormGroup({
            1: new FormControl(null, Validators.required)
        })
      ], Validators.required),
    }, ValidatorsUtil.dateRange);

    if(!!this.router.getCurrentNavigation().extras){
      let editData = this.router.getCurrentNavigation().extras.state as ActivitySetting;
      if(!!editData){
        Object.keys(editData).forEach(key => {
          if(!!this.validateForm.controls[key]){
            switch (key) {
              case 'startDate':
              case 'endDate':
                this.validateForm.controls[key].setValue(new Date(editData[key]))
                break;
              case 'activityListCondition':
                this.conditions.removeAt(0);
                let groupData = this.groupBy(editData[key], 'tagGroup');
                Object.keys(groupData).forEach(key => {
                  let fg = new FormGroup({});
                  let condition = groupData[key] as Array<ActivityListCondition>;
                  condition.forEach(con => {
                    fg.setControl(con.tagKey.replace('tag-',''), new FormControl(con.tagName, Validators.required));
                  });
                  this.conditions.push(fg);
                })
                break;
              default:
                this.validateForm.controls[key].setValue(editData[key]);
                break;
            }
          }
        })
      }
    }
  }

  ngDoCheck() {
  }

  or(action: 'add' | 'remove', key: number) {
    if(action === 'add') {
      let ctlName = !!key ? key++ : 1;
      this.conditions.push(new FormGroup({
        [ctlName]: new FormControl(null, Validators.required)
      }));
    } else {
      this.conditions.removeAt(key)
    }
    // console.info('or', this.conditions.getRawValue())
  }

  and(i: number, action: 'add' | 'remove', key: number) {
    let fg = this.conditions.at(i) as FormGroup;
    if (action === 'add') {
      fg.setControl(`${key+1}`, new FormControl(null, Validators.required));
    } else {
      fg.removeControl(`${key}`);
    }
    // console.info('and', this.conditions.getRawValue())
  }

  get conditions() : FormArray {
    return this.validateForm.get('activityListCondition') as FormArray
  }

  err: boolean = false;
  public ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['pages', 'customer-manage', 'activity-list']);
  }

  preview() {
    this.dialogService.open(PreviewDialogComponent, {
      dataList: this.validateForm.getRawValue()
    });
  }

  submit() {
  }
}
