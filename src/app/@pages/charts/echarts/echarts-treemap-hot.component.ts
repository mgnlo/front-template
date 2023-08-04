import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { TreeMapSeriesData } from '@api/models/dashboard.model';
import { NbThemeService } from '@nebular/theme';

@Component({
	selector: 'ngx-echarts-treemap-hot',
	template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTreemapHotComponent implements AfterViewInit, OnDestroy {
	@Input() data: Array<TreeMapSeriesData>;

	options: any = {};
	themeSubscription: any;

	constructor(private theme: NbThemeService) {
	}

	ngAfterViewInit() {
		this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
			this.options = {
				series: [
					{
						type: 'treemap',
						width: '100%',
						height: '100%',
						data: this.data,
						roam: 'move',
						leafDepth: 2,
						colorAlpha: [0.3, 1],
						breadcrumb: {
							show: false
						},
					}
				],
				label: {
					position: 'insideTopLeft',
					formatter: function (params: { name: string; value: any; }) {
						let arr = [
							'{name|' + params.name + '}',
							'{value| ' + params.value + '}'
							// echarts.format.addCommas(params.value)
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
				legend: {
					show: false,
				},
				color: ['#FF3D71'],
			}
		});
	}

	ngOnDestroy(): void {
		this.themeSubscription.unsubscribe();
	}
}
