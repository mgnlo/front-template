import { Activity } from "@api/models/activity-list.model";

export const ActivityListMock: Array<Activity> = [
  {
    "activity_id": "abcdefg123456",
    "activity_name": "女王節活動",
    "activity_description": "女王節活動 EDM 名單",
    "filter_options": "true",
    "list_limit": 100,
    "status": "active",
    "start_date": "2023-07-01",
    "end_date": "2023-07-10",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "快閃活動",
    "activity_description": "-",
    "filter_options": "true",
    "list_limit": 250,
    "status": "active",
    "start_date": "2023-07-01",
    "end_date": "2023-07-01",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-08-02 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "每日EDM活動發送",
    "activity_description": "-",
    "filter_options": "true",
    "list_limit": 1000,
    "status": "active",
    "start_date": "2023-10-10",
    "end_date": "2023-10-10",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "父親節活動",
    "activity_description": "-",
    "filter_options": "false",
    "list_limit": 180,
    "status": "ing",
    "start_date": "2023-07-01",
    "end_date": "2023-07-19",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "情人節活動",
    "activity_description": "-",
    "filter_options": "false",
    "list_limit": 500,
    "status": "active",
    "start_date": "2023-07-07",
    "end_date": "2023-07-31",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "春節慶祝活動",
    "activity_description": "-",
    "filter_options": "false",
    "list_limit": 100,
    "status": "stop",
    "start_date": "2024-01-01",
    "end_date": "2024-01-19",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "七夕情人節活動",
    "activity_description": "-",
    "filter_options": "true",
    "list_limit": 140,
    "status": "active",
    "start_date": "2023-07-01",
    "end_date": "2023-07-14",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "新商品快閃體驗活動",
    "activity_description": "-",
    "filter_options": "true",
    "list_limit": 530,
    "status": "active",
    "start_date": "2024-03-20",
    "end_date": "2024-03-20",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "商品EDM雙週發送",
    "activity_description": "雙週發送公司每期商品資訊",
    "filter_options": "false",
    "list_limit": 320,
    "status": "stop",
    "start_date": "2023-11-01",
    "end_date": "2023-12-01",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "中秋節感恩活動",
    "activity_description": "-",
    "filter_options": "false",
    "list_limit": 380,
    "status": "stop",
    "start_date": "2023-09-20",
    "end_date": "2023-09-29",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
  {
    "activity_id": "abcdefg123456",
    "activity_name": "中秋節感恩活動",
    "activity_description": "-",
    "filter_options": "false",
    "list_limit": 320,
    "status": "ing",
    "start_date": "2023-09-20",
    "end_date": "2023-09-29",
    "modification_time": "2023-07-03 15:30:00",
    "schedule_settings": "daily",
    "batch_update_time": "2023-07-03 12:00:00",
    "activity_list_condition": [
        {
          "activity_id": "abcdefg123456",
          "condition_id": 1,
          "tag_group": 1,
          "tag_name": "近一個月_基金_定期定額手續費-高",
          "tag_key": "tag-123"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 2,
          "tag_group": 1,
          "tag_name": "近三個月_基金_手續費-低",
          "tag_key": "tag-456"
        },
        {
          "activity_id": "abcdefg123456",
          "condition_id": 3,
          "tag_group": 2,
          "tag_name": "近一個月_換匯_交易金額-高",
          "tag_key": "tag-789"
        }
    ],
    "change_history": [
        {
          "history_id": "h123456",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "建立條件送審",
          "detail": "送程主管",
          "type": "建立活動"
        },
        {
          "history_id": "h123457",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "不同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123458",
          "activity_id": "abcdefg123456",
          "group_id": 1,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "建立活動"
        },
        {
          "history_id": "h123459",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "上線人數",
          "type": "修改活動"
        },
        {
          "history_id": "h123460",
          "activity_id": "abcdefg123456",
          "group_id": 2,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        },
        {
          "history_id": "h123461",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "修改",
          "detail": "排程設定",
          "type": "修改活動"
        },
        {
          "history_id": "h123462",
          "activity_id": "abcdefg123456",
          "group_id": 3,
          "time": "2023-07-01 09:00:00",
          "title": "審核",
          "detail": "同意",
          "type": "修改活動"
        }
    ]
  },
]