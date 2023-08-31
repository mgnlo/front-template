import { ConsoleGroup } from "./console-group.model";

export class ConsoleUserList {
    userId: string;
    account: string;
    name: string;
    email: string;
    businessUnit: string;
    enable: boolean;
    lastLoginTime: string;
    consoleGroup?: ConsoleGroup;
}

export class ConsoleUserListReq {
    account?: string;
    name?: string;
    email?: string;
    // 如果查詢條件為多單位，則用 ',' 作為隔離符號
    businessUnit?: string; 
    groupId?: string;
}
