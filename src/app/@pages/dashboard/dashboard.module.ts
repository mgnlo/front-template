import { CommonModule } from '@common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '@component/component.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { DashboardService } from './dashboard.service';
import { DashboardRoomComponent } from './dashboard-room/dashboard-room.component';
import { DashboardEchartsTreeComponent } from './dashboard-room/echarts/dashboard-echarts-tree.component';
import { DashboardEchartsTreemapHotComponent } from './dashboard-room/echarts/dashboard-echarts-treemap-hot.component';
import { DashboardEchartsTreemapCoolComponent } from './dashboard-room/echarts/dashboard-echarts-treemap-cool.component';
import { DashboardEchartsDoughnutComponent } from './dashboard-room/echarts/dashboard-echarts-doughnut.component';
import { DashboardEchartsLineComponent } from './dashboard-room/echarts/dashboard-echarts-line.component';
import { NgxEchartsModule } from 'ngx-echarts';

const components = [
  DashboardEchartsTreeComponent,
  DashboardEchartsTreemapHotComponent,
  DashboardEchartsTreemapCoolComponent,
  DashboardEchartsDoughnutComponent,
  DashboardEchartsLineComponent,
  DashboardRoomComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    DashboardRoutingModule,
    Ng2SmartTableModule,
    ComponentModule,
    NbCardModule,
    NbIconModule,
    NgxEchartsModule,
  ],
  providers: [
    DashboardService,
  ],
  declarations: [
    ...routedComponents,...components
  ],
})
export class DashboardModule { }
