import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { ReviewDialogComponent } from './dialog/review-dialog/review-dialog.component';
import { BasicInputComponent } from './form/basic-input/input.component';
import { DateRangeComponent } from './form/date-range/date-range.component';
import { DropdownComponent } from './form/dropdown/dropdown.component';
import { RadioComponent } from './form/radio/radio.component';
import { CheckboxIconComponent } from './table/checkbox-icon/checkbox-icon.component';
import { ColumnButtonComponent } from './table/column-button/column-button.component';
import { DetailButtonComponent } from './table/detail-button/detail-button.component';
import { PaginatorComponent } from './table/paginator/paginator.component';
import { CheckboxColumnComponent } from './table/checkbox-column.ts/checkbox.component';
import { StatusDialogComponent } from './dialog/status-dialog/status-dialog.component';
import { DownloadFileComponent } from './form/file/download-file/download-file.component';
import { UploadFileComponent } from './form/file/upload-file/upload-file.component';
import { CheckboxGroupComponent } from './form/checkbox-group/checkbox-group.component';

export const COMPONENTS = [
  StatusDialogComponent,
  ConfirmDialogComponent,
  AlertDialogComponent,
  PaginatorComponent,
  CheckboxIconComponent,
  ColumnButtonComponent,
  DetailButtonComponent,
  BasicInputComponent,
  RadioComponent,
  CheckboxColumnComponent,
  DropdownComponent,
  DateRangeComponent,
  ReviewDialogComponent,
  DownloadFileComponent,
  UploadFileComponent,
  CheckboxGroupComponent
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
  NbCheckboxModule,
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
