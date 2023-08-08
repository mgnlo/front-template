export interface ScheduleActivitySetting {
  scheduleId: string;
  version: string;
  jobName: string;
  executionFrequency: string;
  frequencyTime: string;
  filePath: string;
  creationTime: string;
  modificationTime: string;
  status: string;
  activitySetting: Array<ActivitySetting>;
  scheduleReviewHistory: Array<ScheduleReviewhistory>;
}

export class ActivitySetting {
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

  constructor(data: Partial<ActivitySetting>) {
    Object.assign(this, data);
  }
}

export class Schedule_Batch_History {
  historyId: string;
  activityId: string;
  version: string;
  batchResultCount: number;
  batchTime: string;
  batchResult: string;
}

export class ScheduleReviewhistory {
  historyId: string;
  version: string;
  referenceId: string;
  groupId: number;
  time: string;
  title: string;
  detail: string;
  type: string;
}




//for HTML diaplay ViewModel
export interface ScheduleDetailView {
  scheduleId: string;
  version: string;
  jobName: string;
  executionFrequency: string;
  creationTime: string;
  modificationTime: string;
  status: string;
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
  frequencyTime: string;
  activitySetting: Array<ActivitySetting>;
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
