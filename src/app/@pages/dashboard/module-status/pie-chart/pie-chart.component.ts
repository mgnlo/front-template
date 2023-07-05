import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { OAuth2Service } from '@module/oauth2';
import { BaseComponent } from '@pages/base.component';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';


@Component({
  selector: 'ngx-echarts-pie',
  styleUrls: ['./pie-chart.component.scss'],
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent extends BaseComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {

  private alive = true;

  @Input() title: string;
  @Input() value: number;
  @Input() color: string;
  @Input() isExpand: boolean;

  // 灰底
  gray = '#edf1f7';

  yellow = '#FF9D00';
  green = '#1CBC8B';
  red = '#ff0000';

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;

  formatValue: number;
  constructor(
    private cd: ChangeDetectorRef,
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

  ngAfterViewInit() {
    this.setLegendItems();
    this.setOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value?.currentValue) {
      this.value = changes.value.currentValue;
      if (this.value <= 0.6) {
        this.color = this.green;
      } else if (this.value > 0.6 && this.value <= 0.8) {
        this.color = this.yellow;
      } else {
        this.color = this.red;
      }
      this.cd.detectChanges();

      this.setLegendItems();
      this.setOptions();
    }
  }

  setLegendItems() {
    this.chartLegend = [
      {
        iconColor: this.color,
        title: '已使用',
      },
      {
        iconColor: this.gray,
        title: '未使用',
      },
    ];
  }

  setOptions() {
    this.formatValue = Number((this.value * 100).toFixed(2));
    this.cd.detectChanges();
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
          radius: ['70%', '90%'],
          data: [
            {
              value: 100 - this.formatValue,
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
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: this.gray,
                    },
                    {
                      offset: 1,
                      color: this.gray,
                    },
                  ]),
                  shadowColor: this.gray,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
          ],
        },
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['60%', '96%'],
          data: [
            {
              value: 100 - this.formatValue,
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
                formatter: params => `未使用<br/>${params.value}%`,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1),
                },
              },
              hoverAnimation: false,
            },
            {
              value: this.formatValue,
              name: ' ',
              tooltip: {
                show: true,
                formatter: params => `已使用<br/>${params.value}%`,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: this.color,
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

  formatNumber(value: number): string {
    return value.toFixed(2);
  }
}
