import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ModuleDataRes } from '@model/dash-board/module-data-res';
import { OAuth2Service } from '@module/oauth2';
import { BaseComponent } from '@pages/base.component';
import { BehaviorSubject, combineLatest, interval, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DashBoardService } from '../dashboard.service.service';


@Component({
  selector: 'ngx-module-status',
  styleUrls: ['./module-status.component.scss'],
  templateUrl: './module-status.component.html',
})
export class DashboardModuleStatusComponent extends BaseComponent implements OnDestroy, OnInit {

  pieChartValue: any;
  moduleDataRes: ModuleDataRes;
  resultMap: Map<string, Array<ModuleDataRes>> = new Map();
  // 停止計時器
  destroy$: Subject<boolean> = new Subject<boolean>();
  monitorIntervalSub = new BehaviorSubject<number>(0);

  openDiv = [];

  constructor(
    private cd: ChangeDetectorRef,
    private dashboardService: DashBoardService,
    oath2Service: OAuth2Service) {
    super(oath2Service);
  }

  ngOnInit(): void {
    this.destroy$.next(false);
    this.monitorIntervalSub
    .pipe(
      switchMap(value => interval(value)),
      tap(() => {
        this.monitorIntervalSub.next(10000);
      }),
      switchMap(time => {
        return combineLatest([this.dashboardService.getModuleData()])
        .pipe(
          catchError(() => {
            return of([undefined]);
          }),
        );
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe(([moduleData]) => {
      if (moduleData) this.moduleDataRes = moduleData.result;
      this.cd.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    super.ngOnDestroy();
  }

  toggleDiv(key: string): void {
    if (this.openDiv.includes(key)) {
      this.openDiv.forEach((value, index) => {
        if (value === key) {
          this.openDiv.splice(index, 1);
        }
      });
    } else {
      this.openDiv.push(key);
    }
  }
}
