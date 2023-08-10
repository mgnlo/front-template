import { Component, Input } from '@angular/core';
import { TagConditionChartLine } from '@api/models/tag-manage.model';
import { NbDialogRef } from '@nebular/theme';
import { DetailDialogComponent } from '@pages/customer-manage/customer-list/detail-dialog/detail.dialog.component';

@Component({
  selector: 'condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.scss']
})
export class TagConditionDialogComponent {

  @Input() title: string;
  @Input() data: TagConditionChartLine;

  constructor(
    protected ref: NbDialogRef<DetailDialogComponent>,
  ) { }

  close() {
    this.ref.close();
  }

}
