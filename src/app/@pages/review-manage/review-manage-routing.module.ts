import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReviewManageComponent } from "./review-manage.component";
import { TagReviewDetailComponent } from "./tag-review-detail/tag-review-detail.component";
import { ReviewTagButtonComponent, TagReviewListComponent } from "./tag-review-list/tag-review-list.component";

const routes: Routes = [
    {
        path: "", component: ReviewManageComponent, 
        children: [
            { path: '', redirectTo: 'tag-review', pathMatch: 'full'},
            { path: 'tag-review', component: TagReviewListComponent },
            { path: 'tag-review-detail/:historyId', component: TagReviewDetailComponent },
            // {
            //   path: 'edit/:id',
            //   component: SystemManageEditComponent, //編輯
            // },
            // { path: 'activity-list', component: ActivityListComponent},
            // { path: 'activity-add', component: ActivityAddComponent},
            // { path: 'activity-detail', component: ActivityDetailComponent},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReviewManageRoutingModule { }

export const routedComponents = [
  ReviewManageComponent,
  TagReviewListComponent,
  ReviewTagButtonComponent,
  TagReviewDetailComponent
];