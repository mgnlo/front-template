import { Injectable } from "@angular/core";
import { ActivitySetting, ActivitySettingEditReq } from "@api/models/activity-list.model";
import { ResponseModel } from "@api/models/base.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class CustomerManageService {

    readonly activityFunc = 'activity-settings/';

    constructor(private service: ApiService) { }

    getActivitySettingSearch(): Observable<ResponseModel<Array<ActivitySetting>>> {
        return this.service.doGet(this.activityFunc);
    }

    getActivitySettingGet(activityId: string): Observable<ResponseModel<ActivitySetting>> {
        return this.service.doGet(this.activityFunc + activityId);
    }

    activitySettingCreate(data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPost(this.activityFunc, data);
    }

    activitySettingUpdate(activityId: string, data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityFunc + activityId, data);
    }

}