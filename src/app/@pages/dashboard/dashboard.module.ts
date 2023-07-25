import { CommonModule } from '@common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@api/services/dialog.service';
import { ComponentModule } from '@component/component.module';
import { CustomerManageService } from '@pages/customer-manage/customer-manage.service';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    DashboardRoutingModule,
    Ng2SmartTableModule,
    ComponentModule,
  ],
  providers: [
    DialogService,
    CustomerManageService
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class DashboardModule { }
