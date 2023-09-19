import { TagCondition } from "./tag-manage.model";

export interface ActivitySetting {
  activityId: string;
  activityName: string;
  activityDescription: string;
  department: string;
  owner: string;
  filterOptions: string;
  listLimit: number;
  status: string;
  startDate: string;
  endDate: string;
  createTime: string;
  modificationTime: string;
  scheduleSettings: string;
  batchUpdateTime: string;
  activityListCondition: Array<ActivityListCondition>;
  version: string;
  reviewStatus: string;
  activityReviewHistoryAud: Array<ActivityReviewHistory>;
}
export class ActivityListCondition {
  activityId?: string;
  conditionId?: string;
  version?: string;
  tagGroup: number;
  tagName: string;
  tagId: string;
}
export class ActivityReviewHistory {
  historyId: string;
  version: string;
  referenceId: string;
  groupId: number;
  time: string;
  title: string;
  detail: string;
  type: string;
  reviewStatus?: string;
  reviewer?: string;
  reviewComment?: string;
  activityName?: string;
  activityDescription?: string;
  filterOptions?: string;
  listLimit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  modificationTime?: string;
  scheduleSettings?: string;
  batchUpdateTime?: string;
  activityListCondition?: Array<ActivityListCondition>;
}
export class TagSetting {
  tagId: string;
  tagName: string;
  tagDescription: string;
  tagType: string;
  department: string;
  owner: string;
  modificationTime: string;
  status: string;
  startDate: string;
  endDate: string;
  conditionSettingMethod: string;
  conditionSettingQuery: string;
  categoryKey: string;
  tagTopicKey: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
}
export class TagConditionSetting {
  tagId: string;
  conditionId: string;
  groupId: number;
  detectionCondition: string;
  conditionKey: string;
  thresholdValue: string;
}

export class TagReviewHistory {
  historyId: string;
  referenceId: string;
  groupId: number;
  time: string;
  title: string;
  detail: string;
  type: string;
  reviewStatus: string;
  reviewer: string;
  reviewComment: string;
  tagName: string;
  tagDescription: string;
  tagType: string;
  department: string;
  owner: string;
  modificationTime: string;
  status: string;
  startDate: string;
  endDate: string;
  conditionSettingMethod: string;
  conditionSettingQuery: string;
  categoryKey: string;
  tagTopicKey: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
}

//for HTML diaplay
export interface ActivityDetail {
  activityId: string;
  activityName: string;
  activityDescription: string;
  filterOptions: string;
  listLimit: number;
  status: string;
  reviewStatus: string;
  startDate: string;
  endDate: string;
  modificationTime: string;
  scheduleSettings: string;
  batchUpdateTime: string;
  historyGroupView: {[x: number]: HistoryGroupView};
  tagGroupView: {[x: number]: TagGroupView[]};
}

//for HTML diaplay
export interface TagGroupView {
  conditionId: number;
  tagId: string;
  tagName: string;
}

//for HTML diaplay
export interface HistoryGroupView {
  type: string;
  flows: {
    time: string;
    title: string;
    detail: string;
  }[]
}

export class ActivitySettingSearchReq {
  activityName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export class ActivitySettingEditReq {
  activityName: string;
  status: string;
  listLimit: number;
  filterOptions: string;
  startDate: string;
  endDate: string;
  scheduleSettings: string;
  activityDescription: string;
  activityListCondition: Array<ActivityListCondition>;
}

export class PreviewCustomerReq {
  activityListCondition: Array<string[]>;
  tagSetting: string[];
  conditionKey: string;
  orderby: string;
  size: number;
}