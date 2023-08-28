
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TagConditionChartLine } from '@api/models/tag-manage.model';
import { RegExpUtil } from '@common/utils/reg-exp-util';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'condition-chart-line',
  templateUrl: './condition-chart-line.component.html',
  styleUrls: ['./condition-chart-line.component.scss']
})
export class ConditionChartLineComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: TagConditionChartLine;
  seriesData = new Array;
  xAxisData = new Array;
  yAxisData = new Array;

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  // 排序
  sortConditionDistribution(array: any[], keyExtractor: (item: any) => string, sortExtractor: (item: any) => string): any[] {
    return array.sort((a, b) => {
      const sortA = parseInt(sortExtractor(a).replace(RegExpUtil.chinese, ""));
      const sortB = parseInt(sortExtractor(b).replace(RegExpUtil.chinese, ""));
      if (sortA < 0 && sortB < 0) {
        return sortB - sortA;
      } else {
        return sortA - sortB;
      }
    });
  }

  getMapKeyByValue(key: string, arr: any[]): number[] {
    return arr.map((m) => m[key]);
  }

  ngOnInit(): void {
    const distributionKeySort = this.sortConditionDistribution(
      this.data.conditionDistribution,
      (item) => item.distributionKey,
      (item) => item.distributionKey
    );
    this.xAxisData = this.getMapKeyByValue('distributionKey', distributionKeySort);

    const conditionDistributionSort = this.sortConditionDistribution(
      this.data.conditionDistribution,
      (item) => item.sort,
      (item) => item.sort
    );
    this.yAxisData = this.getMapKeyByValue('distributionValue', conditionDistributionSort)
    this.seriesData.push({
      name: this.data.conditionName,
      type: 'line',
      smooth: true,
      data: this.yAxisData,
    });
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const echarts: any = config.variables.echarts;
      let yAxisMaxVal = Math.max(...this.yAxisData.filter(item => typeof item === 'number'));
      let yAxisMinVal = Math.min(...this.yAxisData.filter(item => typeof item === 'number'));

      this.options = {
        backgroundColor: echarts.bg,
        color: '#29A7E6',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: this.data?.conditionKey,
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
            type: 'value',
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
            min: yAxisMinVal,
            max: yAxisMaxVal,
            splitNumber: 10,
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          height:'90%'
        },
        series: this.seriesData
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}



