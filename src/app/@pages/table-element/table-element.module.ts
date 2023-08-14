import { NgModule } from "@angular/core"
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { NbAccordionModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTagModule, NbToggleModule } from "@nebular/theme"
import { TableElementComponent } from "./table-element.component"
import { CommonModule } from '@angular/common';
import { TableElementRoutingModule } from "./table-element-routing.module"
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ButtonColumnComponent } from "./custom-column/button.component";
import { CheckboxColumnComponent } from "./custom-column/checkbox.component";
import { RadioColumnComponent } from "./custom-column/radio.component";
import { StatusColumnComponent } from "./custom-column/status.component";
import { TagColumnComponent } from "./custom-column/tag.component";
import { ToggleColumnComponent } from "./custom-column/toggle.component";
@NgModule({
    imports: [
        CommonModule,
        TableElementRoutingModule,
        Ng2SmartTableModule,
        NbButtonModule,
        NbCardModule,
        NbInputModule,
        NbTabsetModule,
        NbEvaIconsModule,
        NbIconModule,
        NbSelectModule,
        NbRadioModule,
        NbCheckboxModule,
        NbTagModule,
        NbAutocompleteModule,
        NbAccordionModule,
        NbToggleModule,
    ],
    declarations: [
        TableElementComponent,
        ButtonColumnComponent,
        StatusColumnComponent,
        ToggleColumnComponent,
        CheckboxColumnComponent,
        RadioColumnComponent,
        TagColumnComponent,
    ]
})
export class TablePageModule { }
