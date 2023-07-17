export class TagReview {
  tagId: string
  tagName: string
  tagDescription: string
  tagType: string
  department: string
  owner: string
  modificationTime: string
  reviewStatus: string
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

export interface TagReviewDetail {
  tagId: string
  tagName: string
  tagDescription: string
  tagType: string
  department: string
  owner: string
  modificationTime: string
  reviewStatus: string
  startDate: string
  endDate: string
  conditionSettingMethod: string
  conditionSettingQuery: string
  tagDimension: string
  tagSubDimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
  tagConditionSettingView: {[x: number]: TagConditionSettingView}
  tagReviewHistoryView: {[x: number]: TagReviewHistoryGroupView}
}

export interface TagConditionSettingView {
  conditionKey: string
  detectionCondition: string
  conditionValue: string
  thresholdValue: string
}

export interface TagReviewHistoryGroupView {
  type: string
  flows: {
    historyId: string
    time: string
    title: string
    detail: string
  }[]
}
