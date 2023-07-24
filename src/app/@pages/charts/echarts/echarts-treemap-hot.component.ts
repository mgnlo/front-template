import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
	selector: 'ngx-echarts-treemap-hot',
	template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTreemapHotComponent implements AfterViewInit, OnDestroy {
	options: any = {};
	themeSubscription: any;

	public data = [
		{
			name: '熱門名單採用標籤',
			children: [
				{ name: '近一個月_基金_申購金額_高', value: 494 },
				{ name: '近三個月_基金_申購金額_高', value: 394 },
				{ name: '近六個月_基金_申購金額_高', value: 274 },
				{ name: '近一個月_信用卡_消費金額_高', value: 144 },
				{ name: '近一個月_信用卡_消費金額_中', value: 134 },
				{ name: '近三個月_信用卡_消費金額_低', value: 94 },
				{ name: '近一個月_基金_申購金額_低', value: 74 },
				{ name: '信用卡戶', value: 44 },
				{ name: '居住地_高雄市', value: 34 },
				{ name: '居住地_新北市', value: 24 },
			],
		}
	];

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
							'{value|$ ' + params.value + '}'
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
