import { Component, Input } from "@angular/core"
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'dialog-ConfirmDialog',
  templateUrl: './confirmDialog.html'
})
export class ConfirmDialogComponent {
  @Input() dialogSize: string;
  @Input() title: string;
  @Input() content: string;
  @Input() subBtnName: string;
  @Input() mainBtnName: string;

  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) { }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
