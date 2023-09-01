import { ActivityReviewHistory } from "@api/models/activity-list.model";

export const ReviewActivityListMock: Array<ActivityReviewHistory> = [
  {
    historyId: "h123456",
    version: "uuid-zzzz",
    referenceId: "abcdefg123456",
    groupId: 1,
    time: "2023-07-01 09:00:00",
    title: "建立條件送審",
    detail: "送程主管",
    type: "建立活動",
    reviewStatus: "approved",
    reviewer: null,
    reviewComment: null,
    activityName: "快閃活動",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 250,
    status: "enabled",
    startDate: "2023-07-01",
    endDate: "2023-07-01",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-08-02 12:00:00",
    activityListCondition:[
      {
         activityId: "abcdefg123457",
         conditionId:"1",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId: "abcdefg123457",
         conditionId:"2",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近三個月_基金_手續費-低",
         tagKey:"tag-456"
      },
      {
         activityId: "abcdefg123457",
         conditionId:"3",
         version: "uuid-zzzz",
         tagGroup:2,
         tagName:"近三個月_換匯_交易金額-低",
         tagKey:"tag-790"
      }
    ]
  },
  {
    historyId: "h123457",
    version: "uuid-zzzz",
    referenceId: "ef9d5fe8-a247-4d79-b9df-946d9ee43678",
    groupId: 1,
    time: "2023-07-01 09:00:00",
    title: "審核",
    detail: "不同意",
    type: "建立活動",
    reviewStatus: "rejected",
    reviewer: null,
    reviewComment: null,
    activityName: "每日EDM活動發送",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 1000,
    status: "disabled",
    startDate: "2023-10-10",
    endDate: "2023-10-10",
    modificationTime: "2023-09-06 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition:[
      {
         activityId:"uuid-b",
         conditionId:"1",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId:"uuid-b",
         conditionId:"2",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近三個月_基金_手續費-低",
         tagKey:"tag-457"
      },
      {
         activityId:"uuid-b",
         conditionId:"3",
         version: "uuid-zzzz",
         tagGroup:2,
         tagName:"近一個月_換匯_交易金額-高",
         tagKey:"tag-789"
      }
    ]
  },
  {
    historyId: "h123459",
    version: "uuid-zzzz",
    referenceId: "dbfcea5f-8949-4c4e-9964-eebbe316b4f7",
    groupId: 2,
    time: "2023-07-01 09:00:00",
    title: "修改",
    detail: "上線人數",
    type: "修改活動",
    reviewStatus: "reviewing",
    activityName: "父親節活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 180,
    startDate: "2023-07-01",
    endDate: "2023-07-19",
    status: "reviewing",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "monthly",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition:[
      {
         activityId:"uuid-b",
         conditionId:"1",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId:"uuid-b",
         conditionId:"2",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近三個月_基金_手續費-低",
         tagKey:"tag-456"
      },
      {
         activityId:"uuid-b",
         conditionId:"3",
         version: "uuid-zzzz",
         tagGroup:2,
         tagName:"近一個月_換匯_交易金額-高",
         tagKey:"tag-789"
      },
      {
         activityId:"uuid-b",
         conditionId:"4",
         version: "uuid-zzzz",
         tagGroup:3,
         tagName:"近一個月_換匯_交易金額-高",
         tagKey:"tag-792"
      }
    ]
  },
  {
    historyId: "h123459",
    version: "uuid-zzzz",
    referenceId: "9d24e344-c57b-42cc-bf20-6d62bf857e7f",
    groupId: 2,
    time: "2023-07-01 09:00:00",
    title: "修改",
    detail: "上線人數",
    type: "修改活動",
    reviewStatus: "reviewing",
    activityName: "商品EDM雙週發送",
    activityDescription: "雙週發送公司每期商品資訊",
    filterOptions: "true",
    listLimit: 180,
    startDate: "2023-07-01",
    endDate: "2023-07-19",
    status: "reviewing",
    modificationTime: "2023-02-05 15:30:00",
    scheduleSettings: "monthly",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition:[
      {
         activityId:"uuid-b",
         conditionId:"1",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId:"uuid-b",
         conditionId:"2",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近三個月_基金_手續費-低",
         tagKey:"tag-456"
      }
    ]
  },
  {
    historyId: "h123460",
    version: "uuid-zzzz",
    referenceId: "b28e431c-8730-43a2-b500-ea41f8f1934c",
    groupId: 2,
    time: "2023-07-01 09:00:00",
    title: "審核",
    detail: "同意",
    type: "修改活動",
    reviewStatus: "rejected",
    activityName: "春節慶祝活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 100,
    status: "disabled",
    startDate: "2024-01-01",
    endDate: "2024-01-19",
    modificationTime: "2023-03-21 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition:[
      {
         activityId:"uuid-b",
         conditionId:"1",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId:"uuid-b",
         conditionId:"2",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"性別-男",
         tagKey:"tag-456"
      },
      {
         activityId:"uuid-b",
         conditionId:"3",
         version: "uuid-zzzz",
         tagGroup:2,
         tagName:"近一個月_換匯_交易金額-高",
         tagKey:"tag-789"
      }
    ]
  },
  {
    historyId: "h123460",
    version: "3bf4ef45-5e06-4c39-a097-7bce6e6f8a3f",
    referenceId: "abcdefg123456",
    groupId: 2,
    time: "2023-07-01 09:00:00",
    title: "審核",
    detail: "同意",
    type: "修改活動",
    reviewStatus: "rejected",
    activityName: "中秋節感恩活動",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 320,
    status: "reviewing",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
    modificationTime: "2023-07-07 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition:[
      {
         activityId:"uuid-b",
         conditionId:"7",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近一個月_基金_定期定額手續費-高",
         tagKey:"tag-123"
      },
      {
         activityId:"uuid-b",
         conditionId:"8",
         version: "uuid-zzzz",
         tagGroup:1,
         tagName:"近三個月_基金_手續費-低",
         tagKey:"tag-456"
      },
      {
         activityId:"uuid-b",
         conditionId:"9",
         version: "uuid-zzzz",
         tagGroup:2,
         tagName:"近一個月_換匯_交易金額-高",
         tagKey:"tag-789"
      }
    ]
  },
  {
   historyId: "h123456",
   version: "uuid-zzzz",
   referenceId: "a0a0dfc2-7975-4e80-8067-ea267f548337",
   groupId: 1,
   time: "2023-07-01 09:00:00",
   title: "建立條件送審",
   detail: "送程主管",
   type: "建立活動",
   reviewStatus: "approved",
   reviewer: null,
   reviewComment: null,
   activityName: "快閃活動",
   activityDescription: "-",
   filterOptions: "true",
   listLimit: 250,
   status: "disabled",
   startDate: "2023-07-01",
   endDate: "2023-07-01",
   modificationTime: "2023-07-03 15:30:00",
   scheduleSettings: "daily",
   batchUpdateTime: "2023-08-02 12:00:00",
   activityListCondition:[
     {
        activityId: "abcdefg123457",
        conditionId:"1",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近一個月_基金_定期定額手續費-高",
        tagKey:"tag-123"
     },
     {
        activityId: "abcdefg123457",
        conditionId:"2",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近三個月_基金_手續費-低",
        tagKey:"tag-456"
     },
     {
        activityId: "abcdefg123457",
        conditionId:"3",
        version: "uuid-zzzz",
        tagGroup:2,
        tagName:"近三個月_換匯_交易金額-低",
        tagKey:"tag-790"
     }
   ]
 },
 {
   historyId: "h123459",
   version: "uuid-zzzz",
   referenceId: "dbfcea5f-8949-4c4e-9964-eebbe316b4f7",
   groupId: 2,
   time: "2023-07-01 09:00:00",
   title: "修改",
   detail: "上線人數",
   type: "修改活動",
   reviewStatus: "reviewing",
   activityName: "父親節活動",
   activityDescription: "-",
   filterOptions: "false",
   listLimit: 180,
   startDate: "2023-07-01",
   endDate: "2023-07-19",
   status: "reviewing",
   modificationTime: "2023-07-03 15:30:00",
   scheduleSettings: "monthly",
   batchUpdateTime: "2023-07-03 12:00:00",
   activityListCondition:[
     {
        activityId:"uuid-b",
        conditionId:"1",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近一個月_基金_定期定額手續費-高",
        tagKey:"tag-123"
     },
     {
        activityId:"uuid-b",
        conditionId:"2",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近三個月_基金_手續費-低",
        tagKey:"tag-456"
     },
     {
        activityId:"uuid-b",
        conditionId:"3",
        version: "uuid-zzzz",
        tagGroup:2,
        tagName:"近一個月_換匯_交易金額-高",
        tagKey:"tag-789"
     },
     {
        activityId:"uuid-b",
        conditionId:"4",
        version: "uuid-zzzz",
        tagGroup:3,
        tagName:"近一個月_換匯_交易金額-高",
        tagKey:"tag-792"
     }
   ]
 },
 {
   historyId: "h123459",
   version: "uuid-zzzz",
   referenceId: "90b010ba-bd4b-480a-a0c7-3a35096f2ed8",
   groupId: 2,
   time: "2023-07-01 09:00:00",
   title: "修改",
   detail: "上線人數",
   type: "修改活動",
   reviewStatus: "reviewing",
   activityName: "商品EDM雙週發送",
   activityDescription: "雙週發送公司每期商品資訊",
   filterOptions: "true",
   listLimit: 180,
   startDate: "2023-07-01",
   endDate: "2023-07-19",
   status: "reviewing",
   modificationTime: "2023-02-05 15:30:00",
   scheduleSettings: "monthly",
   batchUpdateTime: "2023-07-03 12:00:00",
   activityListCondition:[
     {
        activityId:"uuid-b",
        conditionId:"1",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近一個月_基金_定期定額手續費-高",
        tagKey:"tag-123"
     },
     {
        activityId:"uuid-b",
        conditionId:"2",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近三個月_基金_手續費-低",
        tagKey:"tag-456"
     }
   ]
 },
 {
   historyId: "h123459",
   version: "uuid-zzzz",
   referenceId: "dbfcea5f-8949-4c4e-9964-eebbe316b4f7",
   groupId: 2,
   time: "2023-07-01 09:00:00",
   title: "修改",
   detail: "上線人數",
   type: "修改活動",
   reviewStatus: "reviewing",
   activityName: "父親節活動",
   activityDescription: "-",
   filterOptions: "false",
   listLimit: 180,
   startDate: "2023-07-01",
   endDate: "2023-07-19",
   status: "reviewing",
   modificationTime: "2023-07-03 15:30:00",
   scheduleSettings: "monthly",
   batchUpdateTime: "2023-07-03 12:00:00",
   activityListCondition:[
     {
        activityId:"uuid-b",
        conditionId:"1",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近一個月_基金_定期定額手續費-高",
        tagKey:"tag-123"
     },
     {
        activityId:"uuid-b",
        conditionId:"2",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近三個月_基金_手續費-低",
        tagKey:"tag-456"
     },
     {
        activityId:"uuid-b",
        conditionId:"3",
        version: "uuid-zzzz",
        tagGroup:2,
        tagName:"近一個月_換匯_交易金額-高",
        tagKey:"tag-789"
     },
     {
        activityId:"uuid-b",
        conditionId:"4",
        version: "uuid-zzzz",
        tagGroup:3,
        tagName:"近一個月_換匯_交易金額-高",
        tagKey:"tag-792"
     }
   ]
 },
 {
   historyId: "h123459",
   version: "uuid-zzzz",
   referenceId: "90b010ba-bd4b-480a-a0c7-3a35096f2ed8",
   groupId: 2,
   time: "2023-07-01 09:00:00",
   title: "修改",
   detail: "上線人數",
   type: "修改活動",
   reviewStatus: "reviewing",
   activityName: "商品EDM雙週發送",
   activityDescription: "雙週發送公司每期商品資訊",
   filterOptions: "true",
   listLimit: 180,
   startDate: "2023-07-01",
   endDate: "2023-07-19",
   status: "reviewing",
   modificationTime: "2023-02-05 15:30:00",
   scheduleSettings: "monthly",
   batchUpdateTime: "2023-07-03 12:00:00",
   activityListCondition:[
     {
        activityId:"uuid-b",
        conditionId:"1",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近一個月_基金_定期定額手續費-高",
        tagKey:"tag-123"
     },
     {
        activityId:"uuid-b",
        conditionId:"2",
        version: "uuid-zzzz",
        tagGroup:1,
        tagName:"近三個月_基金_手續費-低",
        tagKey:"tag-456"
     }
   ]
 },
]