import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { TagManageComponent } from "./tag-manage.component"
import { TagListComponent } from "./tag-list/tag-list.component"
import { TagButtonComponent } from "./tag-list/tag-list.component"
import { TagAddComponent } from "./tag-add/tag-add.component"
import { TagDetailComponent } from "./tag-detail/tag-detail.component"

const routes: Routes = [
  {
    path: "", component: TagManageComponent,
    children: [
      { path: "tag-list", component: TagListComponent },
      { path: '', redirectTo: 'tag-list', pathMatch: 'full' },
      { path: 'tag-detail', component: TagDetailComponent },
      { path: 'tag-add', component: TagAddComponent },
      { path: 'tag-add/:changeRoute/:tagId', component: TagAddComponent}, //編輯 or 複製
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagManageRoutingModule { }

export const routedComponents = [
  TagManageComponent,
  TagListComponent,
  TagButtonComponent,
  TagAddComponent,
  TagDetailComponent,
];
