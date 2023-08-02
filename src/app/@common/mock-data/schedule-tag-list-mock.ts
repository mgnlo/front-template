import { ScheduleTagSetting } from "@api/models/schedule-tag.model"

export const ScheduleSettingMock: Array<ScheduleTagSetting> = [
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
    "tagDimension": "標籤構面",
    "tagSubdimension": "標籤子構面",
    "scheduleSettings": "排成設定",
    "uploadType": "名單上傳類型",
    "filePath": "上傳檔案路徑",
    "scheduleBatchHistory": [
      {
        "historyId": "xxxx-3",
        "tagId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-19 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      },
      {
        "historyId": "xxxx-4",
        "tagId": "cccccc123456",
        "version": "uuid-cccc",
        "batchTime": "2023-07-18 23:59:59",
        "batchResult": "Success",
        "batchResultCount": 100
      }
    ]
  }
]
