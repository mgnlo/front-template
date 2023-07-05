import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { OAuth2Service } from '@module/oauth2';
import { BaseComponent } from '@pages/base.component';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';


@Component({
  selector: 'ngx-visitors-statistics',
  styleUrls: ['./visitors-statistics.component.scss'],
  templateUrl: './visitors-statistics.component.html',
})
export class DashboardVisitorsStatisticsComponent extends BaseComponent implements OnDestroy, OnInit, OnChanges {
  colors = ['#2575B1', '#FF9D00', '#1CBC8B'];
  // 灰底
  gray = '#edf1f7';
  private alive = true;

  approve = 0;
  audit = 0;
  reject = 0;
  total = 0;

  approvePercent = 0;
  auditPercent = 0;
  rejectPercent = 0;
  @Input() staticsResult: {
    audit: number;
    approve: number;
    reject: number;
  };

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;

  constructor(private layoutService: LayoutService, oauth2Service: OAuth2Service) {
    super(oauth2Service);
  }

  ngOnInit(): void {
    this.setLegendItems();
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.staticsResult?.currentValue) {
      this.staticsResult = changes.staticsResult.currentValue;
      this.approve = this.staticsResult.approve;
      this.audit = this.staticsResult.audit;
      this.reject = this.staticsResult.reject;
      this.total = this.approve + this.audit + this.reject;
      if (this.total !== 0) {
        this.approvePercent = Math.round((this.approve / this.total) * 100);
        this.auditPercent = Math.round((this.audit / this.total) * 100);
        this.rejectPercent = Math.round((this.reject / this.total) * 100);
        this.setOptions();
      } else {
        this.total = 0 ;
        this.approvePercent = 0;
        this.auditPercent = 0;
        this.rejectPercent = 0;
      }
    }
  }

  setLegendItems() {
    this.chartLegend = [
      {
        iconColor: this.colors[0],
        title: '通過',
      },
      {
        iconColor: this.colors[1],
        title: '不通過',
      }, {
        iconColor: this.colors[2],
        title: '待審核',
      },
    ];
  }

  setOptions() {

    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '',
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['60%', '97%'],
          data: [
            {
              value: this.approvePercent,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: '600',
                    color: '#1a2138',
                  },
                },
              },
              tooltip: {
                show: true,
                formatter: params => `通過<br/>${params.value}%`,
              },
              itemStyle: {
                normal: {
                  color: this.colors[0],
                },
              },
              hoverAnimation: false,
            },
            {
              value: this.auditPercent,
              name: ' ',
              tooltip: {
                show: true,
                formatter: params => `待審核<br/>${params.value}%`,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: this.colors[2],
                },
              },
            },
            {
              value: this.rejectPercent,
              name: ' ',
              tooltip: {
                show: true,
                formatter: params => `不通過<br/>${params.value}%`,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: this.colors[1],
                },
              },
            },
          ],
        },
      ],
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
    super.ngOnDestroy();
  }
}
