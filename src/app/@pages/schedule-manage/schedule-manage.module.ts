import { CommonModule } from '@common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTreeGridModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, ScheduleManageRoutingModule } from './schedule-manage-routing.module';
import { ScheduleManageService } from './schedule-manage.service';
import { ComponentModule } from "../../@component/component.module";
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

export const NB_MODULES = [
  NbSpinnerModule,
  NbCardModule,
  NbTreeGridModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCheckboxModule,
  NbRadioModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbDatepickerModule,
  NbAccordionModule,
  NbDateFnsDateModule.forChild({ format: 'yyyy/MM/dd' }),
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    ScheduleManageRoutingModule,
    Ng2SmartTableModule,
    ComponentModule,
    ...NB_MODULES
  ],
  providers: [
    ScheduleManageService
  ],
  declarations: [
    ...routedComponents,
    ScheduleAddComponent,
    ScheduleDetailComponent,
  ],
})
export class ScheduleManageModule { }
