export interface ScheduleSetting {
  scheduleId: string;
  jobName: string;
  executionFrequency: string;
  creationTime: string;
  modificationTime: string;
  status: string;
  activitySetting: Array<Activitysetting>;
}

export class Activitysetting {
  activityId: string;
  version: string;
  activityName: string;
  activityDescription: string;
  filterOptions: string;
  listLimit: number;
  status: string;
  startDate: string;
  endDate: string;
  createTime: string;
  modificationTime: string;
  scheduleSettings: string;
  batchUpdateTime: string;
  schedule_batch_history: Array<Schedule_Batch_History>;
}

export class Schedule_Batch_History {
  historyId: string;
  activityId: string;
  batchTime: string;
  batchResult: string;
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
  historyGroupView: { [x: number]: HistoryGroupView };
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
  data: [];
}
export class ScheduleSettingRowResp {
  data: [];
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
  data: [];
}

export interface ScheduleReviewRowRes {
  data: [];
}

export interface ScheduleReviewRowReq {
  data: [];
}
