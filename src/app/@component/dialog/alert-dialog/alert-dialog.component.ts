import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export class AlertDialogOption {
  title?: string;
  content?: string;
  buttonName?: string;
  callback?: Function;
  hasCloseButton?: boolean;
}

@Component({
  selector: 'ngx-alert-dialog',
  templateUrl: 'alert-dialog.component.html',
  styleUrls: [],
})
export class AlertDialogComponent implements OnInit {

  @Input() option: AlertDialogOption;

  constructor(protected ref: NbDialogRef<AlertDialogComponent>) {}

  ngOnInit() {

    if (!this.option['buttonName']) {
      this.option['buttonName'] = '確認';
      // default dialog
    }
    if (!this.option['buttonName']) {
      this.option['buttonName'] = '確認';
    }
    if (!this.option['callback']) {
      this.option['callback'] = () => { this.ref.close(); };
    } else {
      const thisFunction = this.option['callback'];
      this.option['callback'] = () => { thisFunction(); this.ref.close(); };
    }
    if (this.option['hasCloseButton'] === undefined) {
      this.option['hasCloseButton'] = true;
    }
  }

  close() {
    this.ref.close();
  }
}
