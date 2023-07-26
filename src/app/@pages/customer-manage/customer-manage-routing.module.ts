import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component"
import { ActivityListComponent } from "./activity-list/activity-list.component"
import { ActivitySetComponent } from "./activity-set/activity-set.component"
import { PreviewDialogComponent } from "./activity-set/preview-dialog/preview.dialog.component"
import { CustomerListButtonComponent, CustomerListComponent, CustomerListTagComponent } from "./customer-list/customer-list.component"
import { DetailDialogComponent } from "./customer-list/detail-dialog/detail.dialog.component"
import { CustomerManageComponent } from "./customer-manage.component"

const routes: Routes = [
    {
        path: "", component: CustomerManageComponent, 
        children: [
            { path: '', redirectTo: 'customer-list', pathMatch: 'full'},
            { path: "customer-list", component: CustomerListComponent},
            { path: 'activity-list', component: ActivityListComponent},
            { path: 'activity-detail/:activityId', component: ActivityDetailComponent},
            { path: 'activity-set', component: ActivitySetComponent}, //新增
            { path: 'activity-set/:activityId', component: ActivitySetComponent}, //編輯
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
  ActivitySetComponent,
  ActivityDetailComponent,
  DetailDialogComponent,
  PreviewDialogComponent
];