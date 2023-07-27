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

  startTime;

  //標籤名稱陣列
  categories = ['tag1', 'tag2', 'tag3'];
  // 標籤名稱陣列對應顏色
  types = [
    { name: 'tag1', color: '#7b9ce1' },
    { name: 'tag2', color: '#bd6d6c' },
    { name: 'tag3', color: '#75d874' }
  ];
  data = [
    {
      "name": "tag1", //名稱
      "value": [
        0,  //名稱索引，相同標籤名稱提供同一索引值
        new Date('2023-06-27').getTime(), //起始日, 主機直接給 getTime() 值
        new Date('2023-07-04').getTime()  //結束日, 主機直接給 getTime() 值
      ],
      // 主機資料或許可以只提供上半部，這邊由前端依據邏輯加工資料處理
      "itemStyle": {
        "color": "#7b9ce1" // 指定顏色，依據 seriers type='custom' 中的 itemStyle
      }
    },
    {
      "name": "tag1",
      "value": [
        0,
        new Date('2023-07-08').getTime(),
        new Date('2023-08-12').getTime()
      ],
      "itemStyle": {
        "color": "#7b9ce1"
      }
    },
    {
      "name": "tag2",
      "value": [
        1,
        new Date('2023-06-29').getTime(),
        new Date('2023-07-04').getTime()
      ],
      "itemStyle": {
        "color": "#bd6d6c"
      }
    },
    {
      "name": "tag2",
      "value": [
        1,
        new Date('2023-07-17').getTime(),
        new Date('2023-08-17').getTime()
      ],
      "itemStyle": {
        "color": "#bd6d6c"
      }
    },
    {
      "name": "tag2",
      "value": [
        1,
        new Date('2023-08-27').getTime(),
        new Date('2023-09-17').getTime()
      ],
      "itemStyle": {
        "color": "#bd6d6c"
      }
    },
    {
      "name": "tag3",
      "value": [
        2,
        new Date('2023-06-24').getTime(),
        new Date('2023-06-27').getTime()
      ],
      "itemStyle": {
        "color": "#75d874"
      }
    },
    {
      "name": "tag3",
      "value": [
        2,
        new Date('2023-07-12').getTime(),
        new Date('2023-07-29').getTime()
      ],
      "itemStyle": {
        "color": "#75d874"
      }
    },
    {
      "name": "tag3",
      "value": [
        2,
        new Date('2023-07-31').getTime(),
        new Date('2023-08-27').getTime()
      ],
      "itemStyle": {
        "color": "#75d874"
      }
    }
  ];

  constructor(private theme: NbThemeService) {
    //最小起始日期，以資料流內容最小值為準 - 86400000 * 2, //最小起始日往前兩天，這個可以調整
    // this.startTime = new Date().getTime();

    this.startTime = this.data.reduce((agg, d) => Math.min(agg, d.value[1]), Infinity) - 86400000 * 2;

    // for (let index = 0; index < this.categories.length; index++) {
    //   // 每個 item 的起始日期
    //   var baseTime = this.startTime;
    //   for (var i = 0; i < 3; i++) {
    //     var typeItem = this.types[index];
    //     var duration = Math.round(Math.random() * 10000) * 86400;

    //     if (this.categories[index] == typeItem.name) {
    //       this.data.push({
    //         //標籤名稱
    //         name: typeItem.name,
    //         // 項目陣列，索引、起始日期、結束日期
    //         value: [index, baseTime, (baseTime += duration)],
    //         // value: [index, baseTime, (baseTime += duration), duration],
    //         itemStyle: {
    //           normal: {
    //             color: typeItem.color
    //           }
    //         }
    //       });

    //       baseTime += duration;
    //     }
    //   }
    // }
  }

  //自定義 render 邏輯，主要在繪製線圖
  renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 4,
        width: end[0] - start[0],
        height: height / 2
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
      // const colors: any = config.variables;
      // const echarts: any = config.variables.echarts;

      this.options = {
        tooltip: {
          formatter: (params) => {
            return `<div>${params.marker}${params.name}</div>
                    <div>${this.timeFormat2(params.value[1])} ~ ${this.timeFormat2(params.value[2])}</div>`;
          }
        },
        title: {
          text: 'echart - 標籤群組',
          left: 'center'
        },
        // 放大縮小
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'weakFilter',
            minSpan: 50
          }
        ],
        grid: {
          height: 300
        },
        xAxis: {
          min: this.startTime,
          scale: true,
          axisLabel: {
            formatter: (val) => {
              return this.timeFormat(val);
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

  timeFormat(timestamp){
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = ("" + (date.getMonth() + 1)).padStart(2, '0');
    let day = ("" + date.getDate()).padStart(2, '0');

    return `${year}\n${month}/${day}`;
  }

  timeFormat2(timestamp){
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = ("" + (date.getMonth() + 1)).padStart(2, '0');
    let day = ("" + date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
