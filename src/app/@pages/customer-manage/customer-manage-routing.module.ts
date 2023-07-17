import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityAddComponent } from "./activity-add/activity-add.component"
import { PreviewDialogComponent } from "./activity-add/preview-dialog/preview.dialog.component"
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component"
import { ActivityButtonComponent, ActivityListCeckboxComponent, ActivityListComponent } from "./activity-list/activity-list.component"
import { CustomerManageComponent } from "./customer-manage.component"
import { CustomerListButtonComponent, CustomerListComponent, CustomerListTagComponent } from "./customer-list/customer-list.component"
import { DetailDialogComponent } from "./customer-list/detail-dialog/detail.dialog.component"

const routes: Routes = [
    {
        path: "", component: CustomerManageComponent, 
        children: [
            { path: '', redirectTo: 'customer-list', pathMatch: 'full'},
            { path: "customer-list", component: CustomerListComponent },
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
  CustomerManageComponent,
  CustomerListComponent,
  CustomerListButtonComponent,
  CustomerListTagComponent,
  ActivityListComponent,
  ActivityAddComponent,
  ActivityDetailComponent,
  ActivityButtonComponent,
  ActivityListCeckboxComponent,
  DetailDialogComponent,
  PreviewDialogComponent
];