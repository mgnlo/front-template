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
    //console.info('this.value', this.value)
    const row = this.value?.row;

    const isShowParam = this.value?.isShowParam;
    this.isShow = isShowParam?.answer && row?.[isShowParam?.key] &&
      isShowParam?.answer?.some(answer => answer?.toLowerCase() === row?.[isShowParam?.key]?.toLowerCase()) ? true : false;

    const isCheckedParam = this.value?.isCheckedParam;
    this.isChecked = isCheckedParam?.key && row?.[isCheckedParam?.key] ? true : false;
  }
}

