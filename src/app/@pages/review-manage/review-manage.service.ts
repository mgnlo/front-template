import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { TagReviewListRes, TagReviewRowReq, TagReviewRowRes } from "@api/models/tag-manage.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ReviewManageService {

    readonly activityFunc = 'tag-review-history/';

    constructor(private service: ApiService) {}

    getTagReviewList(): Observable<ResponseModel<TagReviewListRes>> {
        return this.service.doGet(this.activityFunc + 'TagReviewList');
    }

    getTagReviewRow(historyId: number): Observable<ResponseModel<TagReviewRowRes>> {
        return this.service.doGet(this.activityFunc + 'TagReviewRow', {'historyId': historyId});
    }

    TagReviewUpdate(data: TagReviewRowReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityFunc + 'TagReviewUpdate', data);
    }

}
