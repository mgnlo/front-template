import { NgModule } from "@angular/core"
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTagModule, NbTimepickerModule, NbToggleModule } from "@nebular/theme"
import { FilePickerModule } from "ngx-awesome-uploader";
import { Element2RoutingModule } from "./element2-routing.module"
import { Element2Component } from "./element2.component"
import { CommonModule } from '@angular/common';
import { NbDateFnsDateModule } from "@nebular/date-fns";

@NgModule({
    imports: [
        CommonModule,
        Element2RoutingModule,
        NbButtonModule,
        NbCardModule,
        NbInputModule,
        NbTabsetModule,
        NbEvaIconsModule,
        NbIconModule,
        NbSelectModule,
        NbTimepickerModule,
        NbDatepickerModule.forRoot(),
        NbTimepickerModule.forRoot(),
        NbDateFnsDateModule,
        NbRadioModule,
        NbCheckboxModule,
        CKEditorModule,
        NbTagModule,
        FilePickerModule,
        NbSelectModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbToggleModule
    ],
    declarations: [
        Element2Component,
    ]
})
export class Element2PageModule { }
