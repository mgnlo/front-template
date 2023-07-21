import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ScheduleManageComponent } from "./schedule-manage.component"
import { ScheduleListComponent } from "./schedule-activity-list/schedule-activity-list.component"
import { ScheduleAddComponent } from "./schedule-activity-set/schedule-activity-set.component"
import { ScheduleButtonComponent, ScheduleDetailComponent } from "./schedule-activity-detail/schedule-activity-detail.component"
import { ActivityButtonComponent, ActivityDetailComponent } from "./activity-detail/activity-detail.component"

const routes: Routes = [
  {
    path: "", component: ScheduleManageComponent,
    children: [
      { path: '', redirectTo: 'schedule-manage', pathMatch: 'full' },
      { path: "schedule-activity-list", component: ScheduleListComponent },
      { path: 'schedule-activity-detail/:scheduleId', component: ScheduleDetailComponent },
      { path: 'schedule-activity-set', component: ScheduleAddComponent },
      { path: 'schedule-activity-set/:changeRoute/:scheduleId', component: ScheduleAddComponent}, //編輯
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
