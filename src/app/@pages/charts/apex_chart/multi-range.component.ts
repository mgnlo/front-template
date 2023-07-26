import { Component, ViewChild } from '@angular/core';
import * as moment from "moment";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexPlotOptions,
    ApexXAxis,
    ApexFill,
    ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    fill: ApexFill;
    legend: ApexLegend;
    xaxis: ApexXAxis;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'apex-multi-range',
    templateUrl: './multi-range.component.html',
})
export class MultiRangeComponent {
    @ViewChild("chart") chart: ChartComponent;

    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "標籤群組(前三名)",
                    data: [
                        {
                            x: "標籤一",
                            y: [
                                new Date("2019-03-05").getTime(),
                                new Date("2019-03-08").getTime()
                            ]
                        },
                        {
                            x: "標籤一",
                            y: [
                                new Date("2019-03-01").getTime(),
                                new Date("2019-03-03").getTime()
                            ]
                        },
                        {
                            x: "標籤一",
                            y: [
                                new Date("2019-03-20").getTime(),
                                new Date("2019-03-26").getTime()
                            ]
                        },
                        {
                            x: "標籤二",
                            y: [
                                new Date("2019-03-02").getTime(),
                                new Date("2019-03-05").getTime()
                            ],
                            fillColor: '#FFFF33'
                        },
                        {
                            x: "標籤二",
                            y: [
                                new Date("2019-03-013").getTime(),
                                new Date("2019-03-023").getTime()
                            ],
                            fillColor: '#FFFF33'
                        },
                        {
                            x: "標籤三",
                            y: [
                                new Date("2019-03-05").getTime(),
                                new Date("2019-03-07").getTime()
                            ],
                            fillColor: '#00DD00'
                        },
                        {
                            x: "標籤三",
                            y: [
                                new Date("2019-03-11").getTime(),
                                new Date("2019-03-17").getTime()
                            ],
                            fillColor: '#00DD00'
                        },
                        {
                            x: "標籤三",
                            y: [
                                new Date("2019-03-25").getTime(),
                                new Date("2019-03-27").getTime()
                            ],
                            fillColor: '#00DD00'
                        }
                    ]
                }
            ],
            chart: {
                height: 450,
                type: "rangeBar"
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: "80%"
                }
            },
            xaxis: {
                type: "datetime"
            },
            fill: {
                type: "solid"
            },
            legend: {
                position: "top",
                horizontalAlign: "left"
            }
        };
    }
}
