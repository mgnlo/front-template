import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AccountManageComponent } from "./account-manage.component"
import { ConsoleGroupButtonComponent, ConsoleGroupListComponent } from "./console-group-list/console-group-list.component";
import { ConsoleGroupDetailCheckboxComponent, ConsoleGroupDetailComponent } from "./console-group-detail/console-group-detail.component";
import { ConsoleGroupEditCheckboxComponent, ConsoleGroupEditComponent } from "./console-group-edit/console-group-edit.component";
import { ConsoleGroupAddCheckboxComponent, ConsoleGroupAddComponent } from "./console-group-add/console-group-add.component";

const routes: Routes = [
    {
        path: "", component: AccountManageComponent, 
        children: [
            { path: '', redirectTo: 'account-manage', pathMatch: 'full'},
            { path: "console-group-list", component: ConsoleGroupListComponent },
            { path: "console-group-detail", component: ConsoleGroupDetailComponent },
            { path: "console-group-edit", component: ConsoleGroupEditComponent },
            { path: "console-group-add", component: ConsoleGroupAddComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountManageRoutingModule { }

export const routedComponents = [
    AccountManageComponent,
    ConsoleGroupListComponent,
    ConsoleGroupButtonComponent,
    ConsoleGroupDetailComponent,
    ConsoleGroupDetailCheckboxComponent,
    ConsoleGroupEditComponent,
    ConsoleGroupEditCheckboxComponent,
    ConsoleGroupAddComponent,
    ConsoleGroupAddCheckboxComponent
];