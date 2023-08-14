import { Component, Input } from "@angular/core"
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'dialog-StatusDialog',
  templateUrl: './statusDialog.html'
})
export class StatusDialogComponent {
  @Input() isSuccess: boolean;
  @Input() title: string;

  constructor(private dialogRef: NbDialogRef<StatusDialogComponent>) { }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
