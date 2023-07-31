import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivitySetting } from '@api/models/activity-list.model';
import { NbDialogRef } from '@nebular/theme';
import { BaseComponent } from '@pages/base.component';

@Component({
  selector: 'preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent extends BaseComponent implements OnInit {

  @Input() title: string;
  @Input() dataList: Array<ActivitySetting>;

  constructor(private ref: NbDialogRef<PreviewDialogComponent>) {
    super();
    this.validateForm = new FormGroup({
      //listLimit: new FormControl('150', Validators.required),
    });
  }

  ngOnInit() {
  }

  close() {
    this.ref.close();
  }
}
