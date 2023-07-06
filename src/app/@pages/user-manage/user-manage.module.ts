import { CommonModule } from '@angular/common';
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
import { routedComponents, UserManageRoutingModule } from './user-manage-routing.module';
import { UserManageService } from './user-manage.service';

@NgModule({
  imports: [
    CommonModule,
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
    NbDateFnsDateModule.forChild({ format: 'yyyy/MM/dd' }),
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    UserManageRoutingModule,
    Ng2SmartTableModule,
    NbAccordionModule,
  ],
  providers: [
    UserManageService,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class UserManageModule { }
