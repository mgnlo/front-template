
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'condition-chart-line',
  templateUrl: './condition-chart-line.component.html',
  styleUrls: ['./condition-chart-line.component.scss']
})
export class ConditionChartLineComponent implements AfterViewInit, OnDestroy {

  @Input() dataList: any = {
    'lineColor': ['#29A7E6'],
    'legendData': ['人數'],
    'seriesData': [
      {
        name: '人數',
        type: 'line',
        smooth: true,
        data: [14, 40, 8, 36, 3, 49, 20000000, 256],
      },
    ]
  };
  xAxisData = ['60萬', '80萬', '100萬', '120萬', '140萬', '160萬', '180萬'];

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: this.dataList.lineColor,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: this.dataList.legendData,
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
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
            type: 'log',
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
              formatter: function (val) {
                if (val < 10000)
                  return val + "筆"
                return (val / 10000) + "萬筆"
              },
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
        series: this.dataList.seriesData
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}



