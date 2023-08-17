import { ScheduleTagSetting } from "@api/models/schedule-tag.model"

export const ScheduleTagSettingMock: Array<ScheduleTagSetting> = [
  {
    "tagId": "reference-id-1",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "reference-id-1",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "reference-id-1",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "reference-id-1",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "reference-id-1",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "reference-id-1",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-5",
        "referenceId": "reference-id-1",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "reference-id-2",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "reference-id-2",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "reference-id-2",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "reference-id-2",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "reference-id-2",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "reference-id-2",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "類型",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "reviewing",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Fail",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "類型",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "disabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",

    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Fail",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "類型",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "active",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-cccc",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-cccc",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-cccc",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "normal",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "enabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "normal",
    "conditionSettingQuery": "條件設定語法",
    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "fail",
        "batchResultCount": 100
      }
    ]
  },
  {
    "tagId": "cccccc123456",
    "version": "uuid-cccc",
    "tagName": "標籤名稱",
    "tagDescription": "標籤說明",
    "tagType": "類型",
    "department": "所屬單位",
    "owner": "負責人",
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "status": "disabled",
    "startDate": "2023-07-01",
    "endDate": "2023-07-10",
    "conditionSettingMethod": "條件設定方式",
    "conditionSettingQuery": "條件設定語法",

    "tagConditionSetting": [
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-1",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值1",
        "thresholdValue": "門檻值1"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-2",
        "version": "uuid-zzzz",
        "groupId": 1,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值2",
        "thresholdValue": "門檻值2"
      },
      {
        "tagId": "cccccc123456",
        "conditionId": "condition-key-3",
        "version": "uuid-zzzz",
        "groupId": 2,
        "detectionCondition": "$eq",
        "joinValue": "and",
        "conditionValue": "條件值3",
        "thresholdValue": "門檻值3"
      }
    ],
    "tagDimension": "標籤構面",
    "tagSubDimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "fileName": "上傳檔案名稱",
    "filePath": "上傳檔案路徑",
    "fileData": "上傳檔案資料",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Fail",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "referenceId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      }
    ]
  },

]
