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
  endTime;

  //主機提供資料
  mockData = [{
    tagName: "tag1", //標籤名稱
    tracks: [
      { startDate: '2023-06-27', endDate: '2023-07-04' },   //起始日、結束日
      { startDate: '2023-07-27', endDate: '2023-08-29' },
      { startDate: '2023-09-07', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "tag2",
    tracks: [
      { startDate: '2023-05-23', endDate: '2023-07-14' },
      { startDate: '2023-07-21', endDate: '2023-08-29' }
    ]
  }, {
    tagName: "tag3",
    tracks: [
      { startDate: '2023-04-23', endDate: '2023-05-14' },
      { startDate: '2023-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "tag4",
    tracks: [
      { startDate: '2023-05-13', endDate: '2023-06-14' },
      { startDate: '2023-10-21', endDate: '2023-11-29' }
    ]
  }];


  // 標籤索引陣列對應顏色
  colors = [
    '#7b9ce1',
    '#bd6d6c',
    '#75d874',
    '#c5d874'
  ];


  //標籤名稱陣列
  categories = [];

  //資料流
  data = [];

  constructor(private theme: NbThemeService) {
    for(let idx = 0; idx < this.mockData.length; idx++){
      this.categories.push(this.mockData[idx].tagName);

      for(let offset = 0; offset < this.mockData[idx].tracks.length; offset++){
        let item = {
          name: "",
          value: [],
          itemStyle: {
            color: ""
          }
        }
        
        item.name = this.mockData[idx].tagName;
        item.value = [];
        item.value.push(idx);
        item.value.push(new Date(this.mockData[idx].tracks[offset].startDate).getTime());
        item.value.push(new Date(this.mockData[idx].tracks[offset].endDate).getTime());
        item.itemStyle.color = this.colors[idx];

        this.data.push(item);
      }
    }

    //最小起始日期，以資料流內容最小值為準 - 86400000 * 2, //最小起始日往前兩天，這個可以調整
    this.startTime = this.data.reduce((agg, d) => Math.min(agg, d.value[1]), Infinity) - 86400000 * 2;
    //最大結束日期，以資料流內容最大值為準 + 86400000 * 2, //最大結束日往後兩天，這個可以調整
    this.endTime = this.data.reduce((agg, d) => Math.max(agg, d.value[2]), 0) + 86400000 * 2;    
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
            return `<div>${params.marker}${this.categories[params.value[0]]}</div>
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
          max: this.endTime,
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
            dimensions: ['rowIndex', 'sDate', 'eDate'],
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: ['sDate', 'eDate'],
              y: 'rowIndex'
            },
            data: this.data
          }
        ]
      };
    });
  }

  timeFormat(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = ("" + (date.getMonth() + 1)).padStart(2, '0');
    let day = ("" + date.getDate()).padStart(2, '0');

    return `${year}\n${month}/${day}`;
  }

  timeFormat2(timestamp) {
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
