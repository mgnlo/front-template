export interface TagSetting {
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
  conditionSettingMethod: string; //條件設定方式
  conditionSettingQuery: string; //條件設定語法
  tagDimension: string;
  tagSubDimension: string;
  scheduleSettings: string;
  uploadType: string;
  fileName: string;
  filePath: string;
  fileData: string;
  version: string
  tagConditionSetting: Array<TagConditionSetting>;
  tagReviewHistory: Array<TagReviewHistory>;
}

export class TagConditionSetting {
  tagId: string;
  conditionId: string;
  groupId: number
  detectionCondition: string;
  conditionValue: string;
  thresholdValue: string;
  joinValue?: string;

  constructor(data: Partial<TagConditionSetting>) {
    Object.assign(this, data);
  }
}

export class TagReviewHistory {
  historyId: string;
  referenceId: string;
  groupId: number
  time: string;
  title: string;
  detail: string;
  type: string;
  reviewStatus?: string;
  reviewer?: string;
  reviewComment?: string;
  tagName?: string;
  tagDescription?: string;
  tagType?: string;
  department?: string;
  owner?: string;
  modificationTime?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  conditionSettingMethod?: string;
  conditionSettingQuery?: string;
  tagDimension?: string;
  tagSubDimension?: string;
  scheduleSettings?: string;
  uploadType?: string;
  filePath?: string;
}

//#region 異動歷程/紀錄
//for HTML diaplay ViewModel
export interface TagDetailView {
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
  tagDimension: string;
  tagSubDimension: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
  fileName: string
  fileData: string
  version: string
  historyGroupView: { [x: number]: HistoryGroupView };
  tagConditionSetting: Array<TagConditionSetting>;
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
//#endregion

//#region 新增&編輯
export class TagSettingEditReq {
  tagId: string;
  tagName: string;
  status: string;
  tagType: string;
  uploadType?: string;
  fileName?: string;
  filePath?: string;
  fileData?: string;
  conditionSettingMethod: string; //條件設定方式
  startDate: string;
  endDate: string;
  tagDimension: string;
  tagSubDimension: string;
  tagDescription: string;
  conditionSettingQuery?: string; //條件設定語法
  tagConditionSetting?: Array<TagConditionSetting>;

  constructor(data: Partial<TagSettingEditReq>) {
    Object.assign(this, data);
  }
}
//#endregion

//#region 條件級距線圖表
export interface TagConditionChartLine {
  conditionValue: string;
  conditionName: string;
  conditionDistribution: Array<Conditiondistribution>
}

export class Conditiondistribution {
  distributionKey: string;
  distributionValue: number;
  sort: string;
}
//#endregion

//#region 活動標籤顯示
export interface TagReviewListResp {
  data: Array<TagReviewHistory>;
}

export interface TagReviewRowResp {
  data: TagReviewHistory;
}

export interface TagReviewRowReq {
  data: TagReviewHistory;
}
//#endregion
