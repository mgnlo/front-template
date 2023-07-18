import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ApiService } from "@api/services/api.service";
import { ResponseModel } from "@api/models/base.model";
import { TagSettingEditReq, TagSettingListResp, TagSettingRowResp } from "@api/models/tag-list.model";

@Injectable()
export class TagManageService {

  readonly tagFunc = 'tag-settings/';

  constructor(private service: ApiService) {}

  gettagSettingList(): Observable<ResponseModel<TagSettingListResp>> {
      return this.service.doGet(this.tagFunc + 'tagSettingList');
  }

  gettagSettingRow(tagId: number): Observable<ResponseModel<TagSettingRowResp>> {
      return this.service.doGet(this.tagFunc + 'tagSettingRow', {'tagId': tagId});
  }

  tagSettingSave(data: TagSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPost(this.tagFunc + 'tagSettingSave', data);
  }

  tagSettingUpdate(data: TagSettingEditReq): Observable<ResponseModel<any>> {
      return this.service.doPut(this.tagFunc + 'tagSettingUpdate', data);
  }

}
