import { Component, Input } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox *ngIf="isShow" status="info" [checked]="isChecked"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
  @Input() isShow: boolean;
  @Input() isChecked: boolean;
  @Input() value: any;

  ngOnInit() {
    const row = this.value?.row;
    const param = this.value?.param;
    this.isShow = row?.[param?.key] && param?.answer &&
    param?.answer?.some(answer => answer?.toLowerCase() === row?.[param?.key]?.toLowerCase()) ? true : false;
    this.isChecked = this.value;
  }
}

