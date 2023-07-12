import { Injectable, TemplateRef, Type } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogComponent, AlertDialogOption } from '@component/dialog/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogOption } from '@component/dialog/confirm-dialog/confirm-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
  ) { }

  open<T>(content: Type<T> | TemplateRef<T>, context?: Partial<T> | string): void {
    this.dialogService.open(content, {
      context: context,
      closeOnBackdropClick: false,
    });
  }

  openConfirm(option: ConfirmDialogOption): void {

    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  openAlert(option: AlertDialogOption): void {

    this.dialogService.open(AlertDialogComponent, {
      context: {
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  alertAndBackToList(title: string, content: string, url: string): void {
    this.dialogService.open(AlertDialogComponent, {
      context: {
        option: {
          title: title,
          content: content,
          buttonName: '確定',
          callback: () => {
            this.router.navigate([url]);
          },
        },
      },
      closeOnBackdropClick: false,
    });
  }
}
