import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-column',
  template: `
    <nb-icon status="primary" icon="checkmark-square-2" *ngIf="status"></nb-icon>
  `,
})
export class StatusColumnComponent {
    status: boolean;
    @Input() value: any;
    @Input() rowData: any;
  
    ngOnInit() {
      this.status = this.value;
    }
}

