import { ActivitySetting } from "@api/models/activity-list.model";

export const ActivityListMock: Array<ActivitySetting> = [
    {
      activityId: "abcdefg123456",
      activityName: "女王節活動",
      activityDescription: "女王節活動 EDM 名單",
      filterOptions: "true",
      listLimit: 100,
      status: "active",
      startDate: "2023-07-01",
      endDate: "2023-07-10",
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
            tagKey: "tag-123"
        },
        {
            activityId: "abcdefg123456",
            conditionId: "2",
            version: "uuid-zzzz",
            tagGroup: 1,
            tagName: "近三個月_基金_手續費-低",
            tagKey: "tag-456"
        },
        {
            activityId: "abcdefg123456",
            conditionId: "3",
            version: "uuid-zzzz",
            tagGroup: 2,
            tagName: "近一個月_換匯_交易金額-高",
            tagKey: "tag-789"
        },
      ],
      activityReviewHistory: [
        {
            historyId: "h123456",
            referenceId: "abcdefg123456",
            groupId: 1,
            time: "2023-07-01 09:00:00",
            title: "建立條件送審",
            detail: "送程主管",
            type: "建立活動",
        },
        {
            historyId: "h123457",
            referenceId: "abcdefg123456",
            groupId: 1,
            time: "2023-07-01 08:30:00",
            title: "審核",
            detail: "不同意",
            type: "建立活動"
        },
        {
            historyId: "h123458",
            referenceId: "abcdefg123456",
            groupId: 1,
            time: "2023-07-01 07:43:00",
            title: "審核",
            detail: "同意",
            type: "建立活動"
        },
        {
            historyId: "h123459",
            referenceId: "abcdefg123456",
            groupId: 2,
            time: "2023-07-01 09:00:00",
            title: "修改",
            detail: "上線人數",
            type: "修改活動"
        },
        {
            historyId: "h123460",
            referenceId: "abcdefg123456",
            groupId: 2,
            time: "2023-07-01 09:00:00",
            title: "審核",
            detail: "同意",
            type: "修改活動"
        },
        {
            historyId: "h123461",
            referenceId: "abcdefg123456",
            groupId: 3,
            time: "2023-07-01 09:00:00",
            title: "修改",
            detail: "排程設定",
            type: "修改活動"
        },
        {
            historyId: "h123462",
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
    activityId: "abcdefg123457",
    activityName: "快閃活動",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 250,
    status: "ing",
    startDate: "2023-07-01",
    endDate: "2023-07-01",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123457",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123457",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 3,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123457",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123457",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123457",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123457",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123457",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123457",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123458",
    activityName: "每日EDM活動發送",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 1000,
    status: "active",
    startDate: "2023-10-10",
    endDate: "2023-10-10",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123458",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-45"
        },
        {
          activityId: "abcdefg123458",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123458",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123458",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123458",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123458",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123458",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123458",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123459",
    activityName: "父親節活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 180,
    status: "ing",
    startDate: "2023-07-01",
    endDate: "2023-07-19",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123459",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123459",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123459",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123459",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123459",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123459",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123459",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123459",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123460",
    activityName: "情人節活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 500,
    status: "active",
    startDate: "2023-07-07",
    endDate: "2023-07-31",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123460",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123460",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123460",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123460",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123460",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123460",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123460",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123460",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123461",
    activityName: "春節慶祝活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 100,
    status: "stop",
    startDate: "2024-01-01",
    endDate: "2024-01-19",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123461",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近五個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123461",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近六個月_換匯_交易金額-中",
          tagKey: "tag-789"
        },
        {
          activityId: "abcdefg123461",
          conditionId: "4",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_美金換匯頻率-低",
          tagKey: "tag-234"
        },
        {
          activityId: "abcdefg123461",
          conditionId: "5",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近六個月_換匯_日幣換匯頻率-低",
          tagKey: "tag-345"
        },
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123461",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123461",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123461",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123461",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123461",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123461",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123462",
    activityName: "七夕情人節活動",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 140,
    status: "active",
    startDate: "2023-07-01",
    endDate: "2023-07-14",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123462",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123462",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123462",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123462",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123462",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123462",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123462",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123462",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123463",
    activityName: "新商品快閃體驗活動",
    activityDescription: "-",
    filterOptions: "true",
    listLimit: 530,
    status: "active",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123463",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123463",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123463",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123463",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123463",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123463",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123463",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123463",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123464",
    activityName: "商品EDM雙週發送",
    activityDescription: "雙週發送公司每期商品資訊",
    filterOptions: "false",
    listLimit: 320,
    status: "stop",
    startDate: "2023-11-01",
    endDate: "2023-12-01",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123464",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123464",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123464",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123464",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123464",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123464",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123464",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123464",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123465",
    activityName: "中秋節感恩活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 380,
    status: "stop",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123465",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123465",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123465",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123465",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123465",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123465",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123465",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123465",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
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
    activityId: "abcdefg123466",
    activityName: "中秋節感恩活動",
    activityDescription: "-",
    filterOptions: "false",
    listLimit: 320,
    status: "ing",
    startDate: "2023-09-20",
    endDate: "2023-09-29",
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
          tagKey: "tag-123"
        },
        {
          activityId: "abcdefg123466",
          conditionId: "2",
          version: "uuid-zzzz",
          tagGroup: 1,
          tagName: "近三個月_基金_手續費-低",
          tagKey: "tag-456"
        },
        {
          activityId: "abcdefg123466",
          conditionId: "3",
          version: "uuid-zzzz",
          tagGroup: 2,
          tagName: "近一個月_換匯_交易金額-高",
          tagKey: "tag-789"
        }
    ],
    activityReviewHistory: [
        {
          historyId: "h123456",
          referenceId: "abcdefg123466",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "建立條件送審",
          detail: "送程主管",
          type: "建立活動"
        },
        {
          historyId: "h123457",
          referenceId: "abcdefg123466",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "不同意",
          type: "建立活動"
        },
        {
          historyId: "h123458",
          referenceId: "abcdefg123466",
          groupId: 1,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "建立活動"
        },
        {
          historyId: "h123459",
          referenceId: "abcdefg123466",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "上線人數",
          type: "修改活動"
        },
        {
          historyId: "h123460",
          referenceId: "abcdefg123466",
          groupId: 2,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        },
        {
          historyId: "h123461",
          referenceId: "abcdefg123466",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "修改",
          detail: "排程設定",
          type: "修改活動"
        },
        {
          historyId: "h123462",
          referenceId: "abcdefg123466",
          groupId: 3,
          time: "2023-07-01 09:00:00",
          title: "審核",
          detail: "同意",
          type: "修改活動"
        }
    ]
  },
]