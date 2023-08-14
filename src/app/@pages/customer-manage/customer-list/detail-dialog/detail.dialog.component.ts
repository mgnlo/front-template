import { Component, Input, OnInit } from '@angular/core';
import { CustomerList } from '@api/models/customer-list.model';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.dialog.component.html',
  styleUrls: [],
  providers: [],
})
export class DetailDialogComponent implements OnInit {

  @Input() title: string;
  @Input() dataList: Array<string>;

  datas: CustomerList;
  constructor(
    protected ref: NbDialogRef<DetailDialogComponent>,
    ) {}

  ngOnInit() {
    this.datas = JSON.parse(JSON.stringify(this.dataList));
    console.info(this.datas);
  }

  close() {
    this.ref.close();
  }
}
