import { Injectable } from "@angular/core";
import { ResponseModel } from "@api/models/base.model";
import { TagCategory, TagConditionChartLine, TagConditionReq, TagSetting, TagSettingEditReq, TagSubCategory } from "@api/models/tag-manage.model";
import { ApiService } from "@api/services/api.service";
import { Observable } from "rxjs";

@Injectable()
export class TagManageService {

  readonly tagFunc = 'tag-settings/';
  readonly tagConditionFunc = 'tag-condition/'

  constructor(private service: ApiService) { }

  //4.1
  getTagSettingList(): Observable<ResponseModel<Array<TagSetting>>> {
    return this.service.doGet(this.tagFunc);
  }

  //4.2 客群活動名單->活動名單條件下拉選單
  getTagSettingListOption(data?: any): Observable<ResponseModel<Map<string, string>>> {
    return this.service.doGet(this.tagFunc + 'option', data);
  }

  //4.6
  getTagSettingRow(tagId: string): Observable<ResponseModel<TagSetting>> {
    return this.service.doGet(this.tagFunc + tagId);
  }

  //4.5
  createTagSetting(data: TagSettingEditReq): Observable<ResponseModel<any>> {
    return this.service.doPost(this.tagFunc, data);
  }

  //4.8
  updateTagSetting(tagId: string, data: TagSettingEditReq): Observable<ResponseModel<any>> {
    return this.service.doPut(this.tagFunc + tagId, data);
  }

  //4.9
  getTagConditionList(): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc);
  }

  //4.10
  getTagFilterConditionList(data: TagConditionChartLine): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc, data);
  }

  //4.11
  getTagFilterConditionListOption(data: TagConditionReq): Observable<ResponseModel<Array<TagCategory>>> {
    return this.service.doGet(this.tagConditionFunc + 'option', data);
  }

  //4.12
  getTagConditionalDistribution(conditionKey: string): Observable<ResponseModel<Array<TagConditionChartLine>>> {
    return this.service.doGet(this.tagConditionFunc + conditionKey);
  }

  //4.13
  getTagCategoryList(): Observable<ResponseModel<Array<TagCategory>>> {
    return this.service.doGet(this.tagConditionFunc + 'category/');
  }

  //4.14
  getTagCategoryListOption(): Observable<ResponseModel<Map<string, string>>> {
    return this.service.doGet(this.tagConditionFunc + 'category/option');
  }

  //4.15
  getTagSubCategoryList(categoryKey: string): Observable<ResponseModel<TagSubCategory>> {
    return this.service.doGet(this.tagConditionFunc + 'category/' + categoryKey);
  }

  //4.16
  getTagSubCategoryListOption(categoryKey: string): Observable<ResponseModel<Map<string, string>>> {
    return this.service.doGet(this.tagConditionFunc + 'category/' + categoryKey + '/option');
  }
}
