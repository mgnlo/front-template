import { ConsoleGroup } from "@api/models/console-group.model";

// 7.2 取得群組設定：GET /api/console-group/{groupId} response ConsoleGroup with ConsoleGroupScope with ConsoleUser
export const ConsoleGroupDetailMock: ConsoleGroup = {
    "groupId": "uuid-1",
    "groupName": "系統管理員",
    "description": "系統管理員",
    "priority": 2,
    "enable": true,
    "createTime": "2023-07-03 15:30:00",
    "modificationTime": "2023-07-03 15:30:00",
    "consoleUser":[
        {
           "userId":"U66972ba05c34190a5bfd576dad10493",
           "account":"admin",
           "name":"Admin",
           "email":"admin@webcomm.com.tw",
           "businessUnit":"Digital_Financial",
           "enable":true,
           "lastLoginTime":"2023-07-03 15:30:00"
        }
     ],
    "consoleGroupScope": [
        {
            "groupId": "uuid-1",
            "scope": "dashboard.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "customer.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "activity.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "activity.create"
        },
        {
            "groupId": "uuid-1",
            "scope": "activity.update"
        },
        {
            "groupId": "uuid-1",
            "scope": "activity.review"
        },
        {
            "groupId": "uuid-1",
            "scope": "tag.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "tag.create"
        },
        {
            "groupId": "uuid-1",
            "scope": "tag.update"
        },
        {
            "groupId": "uuid-1",
            "scope": "tag.review"
        },
        {
            "groupId": "uuid-1",
            "scope": "schedule.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "schedule.create"
        },
        {
            "groupId": "uuid-1",
            "scope": "schedule.update"
        },
        {
            "groupId": "uuid-1",
            "scope": "schedule.review"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-user.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-user.create"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-user.update"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-user.review"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-group.read"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-group.create"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-group.update"
        },
        {
            "groupId": "uuid-1",
            "scope": "console-group.review"
        }
    ]
}
