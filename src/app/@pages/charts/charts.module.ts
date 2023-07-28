import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsTreeComponent } from './echarts/echarts-tree.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { EchartsTreemapHotComponent } from './echarts/echarts-treemap-hot.component';
import { EchartsTreemapCoolComponent } from './echarts/echarts-treemap-cool.component';
import { EchartsDoughnutComponent } from './echarts/echarts-doughnut.component';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { MultiRangeComponent } from './apex_chart/multi-range.component';
import { EchartsTimelineMultiRangeComponent } from './echarts/echarts-timeline-multi-range.component';



const components = [
  EchartsLineComponent,
  EchartsTreeComponent,
  EchartsTreemapHotComponent,
  EchartsTreemapCoolComponent,
  EchartsPieComponent,
  EchartsDoughnutComponent,
  EchartsBarComponent,
  EchartsAreaStackComponent,
  EchartsRadarComponent,  
  MultiRangeComponent,
  EchartsTimelineMultiRangeComponent
];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NbCardModule,
    NbIconModule,
    // NgApexchartsModule
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
