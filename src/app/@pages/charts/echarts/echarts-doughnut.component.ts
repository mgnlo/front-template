import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
	selector: 'ngx-echarts-doughnut',
	template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsDoughnutComponent implements AfterViewInit, OnDestroy {
	options: any = {};
	themeSubscription: any;


	public data = [
		{ value: 335, name: '排程' },
		{ value: 310, name: '標籤' },
		{ value: 234, name: '名單' },
	];

	constructor(private theme: NbThemeService) {
	}

	ngAfterViewInit() {
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
					data: ['排程', '標籤', '名單'],
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
									'{value| ' + params.percent! * 2 + '%}'
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
		this.themeSubscription.unsubscribe();
	}
}
