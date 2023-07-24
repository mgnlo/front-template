import { CommonModule } from '@common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTreeGridModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, TagManageRoutingModule } from './tag-manage-routing.module';
import { TagManageService } from './tag-manage.service';
import { ComponentModule } from '@component/component.module';

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
  NbDateFnsDateModule.forChild({ format: 'yyyy-MM-dd' }),
  NbDialogModule.forChild(),
  NbTagModule,
  NbTabsetModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    TagManageRoutingModule,
    Ng2SmartTableModule,
    ComponentModule,
    ...NB_MODULES
  ],
  providers: [
    TagManageService
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class TagManageModule { }
