import { ActivitySetting } from "@api/models/activity-list.model";

export const ActivityListMock: Array<ActivitySetting> = [
  {
    activityId: "abcdefg123456",
    activityName: "女王節活動",
    activityDescription: "女王節活動 EDM 名單",
    department: "數位金融處",
    owner: "武XX",
    filterOptions: "true",
    listLimit: 100,
    status: "enabled",
    startDate: "2023-07-01",
    endDate: "2023-07-10",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123456",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123456",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123456",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      },
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動",
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 1,
        time: "2023-07-01 08:30:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 1,
        time: "2023-07-01 07:43:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123456",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "a0a0dfc2-7975-4e80-8067-ea267f548337",
    activityName: "快閃活動",
    activityDescription: "-",
    department: "信用卡暨支付處",
    owner: "趙XX",
    filterOptions: "true",
    listLimit: 250,
    status: "reviewing",
    startDate: "2023-07-01",
    endDate: "2023-07-01",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-08-02 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123457",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123457",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123457",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 3,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123457",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "ef9d5fe8-a247-4d79-b9df-946d9ee43678",
    activityName: "每日EDM活動發送",
    activityDescription: "-",
    department: "數位金融處",
    owner: "陳XX",
    filterOptions: "true",
    listLimit: 1000,
    status: "enabled",
    startDate: "2023-10-10",
    endDate: "2023-10-10",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123458",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123458",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-45"
      },
      {
        activityId: "abcdefg123458",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "reviewing",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123458",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "dbfcea5f-8949-4c4e-9964-eebbe316b4f7",
    activityName: "父親節活動",
    activityDescription: "-",
    department: "信用卡暨支付處",
    owner: "彭XX",
    filterOptions: "false",
    listLimit: 180,
    status: "reviewing",
    startDate: "2023-07-01",
    endDate: "2023-07-19",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123459",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123459",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123459",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123459",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "9d24e344-c57b-42cc-bf20-6d62bf857e7f",
    activityName: "情人節活動",
    activityDescription: "-",
    department: "信用卡暨支付處",
    owner: "黃XX",
    filterOptions: "false",
    listLimit: 500,
    status: "enabled",
    startDate: "2023-07-07",
    endDate: "2023-07-31",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123460",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123460",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123460",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123460",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "b28e431c-8730-43a2-b500-ea41f8f1934c",
    activityName: "春節慶祝活動",
    activityDescription: "-",
    department: "數位金融處",
    owner: "李XX",
    filterOptions: "false",
    listLimit: 100,
    status: "disabled",
    startDate: "2024-01-01",
    endDate: "2024-01-19",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123461",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_活存定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123461",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近五個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123461",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近六個月_換匯_交易金額-中",
        tagId: "tag-789"
      },
      {
        activityId: "abcdefg123461",
        conditionId: "4",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_美金換匯頻率-低",
        tagId: "tag-234"
      },
      {
        activityId: "abcdefg123461",
        conditionId: "5",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近六個月_換匯_日幣換匯頻率-低",
        tagId: "tag-345"
      },
    ],
    version: "uuuid-zzzz",
    reviewStatus: "reviewing",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123461",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "f32510d7-225b-4c07-82a6-1292a7ec55c7",
    activityName: "七夕情人節活動",
    activityDescription: "-",
    department: "數位金融處",
    owner: "高XX",
    filterOptions: "true",
    listLimit: 140,
    status: "enabled",
    startDate: "2023-07-01",
    endDate: "2023-07-14",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123462",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123462",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123462",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "reviewing",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123462",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "2498e0bf-2289-4fd9-a037-04a6888a9399",
    activityName: "新商品快閃體驗活動",
    activityDescription: "-",
    department: "信用卡暨支付處",
    owner: "胡XX",
    filterOptions: "true",
    listLimit: 530,
    status: "enabled",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123463",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123463",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123463",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "2498e0bf-2289-4fd9-a037-04a6888a9399",
    activityName: "測試建立活動",
    activityDescription: "暫時的",
    department: "信用卡暨支付處",
    owner: "胡XX",
    filterOptions: "false",
    listLimit: 530,
    status: "enabled",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123463",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123463",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123463",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123463",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "90b010ba-bd4b-480a-a0c7-3a35096f2ed8",
    activityName: "LINE TECHPULSE 2023",
    activityDescription: "LINE TECHPULSE 2023",
    department: "信用卡暨支付處",
    owner: "林XX",
    filterOptions: "false",
    listLimit: 320,
    status: "disabled",
    startDate: "2023-11-01",
    endDate: "2023-12-01",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123464",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123464",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123464",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123464",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "3bf4ef45-5e06-4c39-a097-7bce6e6f8a3f",
    activityName: "中秋節感恩活動",
    activityDescription: "-",
    department: "信用卡暨支付處",
    owner: "許XX",
    filterOptions: "false",
    listLimit: 380,
    status: "disabled",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123465",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123465",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123465",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "reviewing",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123465",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "9f633587-bf0f-4fb8-93d6-458c61a64cac",
    activityName: "測試建立活動",
    activityDescription: "-",
    department: "數位金融處",
    owner: "負責人",
    filterOptions: "false",
    listLimit: 320,
    status: "reviewing",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123466",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "reviewing",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "480ab715-ac6b-4c30-9daf-8e2a0a6ace8c",
    activityName: "2023 AWS re:invent",
    activityDescription: "-",
    department: "數位金融處",
    owner: "負責人",
    filterOptions: "false",
    listLimit: 320,
    status: "reviewing",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123466",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  },
  {
    activityId: "90b010ba-bd4b-480a-a0c7-3a35096f2ed8",
    activityName: "商品EDM雙週發送",
    activityDescription: "-",
    department: "數位金融處",
    owner: "負責人",
    filterOptions: "false",
    listLimit: 320,
    status: "reviewing",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
    createTime: "2023-07-03 15:30:00",
    modificationTime: "2023-07-03 15:30:00",
    scheduleSettings: "daily",
    batchUpdateTime: "2023-07-03 12:00:00",
    activityListCondition: [
      {
        activityId: "abcdefg123466",
        conditionId: "1",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近一個月_基金_定期定額手續費-高",
        tagId: "tag-123"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "2",
        version: "uuid-zzzz",
        tagGroup: 1,
        tagName: "近三個月_基金_手續費-低",
        tagId: "tag-456"
      },
      {
        activityId: "abcdefg123466",
        conditionId: "3",
        version: "uuid-zzzz",
        tagGroup: 2,
        tagName: "近一個月_換匯_交易金額-高",
        tagId: "tag-789"
      }
    ],
    version: "uuuid-zzzz",
    reviewStatus: "approved",
    activityReviewHistoryAud: [
      {
        historyId: "h123456",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "建立條件送審",
        detail: "送程主管",
        type: "建立活動"
      },
      {
        historyId: "h123457",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "不同意",
        type: "建立活動"
      },
      {
        historyId: "h123458",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 1,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "建立活動"
      },
      {
        historyId: "h123459",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "上線人數",
        type: "修改活動"
      },
      {
        historyId: "h123460",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 2,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      },
      {
        historyId: "h123461",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "修改",
        detail: "排程設定",
        type: "修改活動"
      },
      {
        historyId: "h123462",
        version: "uuid-zzzz",
        referenceId: "abcdefg123466",
        groupId: 3,
        time: "2023-07-01 09:00:00",
        title: "審核",
        detail: "同意",
        type: "修改活動"
      }
    ]
  }
    
]