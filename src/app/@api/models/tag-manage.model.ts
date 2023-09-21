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
  categoryKey: string;
  tagTopicKey: string;
  scheduleSettings: string;
  uploadType: string;
  fileName: string;
  filePath: string;
  fileData: string;
  version: string;
  reviewStatus: string;
  tagConditionSetting: Array<TagConditionSetting>;
  tagReviewHistoryAud: Array<TagReviewHistory>;
}

export class TagConditionSetting {
  tagId: string;
  conditionId: string;
  version: string;
  groupId: number
  detectionCondition: string;
  conditionKey: string;
  conditionName: string;
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
  categoryKey?: string;
  tagTopicKey?: string;
  scheduleSettings?: string;
  uploadType?: string;
  filePath?: string;
  tagConditionSetting?: Array<TagConditionSetting>;
  tagReviewHistoryAud?: Array<TagReviewHistory>;
  reviewTime?: string;
  createTime?: string;
  timestamp?: string;
  revisionType?: number;
  revisionId?: number;
  version?: string;
}

//#region 偵測條件
export class TagConditionReq{
  categoryKey: string;
  tagTopicKey: string;

  constructor(data: Partial<TagConditionReq>) {
    Object.assign(this, data);
  }
}

export class TagCondition{
  conditionKey: string;
  conditionName: string;
}
//#endregion

//#region 標籤構面
export class TagCategory {
  categoryKey: string;
  categoryName: string;
}

export class TagSubCategory {
  categoryKey: string;
  categoryName: string;
  tagTopic?: Array<TagTopic>;
}

export class TagTopic {
  tagTopicKey: string;
  tagTopicName: string;
}
//#endregion

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
  categoryKey: string;
  categoryName: string;
  tagTopicKey: string;
  tagTopicName: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
  fileName: string;
  fileData: string;
  version: string;
  reviewStatus: string;
  historyGroupView: { [x: number]: HistoryGroupView };
  tagConditionSetting: Array<TagConditionSetting>;
  tagReviewHistoryAud: Array<TagReviewHistory>;
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
  categoryKey: string;
  tagTopicKey: string;
  tagDescription: string;
  conditionSettingQuery?: string; //條件設定語法
  tagConditionSetting?: Array<TagConditionSetting>;

  constructor(data: Partial<TagSettingEditReq>) {
    Object.assign(this, data);
  }
}
//#endregion

//#region 條件級距線圖表
export class TagConditionChartLine {
  conditionKey: string;
  conditionName: string;
  conditionDistribution: Array<Conditiondistribution>

  constructor(data: Partial<TagConditionChartLine>) {
    Object.assign(this, data);
  }
}

export class Conditiondistribution {
  distributionKey: string;
  distributionValue: number;
  sort: string;
}
//#endregion

//#region 活動標籤顯示
export interface ReviewTagListResp {
  data: Array<TagReviewHistory>;
}

export interface TagReviewRowResp {
  data: TagReviewHistory;
}

export interface TagReviewRowReq {
  data: TagReviewHistory;
}
//#endregion
