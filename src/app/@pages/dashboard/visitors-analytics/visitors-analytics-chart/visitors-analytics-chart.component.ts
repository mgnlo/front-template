import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { OAuth2Service } from '@module/oauth2';
import { BaseComponent } from '@pages/base.component';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils';
import { DashBoardReq } from '../../../../shared/model/dash-board/dash-board-req';
import { DashBoardVisitorsAnalyticsRes } from '../../../../shared/model/dash-board/dash-board-visitors-analytics-res';
@Component({
  selector: 'ngx-visitors-analytics-chart',
  styleUrls: ['./visitors-analytics-chart.component.scss'],
  template: `
    <div echarts
         [options]="option"
         [merge]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class DashboardVisitorsAnalyticsChartComponent extends BaseComponent implements OnDestroy, OnInit, OnChanges {

  private alive = true;

  @Input() resultData: {
    res: DashBoardVisitorsAnalyticsRes,
    legend: Array<{ iconColor: string; title: string; id: string }>,
  };
  @Input() req: DashBoardReq;

  chartLegend: Array<{ iconColor: string; title: string; id: string }>;
  option: any;
  echartsIntance: any;
  systemId: string;
  constructor(
    private layoutService: LayoutService,
    oauth2Service: OAuth2Service) {
    super(oauth2Service);
  }

  ngOnInit(): void {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resultData.currentValue) {
      this.resultData = changes.resultData.currentValue;
      this.chartLegend = this.resultData.legend;
      this.systemId = this.req.systemId ?
                    this.req.systemId : this.req.defaultSystemId;
      this.setOptions();
    }

  }
  setOptions() {
    // 先取得x軸
    const xData = this.resultData.res.lineChartResult[this.systemId] ?
      this.resultData.res.lineChartResult[this.systemId] :
      this.resultData.res.lineChartResult[this.req.defaultSystemId];
    if (this.req.systemId) {
      this.chartLegend = this.chartLegend.filter(legend => legend.id === this.req.systemId);
    }
    const seriesData = this.chartLegend.map(legend => {
      const recordData = this.resultData.res.lineChartResult[legend.id];
      const color = legend.iconColor;

      return this.getInnerLine(recordData, color);
    });
    this.option = {
      grid: {
        left: 40,
        top: 10,
        right: 30,
        bottom: 70,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        offset: 1,
        data: xData.map(i => i.time),
        axisTick: {
          show: false,
        },
        axisPointer: {
          snap: true,
          triggerTooltip: false,
          show: true,
          type: 'line',
          lineStyle: {
            type: 'dashed',
          },
        },
        axisLabel: {
          color: '#8f9bb3',
          fontSize: '10',
        },
        axisLine: {
          lineStyle: {
            color: '#e4e9f2',
            width: '2',
          },
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: true,
        minInterval: 1,
        axisLine: {
          lineStyle: {
            color: '#e4e9f2',
            width: '1',
          },
        },
        axisPointer: {
          snap: true,
          triggerTooltip: true,
          show: true,
          type: 'line',
          lineStyle: {
            type: 'dashed',
          },
          label: {
            formatter: function (param) {
              return param.value;
            },
          },
        },
        axisLabel: {
          color: '#8f9bb3',
          fontSize: '10',
        },
        axisTick: {
          show: false,
        },
        splitLine: {

          lineStyle: {
            color: '#edf1f7',
            width: '1',
          },
        },
      },
      series: seriesData,
    };
  }

  getInnerLine(data: any, color: string) {
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      tooltip: {
        formatter: function (param) {
          return param;
        },
      },
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          opacity: 0,
        },
      },
      lineStyle: {
        normal: {
          width: '1',
          type: 'solid',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'red',
          }, {
            offset: 1,
            color: 'red',
          }]),
        },
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: color,
          }, {
            offset: 1,
            color: color,
          }]),
          // opacity: 1,
        },
      },
      data: data.map(i => i.count),
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
