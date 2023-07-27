import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { DetailDialogComponent } from '@pages/customer-manage/customer-list/detail-dialog/detail.dialog.component';

@Component({
  selector: 'condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.scss']
})
export class TagConditionDialogComponent implements OnInit {

  @Input() title: string;
  @Input() dataList: FormGroup;

  //datas: CustomerList;
  constructor(
    protected ref: NbDialogRef<DetailDialogComponent>,
    ) {}

  ngOnInit() {
    // this.datas = JSON.parse(JSON.stringify(this.dataList));
     //console.info(this.dataList);
  }

  close() {
    this.ref.close();
  }

}
