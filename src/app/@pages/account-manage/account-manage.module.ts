import { NgModule } from "@angular/core"
import { NbEvaIconsModule } from "@nebular/eva-icons"
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbTreeGridModule } from "@nebular/theme"
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogService } from "@api/services/dialog.service";
import { ComponentModule } from "@component/component.module";
import { CustomerManageService } from "@pages/customer-manage/customer-manage.service";
import { ReviewManageRoutingModule } from "@pages/review-manage/review-manage-routing.module";
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
