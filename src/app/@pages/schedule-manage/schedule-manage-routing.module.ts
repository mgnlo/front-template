import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ScheduleManageComponent } from "./schedule-manage.component"
import { ScheduleListComponent } from "./schedule-list/schedule-list.component"
import { ScheduleButtonComponent } from "./schedule-list/schedule-list.component"
import { ScheduleAddComponent } from "./schedule-set/schedule-set.component"
import { ScheduleDetailComponent } from "./schedule-detail/schedule-detail.component"

const routes: Routes = [
  {
    path: "", component: ScheduleManageComponent,
    children: [
      { path: "schedule-list", component: ScheduleListComponent },
      { path: '', redirectTo: 'schedule-list', pathMatch: 'full' },
      { path: 'schedule-detail', component: ScheduleDetailComponent },
      { path: 'schedule-set', component: ScheduleAddComponent },
      { path: 'schedule-set/:changeRoute/:scheduleId', component: ScheduleAddComponent}, //編輯
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
  ScheduleButtonComponent,
  ScheduleAddComponent,
  ScheduleDetailComponent,
];
