export class ConsoleGroup {
    groupId: string;
    groupName: string;
    description: string;
    priority: number;
    enable: boolean;
    createTime: string;
    modificationTime: string;
    //master 的時候不會有 Scope，需要另外查 scope 電文併入到這邊
    consoleGroupScope?: Array<ConsoleGroupScope>;
}

export class ConsoleGroupScope {
    groupId: string;
    scope: string;
}

// 用於 Grid 中權限內容
export class GridInnerCheckBox {
    featureName: string;
    read: boolean;
    create?: boolean;
    update?: boolean;
    review?: boolean;
  }
