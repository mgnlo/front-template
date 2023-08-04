import { ScheduleActivitySetting } from "@api/models/schedule-activity.model";

export const ScheduleActivitySettingMock: Array<ScheduleActivitySetting> = [
  {
    "scheduleId": "uuid-1",
    "version": "uuid-zzzz",
    "jobName": "Job Name",
    "executionFrequency": "Daily",
    "creationTime": "2023-07-20 10:00:00",
    "modificationTime": "2023-07-20 12:30:00",
    "status": "enabled",
    "activitySetting": [
      {
        "activityId": "abcdefg1234567777",
        "version": "uuid-zzzz",
        "activityName": "女王節活動BBBB",
        "activityDescription": "女王節活動 EDM 名單",
        "filterOptions": "true",
        "listLimit": 100,
        "status": "enabled",
        "startDate": "2023-07-01",
        "endDate": "2023-07-10",
        "createTime": "2023-07-03 15:30:00",
        "modificationTime": "2023-07-03 15:30:00",
        "scheduleSettings": "daily",
        "batchUpdateTime": "2023-07-03 12:00:00",
        "schedule_batch_history": [
          {
            "historyId": "xxxx-1",
            "activityId": "abcdefg123456",
            "version": "uuid-zzzz",
            "batchResultCount": 300,
            "batchTime": "2023-07-19 23:59:59",
            "batchResult": "Success"
          },
          {
            "historyId": "xxxx-2",
            "activityId": "abcdefg123456",
            "version": "uuid-zzzz",
            "batchResultCount": null,
            "batchTime": "2023-07-18 23:59:59",
            "batchResult": "Success"
          }
        ]
      },
      {
        "activityId": "abcdefg123456",
        "version": "uuid-zzzz",
        "activityName": "女王節活動AAAAA",
        "activityDescription": "女王節活動 EDM 名單",
        "filterOptions": "false",
        "listLimit": 100,
        "status": "enabled",
        "startDate": "2023-07-01",
        "endDate": "2023-07-10",
        "createTime": "2023-07-03 15:30:00",
        "modificationTime": "2023-07-03 15:30:00",
        "scheduleSettings": "daily",
        "batchUpdateTime": "2023-07-03 12:00:00",
        "schedule_batch_history": [
          {
            "historyId": "xxxx-1",
            "activityId": "abcdefg1234567",
            "version": "uuid-zzzz",
            "batchResultCount": 150,
            "batchTime": "2023-07-19 23:59:59",
            "batchResult": "Success"
          },
          {
            "historyId": "xxxx-2",
            "activityId": "abcdefg1234567",
            "version": "uuid-zzzz",
            "batchResultCount": 300,
            "batchTime": "2023-07-18 23:59:59",
            "batchResult": "Success"
          }
        ]
      }
    ],
    "scheduleReviewHistory": [
      {
        "historyId": "h123456",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "建立排程送審",
        "detail": "送程主管",
        "type": "建立排程"
      },
      {
        "historyId": "h123457",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "不同意",
        "type": "建立排程"
      },
      {
        "historyId": "h123458",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "建立排程"
      },
      {
        "historyId": "h123459",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "排程設定",
        "type": "修改排程"
      },
      {
        "historyId": "h123460",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改排程"
      },
      {
        "historyId": "h123461",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "排程設定",
        "type": "修改排程"
      },
      {
        "historyId": "h123462",
        "version": "uuid-zzzz",
        "referenceId": "uuid-1",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改排程"
      }
    ]
  }
]
