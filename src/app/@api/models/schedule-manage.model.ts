export interface ScheduleSetting {
  scheduleId: string
  scheduleName: string
  scheduleDescription: string
  scheduleType: string
  department: string
  owner: string
  modificationTime: string
  status: string
  startDate: string
  endDate: string
  conditionSettingMethod: string
  conditionSettingQuery: string
  scheduleDimension: string
  scheduleSubDimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
  scheduleConditionSetting: Array<ScheduleConditionSetting>
  scheduleReviewHistory: Array<ScheduleReviewHistory>
}

export class ScheduleConditionSetting {
  scheduleId: string
  conditionKey: string
  groupId: number
  detectionCondition: string
  conditionValue: string
  thresholdValue: string
}

export class ScheduleReviewHistory {
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
  scheduleName?: string
  scheduleDescription?: string
  scheduleType?: string
  department?: string
  owner?: string
  modificationTime?: string
  status?: string
  startDate?: string
  endDate?: string
  conditionSettingMethod?: string
  conditionSettingQuery?: string
  scheduleDimension?: string
  scheduleSubDimension?: string
  scheduleSettings?: string
  uploadType?: string
  filePath?: string
}


//for HTML diaplay ViewModel
export interface ScheduleDetailView {
  scheduleId: string
  scheduleName: string
  scheduleDescription: string
  scheduleType: string
  department: string
  owner: string
  modificationTime: string
  status: string
  startDate: string
  endDate: string
  conditionSettingMethod: string
  conditionSettingQuery: string
  scheduleDimension: string
  scheduleSubDimension: string
  scheduleSettings: string
  uploadType: string
  filePath: string
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

export class ScheduleSettingListResp {
  data: Array<ScheduleSetting>;
}
export class ScheduleSettingRowResp {
  data: ScheduleSetting;
}
export class ScheduleSettingEditReq {
  ScheduleName: string;
  status: string;
  listLimit: number;
  filterOptions: string;
  startDate: string;
  endDate: string;
  scheduleSettings: string;
  ScheduleDescription: string;
}

export interface ScheduleReviewListRes {
  data: Array<ScheduleReviewHistory>;
}

export interface ScheduleReviewRowRes {
  data: ScheduleReviewHistory;
}

export interface ScheduleReviewRowReq {
  data: ScheduleReviewHistory;
}
