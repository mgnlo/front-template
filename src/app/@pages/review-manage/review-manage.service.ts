import { Injectable } from "@angular/core";
import { ActivityReviewHistory, TagReviewHistory } from "@api/models/activity-list.model";
import { ResponseModel } from "@api/models/base.model";
import { ScheduleReviewHistory } from "@api/models/schedule-activity.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ReviewManageService {

    readonly tagReviewFunc = 'tag-review-history/';
    readonly activityReviewFunc = 'activity-review-history/';
    readonly scheduleReviewFunc = 'schedule-review-history/';

    constructor(private service: ApiService) { }

    getActivityReviewRow(historyId: string): Observable<ResponseModel<ActivityReviewHistory>> {
        return this.service.doGet(this.activityReviewFunc + historyId);
    }

    getLastApprovedActivity(historyId: string): Observable<ResponseModel<ActivityReviewHistory>> {
        return this.service.doGet(this.activityReviewFunc + historyId + '/last-approved');
    }

    updateActivityReview(historyId: string, data: { reviewStatus: string, reviewComment: string }): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityReviewFunc + historyId, data);
    }

    getTagReviewRow(historyId: string): Observable<ResponseModel<TagReviewHistory>> {
        return this.service.doGet(this.tagReviewFunc + historyId);
    }

    getLastApprovedTag(historyId: string): Observable<ResponseModel<TagReviewHistory>> {
        return this.service.doGet(this.tagReviewFunc + historyId + '/last-approved');
    }

    updateTagReview(historyId: string, data: { reviewStatus: string, reviewComment: string }): Observable<ResponseModel<any>> {
        return this.service.doPut(this.tagReviewFunc + historyId, data);
    }

    getScheduleReviewRow(historyId: string): Observable<ResponseModel<ScheduleReviewHistory>> {
        return this.service.doGet(this.scheduleReviewFunc + historyId);
    }

    getLastApprovedSchedule(historyId: string): Observable<ResponseModel<ScheduleReviewHistory>> {
        return this.service.doGet(this.scheduleReviewFunc + historyId + '/last-approved');
    }

    updateScheduleReview(historyId: string, data: { reviewStatus: string, reviewComment: string }): Observable<ResponseModel<any>> {
        return this.service.doPut(this.scheduleReviewFunc + historyId, data);
    }

}
