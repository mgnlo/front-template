import { NgModule } from "@angular/core"
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTagModule } from "@nebular/theme"
import { FilePickerModule } from "ngx-awesome-uploader";
import { ElementRoutingModule } from "./element-routing.module"
import { CommonModule } from '@angular/common';
import { ElementComponent } from "./element.component";


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
        NbDatepickerModule.forRoot(),
        NbRadioModule,
        NbCheckboxModule,
        CKEditorModule,
        NbTagModule,
        FilePickerModule,
        NbSelectModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbListModule,
        NbDialogModule.forRoot(),
    ],
    declarations: [
        ElementComponent
    ]
})
export class ElementPageModule { }
