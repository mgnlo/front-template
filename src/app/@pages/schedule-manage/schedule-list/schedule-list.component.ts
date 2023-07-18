import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleManageService } from '../schedule-manage.service';
import { BaseComponent } from '@pages/base.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent extends BaseComponent implements OnInit {

  constructor(
    private scheduleManageService: ScheduleManageService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new LocalDataSource();
    //this.dataSource.load(this.mockData);
  }

}
