import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { PaginatorComponent } from './table/paginator/paginator.component';

export const COMPONENTS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  PaginatorComponent,
];

export const NB_MODULES = [
  NbSpinnerModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...NB_MODULES],
  providers: [],
  exports: [...COMPONENTS],
})
export class ComponentModule { }
