import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTabsetModule,
  NbTagModule,
} from '@nebular/theme';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { ElementRoutingModule } from './element-routing.module';
import { ElementComponent } from './element.component';
import { CommonModule } from '@angular/common';
import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({
  imports: [
    CommonModule,
    ElementRoutingModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbTabsetModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSelectModule,
    NbDateFnsDateModule,
    NbDatepickerModule,
    NbRadioModule,
    NbCheckboxModule,
    CKEditorModule,
    NbTagModule,
    FilePickerModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbAccordionModule,
    NbDateFnsDateModule.forChild({}),
  ],
  declarations: [ElementComponent],
})
export class ElementPageModule {}
