import { Component, Input } from "@angular/core"
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: 'dialog-TextDialog',
  templateUrl: './textDialog.html'
})
export class TextDialogComponent {
  @Input() dialogSize: string;
  @Input() title: string;
  @Input() content: string;
  @Input() btnName: string;

  constructor(private dialogRef: NbDialogRef<TextDialogComponent>) { }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
