export interface ScheduleTagSetting {
  tagId: string;
  version: string;
  tagName: string;
  tagDescription: string;
  tagType: string;
  department: string;
  owner: string;
  createTime: string;
  modificationTime: string;
  status: string;
  startDate: string;
  endDate: string;
  conditionSettingMethod: string;
  conditionSettingQuery: string;
  categoryKey: string;
  categoryName?: string;
  tagTopicKey: string;
  tagTopicName?: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
  fileName: string;
  fileData: string;
  tagConditionSetting: Array<TagConditionSetting>;
  scheduleBatchHistory: Array<ScheduleBatchHistory>;
}

export class TagConditionSetting {
  tagId: string;
  conditionId: string;
  version: string;
  groupId: number
  detectionCondition: string;
  conditionKey: string;
  conditionName?: string;
  thresholdValue: string;
  joinValue?: string;

  constructor(data: Partial<TagConditionSetting>) {
    Object.assign(this, data);
  }
}

export class ScheduleBatchHistory {
  historyId: string;
  referenceId: string;
  version: string;
  batchTime: string;
  batchResult: string;
  batchResultCount: number;
}


export class ScheduleTagSettingView{
  tagId: string;
  version: string;
  tagName: string;
  tagDescription: string;
  tagType: string;
  department: string;
  owner: string;
  createTime: string;
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

  //拿最新一筆ScheduleBatchHistory
  historyId: string;
  batchTime: string;
  batchResult: string;
  batchResultCount: number;

  constructor(data: Partial<ScheduleTagSettingView>) {
    Object.assign(this, data);
  }
}
