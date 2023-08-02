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
    tagName: "淨流出", //標籤名稱
    tracks: [
      { startDate: '2021-06-27', endDate: '2021-12-04' },   //起始日、結束日
      { startDate: '2022-07-27', endDate: '2023-02-29' },
      { startDate: '2023-09-07', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "淨流入",
    tracks: [
      { startDate: '2022-05-23', endDate: '2023-07-14' },
      { startDate: '2023-07-21', endDate: '2023-08-29' }
    ]
  }, {
    tagName: "產品持有－JCB白",
    tracks: [
      { startDate: '2021-04-23', endDate: '2022-12-14' },
      { startDate: '2023-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "轉入金額－多",
    tracks: [
      { startDate: '2021-02-23', endDate: '2021-08-14' },
      { startDate: '2022-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "忠誠戶",
    tracks: [
      { startDate: '2021-07-23', endDate: '2022-02-14' },
      { startDate: '2022-03-23', endDate: '2022-11-14' },
      { startDate: '2023-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "透支金額－少",
    tracks: [
      { startDate: '2020-04-23', endDate: '2021-05-14' },
      { startDate: '2022-03-23', endDate: '2023-11-14' }
    ]
  }, {
    tagName: "官網平均停留時間－長",
    tracks: [
      { startDate: '2023-05-13', endDate: '2023-06-14' },
      { startDate: '2022-10-21', endDate: '2023-11-29' }
    ]
  }];



  // TODO 此款圖示顏色對應 標籤類型(TagType)，其值與色票對應如下：
  // "normal" = 規則標籤  -> #29A7E6
  // "document" = 名單標籤 -> #FFAA00

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
    // var height = api.size([0, 1])[1] * 0.6;
    var height = 10;

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
        // 放大縮小
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'weakFilter',
            minSpan: 10,
          }
        ],
        grid: {
          show: true,
          top: '2%',
          bottom: '2%',
          left: '1%',
          right: '1%',
          containLabel: true,
          borderColor: '#393C3E',
        },
        xAxis: {
          min: this.startTime,
          max: this.endTime,
          scale: true,
          axisLabel: {
            formatter: (val) => {
              return this.timeFormat(val);
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
        },
        yAxis: {
          data: this.categories,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: 'custom',
            dimensions: ['rowIndex', 'sDate', 'eDate'],
            renderItem: this.renderItem,
            encode: {
              x: ['sDate', 'eDate'],
              y: 'rowIndex'
            },
            data: this.data,
          }
        ],
        backgroundColor: '#393C3E',
        color: '#ffffff',
        textStyle: {
          color: '#ffffff',
        }
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
