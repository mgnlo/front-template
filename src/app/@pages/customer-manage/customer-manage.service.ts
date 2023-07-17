import { Injectable } from "@angular/core";
import { ActivitySettingEditReq, ActivitySettingListRes, ActivitySettingRowRes } from "@api/models/activity-list.model";
import { ResponseModel } from "@api/models/base.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class CustomerManageService {

    readonly activityFunc = 'activity-settings/';

    constructor(private service: ApiService) {}

    getActivitySettingList(): Observable<ResponseModel<ActivitySettingListRes>> {
        return this.service.doGet(this.activityFunc + 'activitySettingList');
    }

    getActivitySettingRow(id: number): Observable<ResponseModel<ActivitySettingRowRes>> {
        return this.service.doGet(this.activityFunc + 'activitySettingRow', {'activityId': id});
    }

    activitySettingSave(data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPost(this.activityFunc + 'activitySettingSave', data);
    }

    activitySettingUpdate(data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityFunc + 'activitySettingUpdate', data);
    }

}