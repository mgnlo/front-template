import { ScheduleSetting } from "@api/models/schedule-manage.model";

export const ScheduleSettingMock: Array<ScheduleSetting> = [
  {
    "scheduleId":"uuid-1",
    "jobName":"Job Name",
    "executionFrequency":"Daily",
    "creationTime":"2023-07-20 10:00:00",
    "modificationTime":"2023-07-20 12:30:00",
    "status":"Active",
    "activitySetting":[
       {
          "activityId":"abcdefg123456",
          "version":"uuid-zzzz",
          "activityName":"女王節活動",
          "activityDescription":"女王節活動 EDM 名單",
          "filterOptions":"true",
          "listLimit":100,
          "status":"active",
          "startDate":"2023-07-01",
          "endDate":"2023-07-10",
          "createTime":"2023-07-03 15:30:00",
          "modificationTime":"2023-07-03 15:30:00",
          "scheduleSettings":"daily",
          "batchUpdateTime":"2023-07-03 12:00:00",
          "schedule_batch_history":[
             {
                "historyId":"xxxx-1",
                "activityId":"abcdefg123456",
                "batchTime":"2023-07-19 23:59:59",
                "batchResult":"Success"
             },
             {
                "historyId":"xxxx-2",
                "activityId":"abcdefg123456",
                "batchTime":"2023-07-18 23:59:59",
                "batchResult":"Success"
             }
          ]
       }
    ]
 }

]
