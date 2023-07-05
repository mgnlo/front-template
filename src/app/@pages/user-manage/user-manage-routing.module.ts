import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityButtonComponent, ActivityListComponent, CeckboxComponent} from "./activity-list/activity-list.component"
import { ButtonComponent, TagComponent, UserListComponent } from "./user-list/user-list.component"
import { UserManageComponent } from "./user-manage.component"

const routes: Routes = [
    {
        path: "", component: UserManageComponent, 
        children: [
            { path: "user-list", component: UserListComponent },
            { path: "activity-list", component: ActivityListComponent },
            // { path: "", redirectTo: "prmote-list", pathMatch: "full" },
            // {
            //   path: 'edit/:id',
            //   component: SystemManageEditComponent, //編輯
            // },
            {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
            },
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
  TagComponent,
  ButtonComponent,
  CeckboxComponent,
  ActivityButtonComponent
];