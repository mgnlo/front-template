import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-column-button',
  template: `
  <div class="btnCol">
    <button nbButton ghost [status]="this.settings.btnStatus" size="large" (click)="emit()" [disabled]="this.settings.disabled">
      <nb-icon [icon]="this.settings.btnIcon"></nb-icon>
    </button>
  </div>`,
})
export class ColumnButtonComponent {

  @Input() rowData: any;
  /**
   * 按鈕參數 ex: { btnStatus: 'info', btnIcon: 'search', clickable: true, disabled: false}
  */
  @Input() settings: { btnStatus?: string, btnIcon?: string, clickable?: boolean, disabled?: boolean } = {
    btnStatus: 'info', btnIcon: 'search', clickable: true, disabled: false
  }
  @Output() emitter = new EventEmitter();

  clickable: boolean = true;
  ngOnChanges(changes: SimpleChanges): void {
    this.clickable = changes.settings.currentValue?.clickable;
  }

  emit() {
    if (this.clickable) {
      this.emitter.next(this.rowData);
    }
  }

}
