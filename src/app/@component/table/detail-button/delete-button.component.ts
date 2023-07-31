import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'delete-button',
  template: `<button nbButton status="danger" class="iconBtn" size="medium" (click)="onDeleteClick()"><nb-icon icon="trash-2-outline"></nb-icon></button>`,
})
export class DeleteButtonComponent {

  @Input() rowData: any;

  @Output() delete = new EventEmitter<any>();

  onDeleteClick(): void {
    this.delete.emit(this.rowData);
  }
}
