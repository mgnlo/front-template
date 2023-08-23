import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentModule } from "@component/component.module";
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTreeGridModule } from "@nebular/theme";
import { ThemeModule } from "@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { AccountManageRoutingModule, routedComponents } from "./account-manage-routing.module";
import { AccountManageService } from "./account.manage.service";

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
    NbDateFnsDateModule.forChild({ format: 'yyyy/MM/dd' }),
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
        AccountManageRoutingModule,
        Ng2SmartTableModule,
        ComponentModule,
        ...NB_MODULES
    ],
    providers: [
        AccountManageService
    ],
    declarations: [
        ...routedComponents,
    ],
})

export class AccountManageModule { }
