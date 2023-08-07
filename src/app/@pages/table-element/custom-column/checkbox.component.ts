import { Component, Input } from '@angular/core';

@Component({
  selector: 'checkbox-column',
  template: `
    <nb-checkbox status="info" [checked]="isChecked"></nb-checkbox>
  `,
})
export class CheckboxColumnComponent {
    @Input() isChecked: boolean;
    @Input() value: any;
    @Input() rowData: any;

    ngOnInit() {
        this.isChecked = this.value;
    }
}

