import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule, Status } from '@common/enums/activity-list-enum';
import { BaseComponent } from '@pages/base.component';


@Component({
  selector: 'activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss'],
})
export class ActivityAddComponent extends BaseComponent implements OnInit {

  constructor(private router: Router) {
    super();
  }

  statusList: Array<{key: string; val: string}> = Object.entries(Status).map(([k, v]) => ({ key: k, val: v }))
  scheduleList: Array<{key: string; val: string}> = Object.entries(Schedule).map(([k, v]) => ({ key: k, val: v }))

  public ngOnInit(): void {
  }

  ngDoCheck() { }

  filter(field: string, search: any): void {
    if (typeof search === 'number') {
      search = search.toString(10);
    }

  }

  cancel() {
    this.router.navigate(['pages', 'user-manage', 'activity-list']);
  }

  preview() {
  }

  submit() {
  }
}
