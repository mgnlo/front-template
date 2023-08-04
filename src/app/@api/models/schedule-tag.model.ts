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
  tagDimension: string;
  tagSubdimension: string;
  scheduleSettings: string;
  uploadType: string;
  filePath: string;
  scheduleBatchHistory: Array<ScheduleBatchHistory>;
}

export class ScheduleBatchHistory {
  historyId: string;
  tagId: string;
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
  tagDimension: string;
  tagSubdimension: string;
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
