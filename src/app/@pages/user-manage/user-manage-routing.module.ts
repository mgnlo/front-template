import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityAddComponent } from "./activity-add/activity-add.component"
import { PreviewDialogComponent } from "./activity-add/preview-dialog/preview.dialog.component"
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component"
import { ActivityButtonComponent, ActivityListCeckboxComponent, ActivityListComponent } from "./activity-list/activity-list.component"
import { DetailDialogComponent } from "./user-list/detail-dialog/detail.dialog.component"
import { UserListTagComponent, UserListButtonComponent, UserListComponent } from "./user-list/user-list.component"
import { UserManageComponent } from "./user-manage.component"

const routes: Routes = [
    {
        path: "", component: UserManageComponent, 
        children: [
            { path: '', redirectTo: 'user-list', pathMatch: 'full'},
            { path: "user-list", component: UserListComponent },
            { path: 'activity-list', component: ActivityListComponent},
            { path: 'activity-detail', component: ActivityDetailComponent},
            { path: 'activity-add', component: ActivityAddComponent}, //新增
            { path: 'activity-add/:activityId', component: ActivityAddComponent}, //編輯
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
  DetailDialogComponent,
  PreviewDialogComponent
];