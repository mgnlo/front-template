import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { PieSeriesData } from '@api/models/dashboard.model';
import { NbThemeService } from '@nebular/theme';

import * as echarts from 'echarts';

@Component({
	selector: 'ngx-echarts-doughnut',
	template: `
    <div #echartsContainer echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsDoughnutComponent implements AfterViewInit, OnDestroy {
	@ViewChild('echartsContainer', { static: true }) echartsContainer!: ElementRef;
	
	private _data: Array<PieSeriesData>;

	get data(): Array<PieSeriesData> {
		return this._data;
	}

	@Input() set data(value: Array<PieSeriesData>) {
		this._data = value;
		this.refresh();
	}


	options: any = {};
	themeSubscription: any;
	chart: echarts.ECharts;
	reviewCaseNames = [];

	constructor(private theme: NbThemeService) {
	}

	ngAfterViewInit() {
		this.prepareOption();
		this.chart = echarts.init(this.echartsContainer.nativeElement);
	}

	prepareOption(){
		if(this.themeSubscription){
			this.themeSubscription.unsubscribe();
		}

		this.data.filter(item => this.reviewCaseNames.push(item.name));
		this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
			const colors = config.variables;
			const echarts: any = config.variables.echarts;

			this.options = {
				backgroundColor: echarts.bg,
				color: ["#FF3D71", "#FFAA00", '#29A7E6'],
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: this.reviewCaseNames,
					textStyle: {
						color: echarts.textColor,
					},
				},
				series: [
					{
						type: 'pie',
						data: this.data,
						center: ['50%', '50%'],
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: true,
							position: 'inside',
							formatter: function (params: { name: string; percent: any; }) {
								let arr = [
									'{name|' + params.name + '}',
									'{value| ' + params.percent + '%}'
								];
								return arr.join('\n');
							},
							rich: {
								name: {
									fontSize: 14,
									fontWeight: 'bold',
									color: '#fff'
								},
								value: {
									fontSize: 12,
									lineHeight: 30,
									color: '#fff'
								},
							}
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 40,
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						tooltip: {
							show: false
						}
					},
				],
			};
		});
	}

	ngOnDestroy(): void {
		if(!!this.themeSubscription)
		this.themeSubscription.unsubscribe();
	}

	refresh() {
		if(this.chart){
			this.reviewCaseNames = []
			this.prepareOption();
		}
	}
}
