import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { TagSetting, TagSettingEditReq } from "@api/models/tag-manage.model";
import { ApiService } from "@api/services/api.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class TagManageService {

  readonly tagFunc = 'tag-settings/';
  readonly getTagSettingListURL = environment.SERVER_URL + environment.API_URL + this.tagFunc;

  constructor(private service: ApiService) {}

  getTagSettingList(): Observable<ResponseModel<Array<TagSetting>>> {
      return this.service.doGet(this.tagFunc);
  }

  getTagSettingRow(tagId: string): Observable<ResponseModel<TagSetting>> {
      return this.service.doGet(this.tagFunc + tagId);
  }

  createTagSetting(data: TagSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPost(this.tagFunc, data);
  }

  updateTagSetting(tagId: string, data: TagSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPut(this.tagFunc + tagId, data);
  }

}
