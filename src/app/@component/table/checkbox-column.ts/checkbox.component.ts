import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox *ngIf="showCheckbox()" status="info" [checked]="settings?.isChecked" (change)="onCheckboxChange($event)" [disabled]="settings?.disable"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
  @Input() settings: {
    isChecked?: boolean;
    disable?: boolean;
    isShowParam?: { key: string; answer?: string[] };
    isCheckedParam?: { key: string };
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
    let isShow = !isShowParam.answer && !!isShowParam.key ? this.rowData.hasOwnProperty(isShowParam.key) :
      isShowParam?.answer && isShowParam.answer.some(answer => answer?.toLowerCase() === this.rowData[isShowParam.key]?.toLowerCase());
    this.rowData['isShow'] = isShow;
    return isShow;
  }

  initializeCheckboxState() {
    const isCheckedParam = this.settings?.isCheckedParam;//是顯示勾選
    const selectedRows = this.settings?.selectedRows;//顯示暫存被勾選項目
    const rowIdName = this.settings?.rowIdName;//Id名稱


    if (isCheckedParam?.key) {
      this.settings.isChecked = !!this.rowData[isCheckedParam.key];
    }

    if (selectedRows?.length > 0 && selectedRows.find(f => f.rowId === this.rowData[rowIdName])) {
      this.settings.isChecked = true;
    }

    this.rowData['isSelected'] = this.settings?.isChecked;
  }

  onCheckboxChange(event) {
    this.rowData['isSelected'] = event.target.checked;
    this.rowData['isChecked'] = event.target.checked;
    this.emitter.emit(this.rowData);
  }
}
