import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityAddComponent } from "./activity-add/activity-add.component"
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component"
import { ActivityButtonComponent, ActivityListCeckboxComponent, ActivityListComponent } from "./activity-list/activity-list.component"
import { DetailDialogComponent } from "./user-list/detail-dialog/detail.dialog.component"
import { UserListTagComponent, UserListButtonComponent, UserListComponent } from "./user-list/user-list.component"
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
            { path: 'activity-detail', component: ActivityDetailComponent},
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
  UserListButtonComponent,
  UserListTagComponent,
  ActivityListComponent,
  ActivityAddComponent,
  ActivityDetailComponent,
  ActivityButtonComponent,
  ActivityListCeckboxComponent,
  DetailDialogComponent
];