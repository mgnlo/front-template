import { Injectable } from "@angular/core";
import { ActivitySetting, ActivitySettingEditReq } from "@api/models/activity-list.model";
import { ResData, ResponseModel } from "@api/models/base.model";
import { Customer } from "@api/models/customer-list.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class CustomerManageService {

    readonly activityFunc = 'activity-settings/';
    readonly customerFunc = 'customer/';

    constructor(private service: ApiService) { }

    getCustomerRow(customerId): Observable<ResponseModel<Customer>> {
        return this.service.doGet(this.customerFunc + customerId);
    }

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