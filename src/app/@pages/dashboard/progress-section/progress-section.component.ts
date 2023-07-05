import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '@pages/base.component';
import { catchError, takeUntil, tap } from 'rxjs/operators';

export class ProgressInfo {
  title: string;
  value: number;
  activeProgress: number;
  description?: string;
  status: string;
}

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class DashboardProgressSectionComponent extends BaseComponent implements OnInit {

  loading = false;
  progressInfoData: Array<ProgressInfo> = [];

  constructor(private translatePipe: TranslatePipe) {
    super();
  }
  ngOnInit(): void {
    // this.loading = true;
    // this.dashBoardService.getProgressSectionData()
    //   .pipe(
    //     catchError(err => {
    //       this.loading = false;
    //       throw err;
    //     }),
    //     tap(resData => {
    //       const result = resData.result.countData;
    //         result.forEach(data => {
    //           if (data.status === RecordStatus.WAITING ||
    //               data.status === RecordStatus.CONNECT ||
    //               data.status === RecordStatus.AUDIT) {
    //             const info = new ProgressInfo();
    //             const title =
    //             (data.status !== RecordStatus.AUDIT) || (data.status === RecordStatus.AUDIT && data.count === 0) ? `${this.translateStatus(data.status)}` : `${data.stage + 1}階${this.translateStatus(data.status)}`;
    //             let status = '';
    //             switch (data.status) {
    //               case RecordStatus.WAITING:
    //                 status = 'primary';
    //                 break;
    //               case RecordStatus.CONNECT:
    //                 status = 'warning';
    //                 break;
    //               case RecordStatus.AUDIT:
    //                 status = 'info';
    //                 break;
    //               default:
    //             }
    //             info.title = title;
    //             info.value = data.count;
    //             info.activeProgress = Math.round((data.count / resData.result.total) * 100);
    //             info.status = status;

    //             this.progressInfoData.push(info);
    //           }
    //         });
    //     }),
    //     takeUntil(this.unsubscribe$),
    //   )
    //   .subscribe(() => this.loading = false);
  }

  translateStatus(status: string): string {
    if (!status) return this.translatePipe.transform('function.verify_record.all');
    return this.translatePipe.transform('common.enum.record_status.' + status);
  }
}
