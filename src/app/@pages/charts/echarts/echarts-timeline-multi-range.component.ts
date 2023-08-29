import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { CustomerTagHistory } from '@common/mock-data/customer-tag-history-mock';
import { NbThemeService } from '@nebular/theme';

import * as echarts from 'echarts';


@Component({
  selector: 'ngx-echarts-timeline-multi-range',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTimelineMultiRangeComponent<T> implements AfterViewInit, OnDestroy {
  @Input() datas: T;
  options: any = {};
  themeSubscription: any;

  startTime;
  endTime;

  //主機提供資料
  mockData = CustomerTagHistory;

  // TODO 此款圖示顏色對應 標籤類型(TagType)，其值與色票對應如下：
  // "normal" = 規則標籤  -> #29A7E6
  // "document" = 名單標籤 -> #FFAA00

  // 標籤索引陣列對應顏色
  colors = { normal: "#29A7E6", document: "#FFAA00" };

  //標籤名稱陣列
  categories = [];

  //資料流
  data = [];

  constructor(private theme: NbThemeService) {
    let sourceData = !this.datas ? this.mockData : this.data;
    for (let idx = 0; idx < sourceData.length; idx++) {
      this.categories.push(sourceData[idx].tagName);

      for (let offset = 0; offset < sourceData[idx].tracks.length; offset++) {
        let item = {
          name: "",
          value: [],
          itemStyle: {
            color: ""
          }
        }

        item.name = sourceData[idx].tagName;
        item.value = [];
        item.value.push(idx);
        item.value.push(new Date(sourceData[idx].tracks[offset].startDate).getTime());
        item.value.push(new Date(sourceData[idx].tracks[offset].endDate).getTime());
        item.itemStyle.color = this.colors[sourceData[idx].tagType];

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
