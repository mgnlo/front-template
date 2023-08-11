import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { ActivitySetting, ScheduleActivitySetting, ScheduleSettingEditReq } from "@api/models/schedule-activity.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ScheduleManageService {

  readonly scheduleFunc = 'schedule-management/';

  constructor(private service: ApiService) {}

  getScheduleActivitySettingList(): Observable<ResponseModel<Array<ScheduleActivitySetting>>> {
      return this.service.doGet(this.scheduleFunc);
  }

  getScheduleActivitySettingRow(scheduleId: string): Observable<ResponseModel<ScheduleActivitySetting>> {
      return this.service.doGet(this.scheduleFunc + scheduleId);
  }

  /** 可選的活動下拉選單 API*/
  getScheduleActivityOptions(): Observable<ResponseModel<Array<ActivitySetting>>> {
      return this.service.doGet(this.scheduleFunc + 'options');
  }

  createScheduleSetting(data: ScheduleSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPost(this.scheduleFunc, data);
  }

  updateScheduleSetting(scheduleId: string, data: ScheduleSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPut(this.scheduleFunc + scheduleId, data);
  }

  deleteScheduleSetting(scheduleId: string): Observable<ResponseModel<any>> {
      return this.service.doDelete(this.scheduleFunc + scheduleId);
  }

}
