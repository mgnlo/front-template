import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { TagCategory, TagConditionChartLine, TagSetting, TagSettingEditReq, TagSubCategory } from "@api/models/tag-manage.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class TagManageService {

  readonly tagFunc = 'tag-settings/';
  readonly tagConditionFunc = 'tag-condition/'

  constructor(private service: ApiService) { }

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

  getTagConditionList(): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc);
  }

  getTagConditionalDistribution(conditionKey: string): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc + conditionKey);
  }

  filterTagConditionList(data: TagConditionChartLine): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc, data);
  }

  getTagCategoryList(): Observable<ResponseModel<Array<TagCategory>>> {
    return this.service.doGet(this.tagConditionFunc + 'category/');
  }

  getTagSubCategory(categoryKey: string): Observable<ResponseModel<TagSubCategory>> {
    return this.service.doGet(this.tagConditionFunc + 'category/' + categoryKey);
  }
}
