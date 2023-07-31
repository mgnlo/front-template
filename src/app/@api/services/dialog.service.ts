import { Injectable, TemplateRef, Type } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '@component/dialog/alert-dialog/alert-dialog.component';
import { ApproveDialogComponent, ApproveDialogOption } from '@component/dialog/approve-dialog/approve-dialog.component';
import { RejectDialogComponent, RejectDialogOption } from '@component/dialog/reject-dialog/reject-dialog.component';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
  ) { }

  open<T>(content: Type<T> | TemplateRef<T>, context?: Partial<T> | string): NbDialogRef<T> {
    return this.dialogService.open(content, {
      context: context,
      closeOnBackdropClick: false,
    });
  }

  openReject(option: RejectDialogOption): void {

    this.dialogService.open(RejectDialogComponent, {
      context: {
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  openApprove(option: ApproveDialogOption): void {

    this.dialogService.open(ApproveDialogComponent, {
      context: {
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  alertAndBackToList(msg: string, url: string[]): void {
    this.dialogService.open(AlertDialogComponent, {
      context: {
        option: {
          content: msg,
          backTo: url,
        },
      },
      closeOnBackdropClick: false,
    });
  }
}
