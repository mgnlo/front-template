import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-column',
  template: `
    <div class="btnCol">
      <button nbButton ghost [status]="buttonStatus" size="large">
        <nb-icon [icon]="buttonIcon"></nb-icon>
      </button>
    </div>
  `,
})
export class ButtonColumnComponent {
  @Input() buttonStatus: string = 'primary';
  @Input() buttonIcon: string = 'edit-outline';
}

