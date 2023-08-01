import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { TreeMapSeriesData, TreeSeriesData } from '@api/models/dashboard.model';
import { NbThemeService } from '@nebular/theme';

@Component({
	selector: 'ngx-echarts-tree',
	template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsTreeComponent implements AfterViewInit, OnDestroy {
	@Input() data: TreeSeriesData;
	options: any = {};
	themeSubscription: any;

	constructor(private theme: NbThemeService) {
		let x = 0;
	}

	ngAfterViewInit() {
		console.log(this.data);
		requestAnimationFrame(() =>{
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
		});		
	}

	ngOnDestroy(): void {
		this.themeSubscription.unsubscribe();
	}
}
