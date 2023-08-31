import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountManageComponent } from "./account-manage.component";
import { ConsoleGroupDetailComponent } from "./console-group-detail/console-group-detail.component";
import { ConsoleGroupListComponent } from "./console-group-list/console-group-list.component";
import { ConsoleGroupSetComponent } from "./console-group-set/console-group-set.component";
import { ChangeDialogComponent } from "./console-user/change-dialog/change.dialog.component";
import { ConsoleUserComponent } from "./console-user/console-user.component";

const routes: Routes = [
    {
        path: "", component: AccountManageComponent,
        children: [
            { path: '', redirectTo: 'console-group-list', pathMatch: 'full' },
            { path: 'console-group-list', component: ConsoleGroupListComponent, data: { keepSession: true}},
            { path: 'console-group-detail/:groupId', component: ConsoleGroupDetailComponent, data: { keepSession: true}},
            { path: 'console-group-set', component: ConsoleGroupSetComponent}, //add
            { path: 'console-group-set/:changeRoute/:groupId', component: ConsoleGroupSetComponent}, //edit or copy
            { path: "console-user", component: ConsoleUserComponent}
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
    ConsoleGroupDetailComponent,
    ConsoleGroupSetComponent,
    ConsoleUserComponent,
    ChangeDialogComponent
];