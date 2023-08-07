export interface TagSetting {
  tagId: string
  tagName: string
  tagDescription: string
  tagType: string
  department: string
  owner: string
  modificationTime: string
  status: string
  startDate: string
  endDate: string
  conditionSettingMethod: string
  conditionSettingQuery: string
  tagDimension: string
  tagSubDimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
  fileName: string
  fileData: string
  version: string
  tagConditionSetting: Array<TagConditionSetting>
  tagReviewHistory: Array<TagReviewHistory>
}

export class TagConditionSetting {
  tagId: string
  conditionKey: string
  groupId: number
  detectionCondition: string
  conditionValue: string
  thresholdValue: string
  joinValue?: string
}

export class TagReviewHistory {
  historyId: string
  referenceId: string
  groupId: number
  time: string
  title: string
  detail: string
  type: string
  reviewStatus?: string
  reviewer?: string
  reviewComment?: string
  tagName?: string
  tagDescription?: string
  tagType?: string
  department?: string
  owner?: string
  modificationTime?: string
  status?: string
  startDate?: string
  endDate?: string
  conditionSettingMethod?: string
  conditionSettingQuery?: string
  tagDimension?: string
  tagSubDimension?: string
  scheduleSettings?: string
  uploadType?: string
  filePath?: string
}


//for HTML diaplay ViewModel
export interface TagDetailView {
  tagId: string
  tagName: string
  tagDescription: string
  tagType: string
  department: string
  owner: string
  modificationTime: string
  status: string
  startDate: string
  endDate: string
  conditionSettingMethod: string
  conditionSettingQuery: string
  tagDimension: string
  tagSubDimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
  fileName: string
  fileData: string
  version: string
  historyGroupView: {[x: number]: HistoryGroupView};
}

//for HTML diaplay ViewModel
export interface HistoryGroupView {
  type: string;
  flows: {
    historyId?: string;
    time: string;
    title: string;
    detail: string;
  }[]
}

export class TagSettingEditReq {
  TagName: string;
  status: string;
  listLimit: number;
  filterOptions: string;
  startDate: string;
  endDate: string;
  scheduleSettings: string;
  TagDescription: string;
}

export interface TagReviewListRes {
  data: Array<TagReviewHistory>;
}

export interface TagReviewRowRes {
  data: TagReviewHistory;
}

export interface TagReviewRowReq {
  data: TagReviewHistory;
}
