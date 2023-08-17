import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox *ngIf="showCheckbox()" status="info" [checked]="settings?.isChecked" (change)="onCheckboxChange()"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
  @Input() settings: {
    isChecked?: boolean;
    isShowParam?: { key: string; answer: string[] };
    isCheckedParam?: { key: string };
    isSelectedName?: string;
    rowIdName?: string;
    selectedRows?: any[];
  };
  @Input() rowData: any;
  @Output() emitter = new EventEmitter();

  ngOnInit() {
    this.initializeCheckboxState();
  }

  showCheckbox(): boolean {
    const isShowParam = this.settings?.isShowParam;//是否要顯示CheckBox框
    return isShowParam?.answer && isShowParam.answer.some(answer => answer.toLowerCase() === this.rowData[isShowParam.key]?.toLowerCase());
  }

  initializeCheckboxState() {
    const isCheckedParam = this.settings?.isCheckedParam;//是顯示勾選
    const selectedRows = this.settings?.selectedRows;//顯示暫存被勾選項目
    const isSelectedName = this.settings?.isSelectedName;//Model中存放Check點選的欄位
    const rowIdName = this.settings?.rowIdName;//Id名稱


    if (isCheckedParam?.key) {
      this.settings.isChecked = !!this.rowData[isCheckedParam.key];
    }

    if (selectedRows?.length > 0 && selectedRows.find(f => f.rowId === this.rowData[rowIdName])) {
      this.settings.isChecked = true;
    }

    if (isSelectedName) {
      this.rowData[isSelectedName] = this.settings?.isChecked;
    }
  }

  onCheckboxChange() {
    const isSelectedName = this.settings?.isSelectedName;
    if (isSelectedName) {
      this.rowData[isSelectedName] = !this.rowData[isSelectedName];
    }

    this.emitter.emit(this.rowData);
  }
}
