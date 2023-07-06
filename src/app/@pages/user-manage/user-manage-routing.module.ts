import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityAddComponent } from "./activity-add/activity-add.component"
import { ActivityConfirmComponent } from "./activity-confirm/activity-confirm.component"
import { ActivityButtonComponent, ActivityListComponent, CeckboxComponent } from "./activity-list/activity-list.component"
import { ButtonComponent, TagComponent, UserListComponent } from "./user-list/user-list.component"
import { UserManageComponent } from "./user-manage.component"

const routes: Routes = [
    {
        path: "", component: UserManageComponent, 
        children: [
            { path: "user-list", component: UserListComponent },
            // {
            //   path: 'edit/:id',
            //   component: SystemManageEditComponent, //編輯
            // },
            { path: '', redirectTo: 'user-list', pathMatch: 'full'},
            { path: 'activity-list', component: ActivityListComponent},
            { path: 'activity-add', component: ActivityAddComponent},
            { path: 'activity-confirm', component: ActivityConfirmComponent},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManageRoutingModule { }

export const routedComponents = [
  UserManageComponent,
  UserListComponent,
  ActivityListComponent,
  ActivityAddComponent,
  ActivityConfirmComponent,
  ActivityButtonComponent,
  CeckboxComponent,
  ButtonComponent,
  TagComponent,
];