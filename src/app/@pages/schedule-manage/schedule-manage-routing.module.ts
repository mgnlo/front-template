import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ScheduleManageComponent } from "./schedule-manage.component"
import { ScheduleListComponent } from "./activity/schedule-activity-list/schedule-activity-list.component"
import { ScheduleButtonComponent, ScheduleDetailComponent } from "./activity/schedule-activity-detail/schedule-activity-detail.component"
import { ActivityButtonComponent, ActivityDetailComponent } from "./activity/schedule-activity-export-detail/schedule-activity-export-detail.component"
import { ScheduleAddComponent } from "./activity/schedule-activity-set/schedule-activity-set.component"
import { PreviewDialogComponent } from "./activity/schedule-activity-set/preview-dialog/preview.dialog/preview-dialog.component"

const routes: Routes = [
  {
    path: "", component: ScheduleManageComponent,
    children: [
      { path: '', redirectTo: 'schedule-manage', pathMatch: 'full' },
      { path: "schedule-activity-list", component: ScheduleListComponent, data: {keepSession: true}},
      { path: 'schedule-activity-detail/:scheduleId', component: ScheduleDetailComponent, data: {keepSession: true}},
      { path: 'schedule-activity-set', component: ScheduleAddComponent },
      { path: 'schedule-activity-set/:changeRoute/:scheduleId', component: ScheduleAddComponent}, //編輯
      { path: 'schedule-activity-export-detail/:scheduleId/:activityId', component: ActivityDetailComponent, data: {keepSession: true}}, //名單查看
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
  PreviewDialogComponent
];
