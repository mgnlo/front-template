import { Injectable } from "@angular/core";
import { ActivitySetting, ActivitySettingEditReq, ActivitySettingSearchReq } from "@api/models/activity-list.model";
import { ResData, ResponseModel } from "@api/models/base.model";
import { ApiService } from "@api/services/api.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CustomerManageService {

    readonly activityFunc = 'activity-settings/';
    readonly getActivitySettingListURL = environment.SERVER_URL + environment.API_URL + this.activityFunc;

    constructor(private service: ApiService) { }

    getActivitySettingList(): Observable<ResponseModel<ResData<Array<ActivitySetting>>>> {
        return this.service.doGet(this.activityFunc);
    }

    getActivitySettingRow(activityId: string): Observable<ResponseModel<ActivitySetting>> {
        return this.service.doGet(this.activityFunc + activityId);
    }

    createActivitySetting(data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPost(this.activityFunc, data);
    }

    updateActivitySetting(activityId: string, data: ActivitySettingEditReq): Observable<ResponseModel<any>> {
        return this.service.doPut(this.activityFunc + activityId, data);
    }

}