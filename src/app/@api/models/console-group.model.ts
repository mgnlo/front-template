import { ConsoleUserList } from "./console-user.model";

export class ConsoleGroup {
    groupId: string;
    groupName: string;
    description: string;
    priority: number;
    enable: boolean;
    createTime: string;
    modificationTime: string;
    //6.1 master 的時候不會有 ConsoleUserList，需要另外查 6.2 detail 才會得到完整
    consoleUser?: Array<ConsoleUserList>;
    //6.1 master 的時候不會有 Scope，需要另外查 6.2 detail 才會得到完整
    consoleGroupScope?: Array<ConsoleGroupScope>;
}

export class ConsoleGroupScope {
    groupId: string;
    scope: string;
}

// 用於 Grid 中權限內容
export class GridInnerCheckBox {
    featureName: string;
    read?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  }
