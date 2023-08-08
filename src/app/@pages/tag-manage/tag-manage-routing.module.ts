import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { TagManageComponent } from "./tag-manage.component"
import { TagListComponent } from "./tag-list/tag-list.component"
import { TagAddComponent } from "./tag-set/tag-set.component"
import { TagDetailComponent } from "./tag-detail/tag-detail.component"
import { TagConditionDialogComponent } from "./tag-set/condition-dialog/condition-dialog.component"
import { ConditionChartLineComponent } from "./tag-set/condition-chart-line/condition-chart-line.component"
import { CustomerManageService } from "@pages/customer-manage/customer-manage.service"

const routes: Routes = [
  {
    path: "", component: TagManageComponent,
    children: [
      { path: '', redirectTo: 'tag-list', pathMatch: 'full' },
      { path: "tag-list", component: TagListComponent, data: { keepSession: true } },
      { path: 'tag-detail/:tagId', component: TagDetailComponent, data: { keepSession: true } },
      { path: 'tag-set', component: TagAddComponent },
      { path: 'tag-set/:changeRoute/:tagId', component: TagAddComponent }, //編輯 or 複製
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: CustomerManageService },]
})
export class TagManageRoutingModule { }

export const routedComponents = [
  TagManageComponent,
  TagListComponent,
  TagAddComponent,
  TagDetailComponent,
  TagConditionDialogComponent,
  ConditionChartLineComponent,
];
