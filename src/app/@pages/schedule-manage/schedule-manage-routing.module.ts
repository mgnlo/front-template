import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ScheduleManageComponent } from "./schedule-manage.component"
import { ScheduleListComponent } from "./schedule-list/schedule-list.component"
import { ScheduleAddComponent } from "./schedule-set/schedule-set.component"
import { ScheduleButtonComponent, ScheduleDetailComponent } from "./schedule-detail/schedule-detail.component"
import { ActivityButtonComponent, ActivityDetailComponent } from "./activity-detail/activity-detail.component"

const routes: Routes = [
  {
    path: "", component: ScheduleManageComponent,
    children: [
      { path: "schedule-list", component: ScheduleListComponent },
      { path: '', redirectTo: 'schedule-list', pathMatch: 'full' },
      { path: 'schedule-detail/:scheduleId', component: ScheduleDetailComponent },
      { path: 'schedule-set', component: ScheduleAddComponent },
      { path: 'schedule-set/:changeRoute/:scheduleId', component: ScheduleAddComponent}, //編輯
      { path: 'activity-detail/:scheduleId/:activityId', component: ActivityDetailComponent}, //名單查看
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleManageRoutingModule { }

export const routedComponents = [
  ScheduleManageComponent,
  ScheduleListComponent,
  ScheduleAddComponent,
  ScheduleDetailComponent,
  ActivityDetailComponent,
  ScheduleButtonComponent,
  ActivityButtonComponent,
];
