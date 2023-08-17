import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox *ngIf="isShow" status="info" [checked]="isChecked" (change)="onCheckboxChange()"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
  @Input() isShow: boolean;       //是否顯示
  @Input() isChecked: boolean;    //是否勾選
  @Input() value: any;            //外部參數
  @Input() rowData: any;          //回傳資料
  @Output() emitter = new EventEmitter();


  onCheckboxChange() {
    if (!!this.value?.isSelectedName) {
      this.rowData[this.value.isSelectedName] = !this.isChecked;
    }
    this.emitter.emit(this.rowData);
  }

  ngOnInit() {
    const row = this.rowData;

    const isShowParam = this.value?.isShowParam;
    this.isShow = isShowParam?.answer && row?.[isShowParam?.key] &&
      isShowParam?.answer?.some(answer => answer?.toLowerCase() === row?.[isShowParam?.key]?.toLowerCase()) ? true : false;

    const isCheckedParam = this.value?.isCheckedParam;
    this.isChecked = isCheckedParam?.key && row?.[isCheckedParam?.key] ? true : false;
  }
}

