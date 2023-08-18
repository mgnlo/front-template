import { Injectable } from "@angular/core";
import { ActivityReviewHistory } from "@api/models/activity-list.model";
import { ResponseModel } from "@api/models/base.model";
import { ScheduleReviewHistory, ScheduleReviewRowReq } from "@api/models/schedule-activity.model";
import { TagReviewRowReq, TagReviewRowResp } from "@api/models/tag-manage.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ReviewManageService {

    readonly tagReviewFunc = 'tag-review-history/';
    readonly activityReviewFunc = 'activity-review-history/';
    readonly scheduleReviewFunc = 'schedule-review-history/';

    constructor(private service: ApiService) {}

    getActivityReviewRow(historyId: string): Observable<ResponseModel<ActivityReviewHistory>> {
        return this.service.doGet(this.activityReviewFunc + historyId);
    }

    updateActivityReview(historyId: string, data: any): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityReviewFunc + historyId, data);
    }

    getTagReviewRow(historyId: string): Observable<ResponseModel<TagReviewRowResp>> {
        return this.service.doGet(this.tagReviewFunc + historyId);
    }

    updateTagReview(historyId: string, data: TagReviewRowReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.tagReviewFunc + historyId, data);
    }

    getScheduleReviewRow(historyId: string): Observable<ResponseModel<ScheduleReviewHistory>> {
        return this.service.doGet(this.scheduleReviewFunc + historyId);
    }

    getLastApprovedSchedule(historyId: string): Observable<ResponseModel<ScheduleReviewHistory>> {
        return this.service.doGet(this.scheduleReviewFunc + historyId + '/last-approved');
    }

    updateScheduleReview(historyId: string, data: ScheduleReviewRowReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.scheduleReviewFunc + historyId, data);
    }

}
