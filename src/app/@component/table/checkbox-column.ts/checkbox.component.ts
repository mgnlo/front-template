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
    const isShowParam = this.value?.isShowParam;
    return isShowParam?.answer && isShowParam.answer.some(answer => answer.toLowerCase() === this.rowData[isShowParam.key]?.toLowerCase());
  }

  initializeCheckboxState() {
    const isCheckedParam = this.value?.isCheckedParam;
    const isSelectedName = this.value?.isSelectedName;

    if (isCheckedParam?.key) {
      this.isChecked = !!this.rowData[isCheckedParam.key];
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
