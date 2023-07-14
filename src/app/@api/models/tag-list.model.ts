export interface TagList {
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
  tagConditionSetting: Array<Tagconditionsetting>
  tagReviewHistory: Array<Tagreviewhistory>
}

export class Tagconditionsetting {
  tagId: string
  conditionKey: string
  groupId: number
  detectionCondition: string
  conditionValue: string
  thresholdValue: string
}

export class Tagreviewhistory {
  historyId: string
  referenceId: string
  groupId: number
  time: string
  title: string
  detail: string
  type: string
}
