import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { ApproveDialogComponent } from './dialog/approve-dialog/approve-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { RejectDialogComponent } from './dialog/reject-dialog/reject-dialog.component';
import { CheckboxIconComponent } from './table/checkbox-icon/checkbox-icon.component';
import { DetailButtonComponent } from './table/detail-button/detail-button.component';
import { PaginatorComponent } from './table/paginator/paginator.component';
import { DateRangeComponent } from './form/date-range/date-range.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { BasicInputComponent } from './form/basic-input/input.component';
import { DropdownComponent } from './form/dropdown/dropdown.component';
import { RadioComponent } from './form/radio/radio.component';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';

export const COMPONENTS = [
  ApproveDialogComponent,
  RejectDialogComponent,
  ConfirmDialogComponent,
  AlertDialogComponent,
  PaginatorComponent,
  CheckboxIconComponent,
  DetailButtonComponent,
  BasicInputComponent,
  RadioComponent,
  DropdownComponent,
  DateRangeComponent
];

export const NB_MODULES = [
  NbSpinnerModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbRadioModule,
  NbDatepickerModule,
  NbDateFnsDateModule.forChild({ format: 'yyyy-MM-dd' }),
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ...NB_MODULES],
  providers: [],
  exports: [...COMPONENTS],
})
export class ComponentModule { }
