import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { ActivitySetting, ScheduleActivitySetting, ScheduleActivitySettingEditReq } from "@api/models/schedule-activity.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ScheduleManageService {

  readonly scheduleFunc = 'schedule-management/';
  readonly batchFunc = 'schedule-batch-history/';

  constructor(private service: ApiService) { }

  getScheduleActivitySettingList(): Observable<ResponseModel<Array<ScheduleActivitySetting>>> {
    return this.service.doGet(this.scheduleFunc);
  }

  getScheduleActivitySettingDetail(scheduleId: string): Observable<ResponseModel<ScheduleActivitySetting>> {
    return this.service.doGet(this.scheduleFunc + scheduleId);
  }

  getScheduleActivitySettingExportDetail(activityId: string): Observable<ResponseModel<ActivitySetting>> {
    return this.service.doGet(this.batchFunc + activityId);
  }

  /** 可選的活動下拉選單 API*/
  getScheduleActivityOptions(): Observable<ResponseModel<Array<ActivitySetting>>> {
    return this.service.doGet(this.scheduleFunc + 'options');
  }

  createScheduleActivitySetting(data: ScheduleActivitySettingEditReq): Observable<ResponseModel<any>> {
    return this.service.doPost(this.scheduleFunc, data);
  }

  updateScheduleActivitySetting(scheduleId: string, data: ScheduleActivitySettingEditReq): Observable<ResponseModel<any>> {
    return this.service.doPut(this.scheduleFunc + scheduleId, data);
  }

  deleteScheduleActivitySetting(scheduleId: string): Observable<ResponseModel<any>> {
    return this.service.doDelete(this.scheduleFunc + scheduleId);
  }

}
