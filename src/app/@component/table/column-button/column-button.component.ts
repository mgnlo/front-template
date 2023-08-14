import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-column-button',
  template: `
  <div class="btnCol">
  <button nbButton ghost [status]="buttonStatus" size="large" (click)="emit()" [disabled]="disabled">
    <nb-icon [icon]="buttonIcon"></nb-icon>
  </button>
  </div>`,
})
export class ColumnButtonComponent implements OnInit {

  @Input() rowData: any;
  @Input() settings: { buttonStatus: string, buttonIcon: string, clickable?: boolean, disabled?: boolean };
  @Output() emitter = new EventEmitter<any>();
  buttonStatus: string;
  buttonIcon: string;
  clickable: boolean;
  disabled: boolean;

  constructor() { }

  ngOnInit(): void {
    // console.info(this.settings)

    this.buttonStatus = !!this.settings.buttonStatus ? this.settings.buttonStatus : 'primary';
    this.buttonIcon = !!this.settings.buttonIcon ? this.settings.buttonIcon : 'maximize-outline';
    this.clickable = !!this.settings.clickable ? this.settings.clickable : true;
    this.disabled = !!this.settings.disabled ? this.settings.disabled : false;
  }

  emit() {
    if (this.clickable) {
      this.emitter.next(this.rowData);
    }
  }

}
