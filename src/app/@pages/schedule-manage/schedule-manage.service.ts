import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "@api/services/api.service";
import { ResponseModel } from "@api/models/base.model";
import { ScheduleSettingEditReq, ScheduleSettingListResp, ScheduleSettingRowResp } from "@api/models/schedule-activity.model";

@Injectable()
export class ScheduleManageService {

  readonly scheduleFunc = 'schedule-settings/';

  constructor(private service: ApiService) {}

  getscheduleSettingList(): Observable<ResponseModel<ScheduleSettingListResp>> {
      return this.service.doGet(this.scheduleFunc + 'scheduleSettingList');
  }

  getscheduleSettingRow(scheduleId: number): Observable<ResponseModel<ScheduleSettingRowResp>> {
      return this.service.doGet(this.scheduleFunc + 'scheduleSettingRow', {'scheduleId': scheduleId});
  }

  scheduleSettingSave(data: ScheduleSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPost(this.scheduleFunc + 'scheduleSettingSave', data);
  }

  scheduleSettingUpdate(data: ScheduleSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPut(this.scheduleFunc + 'scheduleSettingUpdate', data);
  }

}
