import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '@api/services/dialog.service';
import { CommonModule } from '@common/common.module';
import { ComponentModule } from '@component/component.module';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTreeGridModule
} from '@nebular/theme';
import { TagManageService } from '@pages/tag-manage/tag-manage.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, ReviewManageRoutingModule } from './review-manage-routing.module';
import { ReviewManageService } from './review-manage.service';

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
  NbDateFnsDateModule.forChild({ format: 'yyyy-MM-dd' }),
  NbDialogModule.forChild(),
  NbTagModule,
  NbAccordionModule,
  NbTabsetModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    ReviewManageRoutingModule,
    Ng2SmartTableModule,
    ComponentModule,
    ...NB_MODULES
  ],
  providers: [
    DialogService,
    ReviewManageService,
    TagManageService,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ReviewManageModule { }
