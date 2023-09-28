import { Component, Input } from "@angular/core"
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'dialog-TimeoutDialog',
  templateUrl: './timeoutDialog.html'
})
export class TimeoutDialogComponent {
  @Input() title: string;
  @Input() btnName: string;

  constructor(private dialogRef: NbDialogRef<TimeoutDialogComponent>) { }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
