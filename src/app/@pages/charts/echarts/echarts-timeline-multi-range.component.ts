import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import * as echarts from 'echarts';

@Component({
  selector: 'ngx-echarts-timeline-multi-range',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTimelineMultiRangeComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  data = [];
  startTime;
  categories = ['tag1', 'tag2', 'tag3'];
  types = [
    { name: 'tag1', color: '#7b9ce1' },
    { name: 'tag2', color: '#bd6d6c' },
    { name: 'tag3', color: '#75d874' }
  ];

  constructor(private theme: NbThemeService) {
    this.startTime = new Date().getTime();
    // Generate mock data
    for(let index = 0; index < this.categories.length; index++){
      var baseTime = this.startTime;

      for (var i = 0; i < 3; i++) {
        var typeItem = this.types[index];
        var duration = Math.round(Math.random() * 10000);

        if(this.categories[index] == typeItem.name) {
          this.data.push({
            name: typeItem.name,
            value: [index, baseTime, (baseTime += duration), duration],
            itemStyle: {
              normal: {
                color: typeItem.color
              }
            }
          });
          baseTime += Math.round(Math.random() * 2000);
        }        
      }
    }
  }

  //自定義 render 邏輯
  renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      }
    );
    return (
      rectShape && {
        type: 'rect',
        transition: ['shape'],
        shape: rectShape,
        style: api.style()
      }
    );
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        tooltip: {
          formatter: function (params) {
            return params.marker + params.name + ': ' + params.value[3] + ' ms';
          }
        },
        title: {
          text: 'echart - 標籤群組',
          left: 'center'
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            labelFormatter: ''
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        grid: {
          height: 300
        },
        xAxis: {
          min: this.startTime,
          scale: true,
          axisLabel: {
            formatter: (val) =>  {
              return Math.max(0, val - this.startTime) + ' ms';
            }
          }
        },
        yAxis: {
          data: this.categories
        },
        series: [
          {
            type: 'custom',
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: this.data
          }
        ]
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
