import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityReviewDetailComponent } from "./activity-review-detail/activity-review-detail.component";
import { ActivityReviewListComponent } from "./activity-review-list/activity-review-list.component";
import { ReviewManageComponent } from "./review-manage.component";
import { TagReviewDetailComponent } from "./tag-review-detail/tag-review-detail.component";
import { TagReviewListComponent } from "./tag-review-list/tag-review-list.component";

const routes: Routes = [
    {
        path: "", component: ReviewManageComponent, 
        children: [
            { path: '', redirectTo: 'tag-review', pathMatch: 'full'},
            { path: 'tag-review-list', component: TagReviewListComponent },
            { path: 'tag-review-detail/:historyId', component: TagReviewDetailComponent },
            { path: 'activity-review-list', component: ActivityReviewListComponent },
            { path: 'activity-review-detail/:historyId', component: ActivityReviewDetailComponent },
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
  TagReviewDetailComponent,
  ActivityReviewListComponent,
  ActivityReviewDetailComponent
];