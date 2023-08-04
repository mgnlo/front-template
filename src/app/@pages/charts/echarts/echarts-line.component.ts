import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { LineSeriesData } from '@api/models/dashboard.model';
import { NbThemeService } from '@nebular/theme';

import * as echarts from 'echarts';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div #echartsContainer echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('echartsContainer', { static: true }) echartsContainer!: ElementRef;
  @Input() data: LineSeriesData;
  @Output() chartEvent = new EventEmitter();

  options: any = {};
  themeSubscription: any;
  chart: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
				color: ["#FF3D71", "#FFAA00", '#29A7E6'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: this.data.legends, //['排程', '標籤', '名單'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.data.dates,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'log', // value | log | 
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: this.data.seriesData,
      };
    });

    this.chart = echarts.init(this.echartsContainer.nativeElement);
    this.chart.on('click', (param) => {
      this.onChartClick(param);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.chart.off('click', this.onChartClick);
  }

  onChartClick(param: any): void {
    this.chartEvent.emit(param.name);
  }
}
