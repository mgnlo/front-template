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
}

export class TagReviewHistory {
  historyId: string
  referenceId: string
  groupId: number
  time: string
  title: string
  detail: string
  type: string
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
  tagSubdimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
  historyGroupView: {[x: number]: HistoryGroupView};
}

//for HTML diaplay ViewModel
export interface HistoryGroupView {
  type: string;
  flows: {
    time: string;
    title: string;
    detail: string;
  }[]
}
