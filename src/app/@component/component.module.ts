import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { RejectDialogComponent } from './dialog/reject-dialog/reject-dialog.component';
import { AgreeDialogComponent } from './dialog/agree-dialog/agree-dialog.component';
import { PaginatorComponent } from './table/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { DetailButtonComponent } from './table/detail-button/detail-button.component';
import { CheckboxIconComponent } from './table/checkbox-icon/checkbox-icon.component';

export const COMPONENTS = [
  AgreeDialogComponent,
  RejectDialogComponent,
  ConfirmDialogComponent,
  PaginatorComponent,
  CheckboxIconComponent,
  DetailButtonComponent,
];

export const NB_MODULES = [
  NbSpinnerModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbInputModule,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ...NB_MODULES],
  providers: [],
  exports: [...COMPONENTS],
})
export class ComponentModule { }
