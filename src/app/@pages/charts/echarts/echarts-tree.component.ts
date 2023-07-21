import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
	selector: 'ngx-echarts-tree',
	template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTreeComponent implements AfterViewInit, OnDestroy {
	options: any = {};
	themeSubscription: any;

	public data = {
		"name": "標籤",
		"children": [
			{
				"name": "構面一",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
			{
				"name": "構面二",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
			{
				"name": "構面三",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
			{
				"name": "構面四",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
			{
				"name": "構面五",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
			{
				"name": "構面六",
				"children": [
					{ "name": "子構面1 標籤共33個" },
					{ "name": "子構面2 標籤共88個" },
					{ "name": "子構面3 標籤共8個" },
				]
			},
		]
	};

	constructor(private theme: NbThemeService) {
	}

	ngAfterViewInit() {
		this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

			const colors: any = config.variables;
			const echarts: any = config.variables.echarts;

			this.options = {
				tooltip: {
					trigger: 'item',
					triggerOn: 'mousemove'
				},
				series: [
					{
						type: 'tree',
						data: [this.data],
						top: '1%',
						left: '7%',
						bottom: '1%',
						right: '20%',
						symbolSize: 7,
						label: {
							position: 'left',
							verticalAlign: 'middle',
							align: 'right',
							fontSize: 9
						},
						itemStyle: {
							color: "rgba(126, 126, 126, 1)",
							borderColor: "rgba(126, 126, 126, 1)"
						},
						leaves: {
							label: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							}
						},
						emphasis: {
							focus: 'descendant'
						},
						expandAndCollapse: true,
						animationDuration: 550,
						animationDurationUpdate: 750
					}
				],
			};
		});
	}

	ngOnDestroy(): void {
		this.themeSubscription.unsubscribe();
	}
}
