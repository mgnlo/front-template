import { Injectable, TemplateRef, Type } from '@angular/core';
import { Router } from '@angular/router';
import { toastIcon, toastTitle } from '@common/enums/common-enum';
import { StatusDialogComponent, StatusDialogOption } from '@component/dialog/status-dialog/status-dialog.component';
import { ReviewDialogComponent, ReviewDialogOption } from '@component/dialog/review-dialog/review-dialog.component';
import { NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbIconConfig, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { interval } from 'rxjs';
import { finalize, map, takeWhile } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private loadingService: LoadingService,
    private toastrService: NbToastrService,
  ) { }

  open<T>(content: Type<T> | TemplateRef<T>, context?: Partial<T> | string): NbDialogRef<T> {
    return this.dialogService.open(content, {
      context: context,
      closeOnBackdropClick: false,
    });
  }

  openReview(option: ReviewDialogOption): NbDialogRef<ReviewDialogComponent> {
    return this.dialogService.open(ReviewDialogComponent, {
      context: {
        dialogSize: 'medium',
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  openStatus(option: StatusDialogOption): void {

    this.dialogService.open(StatusDialogComponent, {
      context: {
        option: option,
      },
      closeOnBackdropClick: false,
    });
  }

  /** 成功或失敗的彈跳視窗 1.5s後關閉視窗
   * @param isSuccess 成功 or 失敗 boolean
   * @param msg 要顯示的訊息
   * @param url 有傳就會導頁, 沒傳就停留原頁
   * */
  alertAndBackToList(isSuccess: boolean, msg: string, url?: string[]): void {
    this.loadingService.open();
    this.showToast(isSuccess ? 'success' : 'danger', msg);
    if (!!url) {
      interval(1500).pipe(map(val => 1 - val), takeWhile(x => x >= 0)).subscribe(() => {
        this.router.navigate(url);
      });
    }
    // 無論是否有提供 URL，最後都會關閉 loadingService
    interval(1500).pipe(
      map(val => 1 - val),
      takeWhile(x => x >= 0),
      finalize(() => {
        this.loadingService.close();
      })
    ).subscribe();
  }

  showToast(status: string, content: string) {
    let position = NbGlobalPhysicalPosition.TOP_RIGHT;
    const iconConfig: NbIconConfig = { icon: toastIcon[status], pack: 'eva' };
    const config: Partial<NbToastrConfig> = { position, status, icon: iconConfig };
    this.toastrService.show(content, toastTitle[status], config);
  }
}
