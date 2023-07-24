import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Frequency, Status } from '@common/enums/common-enum';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'schedule-activity-set',
  templateUrl: './schedule-activity-set.component.html',
  styleUrls: ['./schedule-activity-set.component.scss']
})
export class ScheduleAddComponent extends BaseComponent implements OnInit {
  Status = Status;
  Frequency = Frequency;

  err: boolean = false;
  params: any;//路由參數
  actionName: string;// 新增/編輯/複製

  //下拉時間日期
  daily: number[] = Array.from({ length: 31 }, (_, index) => index + 1);
  hour: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  minute: number[] = Array.from({ length: 60 }, (_, index) => index + 1);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();

    this.validateForm = new FormGroup({
      scheduleName: new FormControl(null, Validators.required),
      status:new FormControl('active', Validators.required),
      frequency:new FormControl('daily', Validators.required),
      daily:new FormControl(null, Validators.required),
      hour:new FormControl(null, Validators.required),
      minute:new FormControl(null, Validators.required),
      scheduleFilePath:new FormControl(null, Validators.required),
    });

    this.params = this.activatedRoute.snapshot.params;
    const changeRouteName = this.params['changeRoute'] ?? "";
    this.actionName = this.getActionName(changeRouteName);

  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['pages', 'schedule-manage', 'schedule-activity-list']);
  }

  submit() {

  }

}
