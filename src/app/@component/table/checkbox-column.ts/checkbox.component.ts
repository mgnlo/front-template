import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox *ngIf="shouldShowCheckbox()" status="info" [checked]="isChecked" (change)="onCheckboxChange()"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
  @Input() isShow: boolean;
  @Input() isChecked: boolean;
  @Input() value: any;
  @Input() rowData: any;
  @Output() emitter = new EventEmitter();

  ngOnInit() {
    this.initializeCheckboxState();
  }

  shouldShowCheckbox(): boolean {
    const isShowParam = this.value?.isShowParam;//是否要顯示CheckBox框
    return isShowParam?.answer && isShowParam.answer.some(answer => answer.toLowerCase() === this.rowData[isShowParam.key]?.toLowerCase());
  }

  initializeCheckboxState() {
    const isCheckedParam = this.value?.isCheckedParam;//是顯示勾選
    const selectedRows = this.value?.selectedRows;//顯示暫存被勾選項目
    const isSelectedName = this.value?.isSelectedName;//Model中存放Check點選的欄位
    const rowIdName = this.value?.rowIdName;//Id名稱


    if (isCheckedParam?.key) {
      this.isChecked = !!this.rowData[isCheckedParam.key];
    }

    if (selectedRows?.length > 0 && selectedRows.find(f => f.rowId === this.rowData[rowIdName])) {
      this.isChecked = true;
    }

    if (isSelectedName) {
      this.rowData[isSelectedName] = this.isChecked;
    }
  }

  onCheckboxChange() {
    const isSelectedName = this.value?.isSelectedName;
    if (isSelectedName) {
      this.rowData[isSelectedName] = !this.rowData[isSelectedName];
    }

    this.emitter.emit(this.rowData);
  }
}
