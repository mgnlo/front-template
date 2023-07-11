import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export class ConfirmDialogOption {
  title?: string;
  content?: string;
  leftButtonName?: string;
  midButtonName?: string;
  rightButtonName?: string;
  leftCallback?: Function;
  midCallback?: Function;
  rightCallback?: Function;
  isCloseBtn?: boolean;
}

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {

  @Input() option: ConfirmDialogOption;

  constructor(protected ref: NbDialogRef<ConfirmDialogComponent>) {}

  ngOnInit() {
    if (!this.option['leftButtonName']) {
      this.option['leftButtonName'] = '取消';
      // default dialog
    }
    if (!this.option['leftButtonName']) {
      this.option['leftButtonName'] = '取消';
    }
    if (!this.option['rightButtonName']) {
      this.option['rightButtonName'] = '確認';
    }
    if (!this.option['leftCallback']) {
      this.option['leftCallback'] = () => { this.ref.close(); };
    } else {
      const leftFunction = this.option['leftCallback'];
      this.option['leftCallback'] = () => { leftFunction(); this.ref.close(); };
    }
    if (!this.option['midCallback']) {
      this.option['midCallback'] = () => { this.ref.close(); };
    } else {
      const midFunction = this.option['midCallback'];
      this.option['midCallback'] = () => { midFunction(); this.ref.close(); };
    }
    if (!this.option['rightCallback']) {
      this.option['rightCallback'] = () => { this.ref.close(); };
    } else {
      const rightFunction = this.option['rightCallback'];
      this.option['rightCallback'] = () => { rightFunction(); this.ref.close(); };
    }
    if (this.option['isCloseBtn'] === undefined) {
      this.option['isCloseBtn'] = true;
    }
  }

  close() {
    this.ref.close();
  }
}
