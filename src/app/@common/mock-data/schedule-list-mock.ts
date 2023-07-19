import { ScheduleSetting } from "@api/models/schedule-manage.model";

export const ScheduleSettingMock: Array<ScheduleSetting> = [
  {
    "scheduleId": "cccccc123456",
    "scheduleName": "標籤名稱A",
    "scheduleDescription": "標籤說明",
    "scheduleType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "active",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",
    "scheduleDimension": "A",
    "scheduleSubDimension": "A",
    "scheduleSettings": "daily",
    "uploadType": "名單上傳類型",
    "filePath": "上傳檔案路徑",
    "scheduleConditionSetting": [
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-1",
        "groupId": 1,
        "detectionCondition": "偵測條件1",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-2",
        "groupId": 1,
        "detectionCondition": "偵測條件2",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-3",
        "groupId": 2,
        "detectionCondition": "偵測條件3",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "scheduleReviewHistory": [
      {
        "historyId": "hh123456",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "建立條件送審",
        "detail": "送程主管",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123457",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "不同意",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123458",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123459",
        "referenceId": "cccccc123456",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "上線人數",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123460",
        "referenceId": "cccccc123456",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123461",
        "referenceId": "cccccc123456",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "排程設定",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123462",
        "referenceId": "cccccc123456",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改標籤"
      }
    ]
  },
  {
    "scheduleId": "cccccc123456",
    "scheduleName": "標籤名稱B",
    "scheduleDescription": "標籤說明",
    "scheduleType": "document",
    "department": "所屬單位",
    "owner": "負責人",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "active",
    "startDate": "2023-06-01",
    "endDate": "2023-08-30",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",
    "scheduleDimension": "B",
    "scheduleSubDimension": "B",
    "scheduleSettings": "daily",
    "uploadType": "名單上傳類型",
    "filePath": "上傳檔案路徑",
    "scheduleConditionSetting": [
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-1",
        "groupId": 1,
        "detectionCondition": "偵測條件1",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-2",
        "groupId": 1,
        "detectionCondition": "偵測條件2",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "scheduleId": "cccccc123456",
        "conditionKey": "condition-key-3",
        "groupId": 2,
        "detectionCondition": "偵測條件3",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "scheduleReviewHistory": [
      {
        "historyId": "hh123456",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "建立條件送審",
        "detail": "送程主管",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123457",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "不同意",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123458",
        "referenceId": "cccccc123456",
        "groupId": 1,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "建立標籤"
      },
      {
        "historyId": "hh123459",
        "referenceId": "cccccc123456",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "上線人數",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123460",
        "referenceId": "cccccc123456",
        "groupId": 2,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123461",
        "referenceId": "cccccc123456",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "修改",
        "detail": "排程設定",
        "type": "修改標籤"
      },
      {
        "historyId": "hh123462",
        "referenceId": "cccccc123456",
        "groupId": 3,
        "time": "2023-07-01 09:00:00",
        "title": "審核",
        "detail": "同意",
        "type": "修改標籤"
      }
    ]
  }
]
