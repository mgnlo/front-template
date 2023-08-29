import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActivityReviewDetailComponent } from "./activity-review-detail/activity-review-detail.component";
import { ActivityReviewListComponent } from "./activity-review-list/activity-review-list.component";
import { ReviewManageComponent } from "./review-manage.component";
import { TagReviewDetailComponent } from "./tag-review-detail/tag-review-detail.component";
import { TagReviewListComponent } from "./tag-review-list/tag-review-list.component";
import { ScheduleReviewListComponent } from "./schedule-review-list/schedule-review-list.component";
import { ScheduleReviewDetailComponent } from "./schedule-review-detail/schedule-review-detail.component";

const routes: Routes = [
    {
        path: "", component: ReviewManageComponent,
        children: [
            { path: '', redirectTo: 'tag-review', pathMatch: 'full' },
            { path: 'tag-review-list', component: TagReviewListComponent, data:{ schema: 'review-tag', keepSession: true, keepFrom: ['tag-review-detail/']}},
            { path: 'tag-review-detail/:historyId', component: TagReviewDetailComponent, data:{ schema: 'review-tag', keepSession: true } },
            { path: 'activity-review-list', component: ActivityReviewListComponent, data:{ schema: 'review-activity', keepSession: true, keepFrom: ['activity-review-detail/']}},
            { path: 'activity-review-detail/:historyId', component: ActivityReviewDetailComponent, data:{ schema: 'review-activity', keepSession: true }},
            { path: 'schedule-review-list', component: ScheduleReviewListComponent, data:{ schema: 'review-schedule', keepSession: true, keepFrom: ['schedule-review-detail/']}},
            { path: 'schedule-review-detail/:historyId', component: ScheduleReviewDetailComponent, data:{ schema: 'review-schedule', keepSession: true }},
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
    ActivityReviewDetailComponent,
    ScheduleReviewListComponent,
    ScheduleReviewDetailComponent,
];
