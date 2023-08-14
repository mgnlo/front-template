import { NgModule } from "@angular/core"
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbToastrModule } from "@nebular/theme"
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FilePickerModule } from "ngx-awesome-uploader";
import { ElementRoutingModule } from "./element-routing.module"
import { CommonModule } from '@angular/common';
import { ElementComponent } from "./element.component";
import { TextDialogComponent } from "@pages/dialog/textDialog/textDialog";
import { ConfirmDialogComponent } from "@pages/dialog/confirmDialog/confirmDialog";
import { StatusDialogComponent } from "@pages/dialog/statusDialog/statusDialog";

@NgModule({
    imports: [
        CKEditorModule,
        CommonModule,
        ElementRoutingModule,
        FilePickerModule,
        NbAccordionModule,
        NbAutocompleteModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbEvaIconsModule,
        NbIconModule,
        NbInputModule,
        NbListModule,
        NbRadioModule,
        NbSelectModule,
        NbTabsetModule,
        NbTagModule,
        NbToastrModule.forRoot(),
    ],
    declarations: [
        ElementComponent,
        TextDialogComponent,
        ConfirmDialogComponent,
        StatusDialogComponent,
    ]
})
export class ElementPageModule { }
