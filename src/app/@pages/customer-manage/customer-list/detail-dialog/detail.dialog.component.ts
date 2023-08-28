import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '@api/models/customer-list.model';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.dialog.component.html',
  styleUrls: [],
  providers: [],
})
export class DetailDialogComponent implements OnInit {

  @Input() title: string;
  @Input() datas: Customer;

  departmentList: Array<string>;

  constructor(
    protected ref: NbDialogRef<DetailDialogComponent>,
    ) {}

  ngOnInit() {
    this.departmentList = this.datas.tagSetting.map(tag => tag.department)
  }

  close() {
    this.ref.close();
  }
}
