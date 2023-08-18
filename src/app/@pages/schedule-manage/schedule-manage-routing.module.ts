import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ScheduleDetailComponent } from "./activity/schedule-activity-detail/schedule-activity-detail.component"
import { ActivityExportDetailComponent } from "./activity/schedule-activity-export-detail/schedule-activity-export-detail.component"
import { ScheduleListComponent } from "./activity/schedule-activity-list/schedule-activity-list.component"
import { PreviewDialogComponent } from "./activity/schedule-activity-set/preview-dialog/preview.dialog/preview-dialog.component"
import { ScheduleAddComponent } from "./activity/schedule-activity-set/schedule-activity-set.component"
import { ScheduleManageComponent } from "./schedule-manage.component"
import { ScheduleTagDetailComponent } from "./tag/schedule-tag-detail/schedule-tag-detail.component"
import { ScheduleTagExportDetailComponent } from "./tag/schedule-tag-export-detail/schedule-tag-export-detail.component"

const routes: Routes = [
  {
    path: "", component: ScheduleManageComponent,
    children: [
      { path: '', redirectTo: 'schedule-manage', pathMatch: 'full' },
      //活動列表
      { path: "schedule-activity-list", component: ScheduleListComponent, data: {keepSession: true}},
      { path: 'schedule-activity-detail/:scheduleId', component: ScheduleDetailComponent, data: {keepSession: true}},
      { path: 'schedule-activity-set', component: ScheduleAddComponent },
      { path: 'schedule-activity-set/:changeRoute/:scheduleId', component: ScheduleAddComponent}, //編輯
      { path: 'schedule-activity-export-detail/:scheduleId/:referenceId', component: ActivityExportDetailComponent, data: {keepSession: true}}, //名單查看

      //標籤列表
      { path: "schedule-tag-detail", component: ScheduleTagDetailComponent, data: {keepSession: true}},
      { path: "schedule-tag-export-detail/:tagId", component: ScheduleTagExportDetailComponent, data: {keepSession: true}},
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
  ActivityExportDetailComponent,
  PreviewDialogComponent,
  ScheduleTagDetailComponent,
  ScheduleTagExportDetailComponent,
];
