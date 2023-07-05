import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OAuth2Service } from '@module/oauth2';
import { BaseComponent } from '@pages/base.component';
import { combineLatest } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { DashBoardVisitorsAnalyticsRes } from '../../../shared/model/dash-board/dash-board-visitors-analytics-res';
import { DashBoardService } from '../dashboard.service.service';
import { DashBoardReq } from './../../../shared/model/dash-board/dash-board-req';


const typeList = [
  {
    type: '日',
    value: 'date',
  }, {
    type: '月',
    value: 'month',
  }, {
    type: '年',
    value: 'year',
  },
];
@Component({
  selector: 'ngx-dashboard-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class DashboardVisitorsAnalyticsComponent extends BaseComponent implements OnDestroy, OnInit {

  private alive = true;
  colors = ['#2575B1', '#FF9D00', '#1CBC8B'];
  systemList = [];
  serviceList = [];
  showServiceList = [];
  selectedType = 'date';
  typeList = typeList;
  chartLegend: { iconColor: string; title: string; id: string }[] = [];
  today = new Date();
  req = new DashBoardReq();
  yearList = [];
  monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  resultData: { res: DashBoardVisitorsAnalyticsRes, legend: Array<{ iconColor: string; title: string; id: string }> };
  staticsResult: {
    audit: number;
    approve: number;
    reject: number;
  };
  form: FormGroup;
  loading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private dashboardService: DashBoardService,
    oauth2Service: OAuth2Service) {
    super(oauth2Service);
  }
  ngOnInit(): void {

    this.req.startDate =
      String(this.today.getFullYear()) + '/' +
      this.transfer(this.today.getMonth() + 1) + '/' + this.transfer(this.today.getDate());
    this.req.endDate =
      String(this.today.getFullYear()) + '/' +
      this.transfer(this.today.getMonth() + 1) + '/' + this.transfer(this.today.getDate());

    this.req.type = this.selectedType;
    this.form = new FormGroup({
      system: new FormControl(''),
      service: new FormControl(''),
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
      startYear: new FormControl(),
      startMonth: new FormControl(),
      endYear: new FormControl(''),
      endMonth: new FormControl(''),
    });
    // 取得系統、服務、以及紀錄
    this.loading = true;
    combineLatest([
      this.dashboardService.getSystemList(),
      this.dashboardService.getServiceList(),
      this.dashboardService.getLineChartData(this.req)])
      .pipe(
        catchError(err => {
          this.loading = false;
          throw err;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([systemList, serviceList, lineChartData]) => {

        this.systemList = systemList.result.data;
        this.serviceList = serviceList.result.data;

        this.setLegendItems(this.systemList);
        this.req.defaultSystemId = this.systemList[0]?.id ? this.systemList[0]?.id : '';
        this.staticsResult = lineChartData.result.staticsResult;
        this.resultData = { res: lineChartData.result, legend: this.chartLegend };
        this.loading = false;
      });
    // 從2022推算到今年把每一年加到list
    for (let i = 2022; i <= this.today.getFullYear(); i++) {
      this.yearList.push(String(i));
    }

    this.form.get('startYear').setValue(String(this.today.getFullYear()));
    this.form.get('endYear').setValue(String(this.today.getFullYear()));
    this.form.get('startMonth').setValue(String(this.today.getMonth() + 1));
    this.form.get('endMonth').setValue(String(this.today.getMonth() + 1));
  }
  // 依照系統產圖型的提示文字
  setLegendItems(systemList: any): void {
    systemList.forEach((data, key) => {
      this.chartLegend.push({
        iconColor: this.colors[key] ? this.colors[key] : 'black',
        title: data.systemName,
        id: data.id,
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
    super.ngOnDestroy();
  }
  // 1~9 前面補0 -> 01~09
  transfer(num: number): string {
    let str: string;
    if (num < 10) {
      str = '0' + String(num);
    } else {
      str = String(num);
    }

    return str;
  }

  changeSystem(event: string): void {
    this.showServiceList = this.serviceList.filter(data => data.systemId === event);
    this.form.get('system').setValue(event);
    this.form.get('service').setValue('');
    this.req.systemId = event;
    this.req.serviceId = '';
    this.getLineChartData();
  }

  changeService(event: string): void {
    this.form.get('service').setValue(event);
    this.req.serviceId = event;
    this.req.systemId = this.form.get('system').value;
    this.getLineChartData();
  }
  // 改變type 把日期塞到req裡面
  changeType(event): void {
    const startDate = this.form.get('startDate').value;
    const endDate = this.form.get('endDate').value;
    const startYear = this.form.get('startYear').value;
    const endYear = this.form.get('endYear').value;
    const startMonth = this.form.get('startMonth').value;
    const endMonth = this.form.get('endMonth').value;
    if (event === 'date') {
      this.req.startDate =
        String(startDate.getFullYear()) + '/' +
        this.transfer(startDate.getMonth() + 1) + '/' + this.transfer(startDate.getDate());
      this.req.endDate =
        String(endDate.getFullYear()) + '/' +
        this.transfer(endDate.getMonth() + 1) + '/' + this.transfer(endDate.getDate());
    } else if (event === 'month') {
      this.req.startDate = String(startYear) + '/' + this.transfer(startMonth);
      this.req.endDate = String(endYear) + '/' + this.transfer(endMonth);
    } else if (event === 'year') {
      this.req.startDate = String(startYear);
      this.req.endDate = String(endYear);
    }
    this.cd.detectChanges();
    this.getLineChartData();
  }
  changeDate(event, type: string): void {

    const startYear = this.form.get('startYear').value;
    const endYear = this.form.get('endYear').value;
    const startMonth = this.form.get('startMonth').value;
    const endMonth = this.form.get('endMonth').value;

    if (type === 'startDate') {
      this.req.startDate =
      String(event.getFullYear()) + '/' + this.transfer(event.getMonth() + 1) + '/' + this.transfer(event.getDate());
      this.form.get('startDate').setValue(event);
    } else if (type === 'startYear') {
      this.req.startDate = event;
      this.req.endDate = endYear;
      this.form.get('startYear').setValue(event);
    } else if (type === 'startMonth') {
      this.req.startDate = String(startYear) + '/' + this.transfer(event);
      this.req.endDate = String(endYear) + '/' + this.transfer(endMonth);
      this.form.get('startMonth').setValue(event);
    } else if (type === 'endDate') {
      this.req.endDate =
      String(event.getFullYear()) + '/' + this.transfer(event.getMonth() + 1) + '/' + this.transfer(event.getDate());
      this.form.get('endDate').setValue(event);
    } else if (type === 'endYear') {
      this.req.startDate = startYear;
      this.req.endDate = event;
      this.form.get('endYear').setValue(event);
    } else if (type === 'endMonth') {
      this.req.startDate = String(startYear) + '/' + this.transfer(startMonth);
      this.req.endDate = String(endYear) + '/' + this.transfer(event);
      this.form.get('endMonth').setValue(event);
    } else if (type === 'startYearMonth') {
      this.req.startDate = event + '/' + this.transfer(startMonth);
      this.req.endDate = String(endYear) + '/' + this.transfer(endMonth);
      this.form.get('startYear').setValue(event);
    } else if (type === 'endYearMonth') {
      this.req.startDate = String(startYear) + '/' + this.transfer(startMonth);
      this.req.endDate = event + '/' + this.transfer(endMonth);
      this.form.get('endYear').setValue(event);
    }
    this.getLineChartData();
  }
  // 打電文
  getLineChartData(): void {
    this.checkDateValid();
    if (this.form.valid) {
      this.loading = true;
      this.req.type = this.selectedType;
      this.dashboardService.getLineChartData(this.req)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.staticsResult = data.result.staticsResult;
        this.resultData = { res: data.result, legend: this.chartLegend };
        this.loading = false;
      });
    }
  }
  // 檢核日期
  checkDateValid(): void {
    this.clearError();
    if (this.selectedType === 'date') {
      const startDateControl = this.form.get('startDate');
      const endDateControl = this.form.get('endDate');
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);
      if (startDate > endDate) {
        this.form.get('startDate').setErrors({ range: true });
        this.form.get('endDate').setErrors({ range: true });
      }
    } else if (this.selectedType === 'year') {
      const startYear = this.form.get('startYear').value;
      const endYear = this.form.get('endYear').value;
      if (startYear > endYear) {
        this.form.get('startYear').setErrors({ range: true });
        this.form.get('endYear').setErrors({ range: true });
      }
    } else if (this.selectedType === 'month') {
      const startYear = this.form.get('startYear').value;
      const endYear = this.form.get('endYear').value;
      const startMonth = this.form.get('startMonth').value;
      const endMonth = this.form.get('endMonth').value;

      if (startYear > endYear) {
        this.form.get('startYear').setErrors({ range: true });
        this.form.get('endYear').setErrors({ range: true });
      } else if (startYear === endYear) {
        if (parseInt(startMonth, 10) > parseInt(endMonth, 10)) {
          this.form.get('startMonth').setErrors({ range: true });
          this.form.get('endMonth').setErrors({ range: true });
        }
      }
    }
    this.cd.detectChanges();
  }
  clearError(): void {
    this.form.get('startDate').setErrors(undefined);
    this.form.get('endDate').setErrors(undefined);
    this.form.get('startYear').setErrors(undefined);
    this.form.get('endYear').setErrors(undefined);
    this.form.get('startMonth').setErrors(undefined);
    this.form.get('endMonth').setErrors(undefined);
  }
  exportReportBussiness(): void {

    this.dashboardService.exportReportBussiness(this.req);
  }
  exportReportCustomer(): void {

    this.dashboardService.exportReportCustomer(this.req);
  }
}
