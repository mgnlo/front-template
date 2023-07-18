import { Injectable, TemplateRef, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ApproveDialogComponent, ApproveDialogOption } from '@component/dialog/approve-dialog/approve-dialog.component';
import { RejectDialogComponent, RejectDialogOption } from '@component/dialog/reject-dialog/reject-dialog.component';
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

  // alertAndBackToList(title: string, content: string, url: string): void {
  //   this.dialogService.open(AlertDialogComponent, {
  //     context: {
  //       option: {
  //         title: title,
  //         content: content,
  //         buttonName: '確定',
  //         callback: () => {
  //           this.router.navigate([url]);
  //         },
  //       },
  //     },
  //     closeOnBackdropClick: false,
  //   });
  // }
}
