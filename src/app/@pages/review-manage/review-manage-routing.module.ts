import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReviewActivityDetailComponent } from "./review-activity-detail/review-activity-detail.component";
import { ReviewActivityListComponent } from "./review-activity-list/review-activity-list.component";
import { ReviewManageComponent } from "./review-manage.component";
import { ReviewTagDetailComponent } from "./review-tag-detail/review-tag-detail.component";
import { ReviewTagListComponent } from "./review-tag-list/review-tag-list.component";
import { ReviewScheduleListComponent } from "./review-schedule-list/review-schedule-list.component";
import { ReviewScheduleDetailComponent } from "./review-schedule-detail/review-schedule-detail.component";

const routes: Routes = [
    {
        path: "", component: ReviewManageComponent,
        children: [
            { path: '', redirectTo: 'review-tag-list', pathMatch: 'full' },
            { path: 'review-tag-list', component: ReviewTagListComponent, data:{ keepSession: true, keepFrom: ['review-tag-detail/']}},
            { path: 'review-tag-detail/:historyId', component: ReviewTagDetailComponent, data:{ keepSession: true } },
            { path: 'review-activity-list', component: ReviewActivityListComponent, data:{ keepSession: true, keepFrom: ['review-activity-detail/']}},
            { path: 'review-activity-detail/:historyId', component: ReviewActivityDetailComponent, data:{ keepSession: true }},
            { path: 'review-schedule-list', component: ReviewScheduleListComponent, data:{ keepSession: true, keepFrom: ['review-schedule-detail/']}},
            { path: 'review-schedule-detail/:historyId', component: ReviewScheduleDetailComponent, data:{ keepSession: true }},
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
    ReviewTagListComponent,
    ReviewTagDetailComponent,
    ReviewActivityListComponent,
    ReviewActivityDetailComponent,
    ReviewScheduleListComponent,
    ReviewScheduleDetailComponent,
];
