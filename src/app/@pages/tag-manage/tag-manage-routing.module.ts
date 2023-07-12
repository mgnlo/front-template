import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { TagManageComponent } from "./tag-manage.component"
import { TagAddComponent } from "./tag-add/tag-add.component"
import { TagListComponent } from "./tag-list/tag-list.component"
import { ButtonComponent } from "./tag-list/tag-list.component"

const routes: Routes = [
  {
    path: "", component: TagManageComponent,
    children: [
      { path: "tag-list", component: TagListComponent },
      { path: '', redirectTo: 'tag-list', pathMatch: 'full' },
      { path: 'tag-add', component: TagAddComponent },
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
  TagAddComponent,
  ButtonComponent,
];
