import { ConsoleGroup } from "./console-group.model";

export class ConsoleUser {
    userId: string;
    account: string;
    name: string;
    email: string;
    businessUnit: string;
    enable: boolean;
    lastLoginTime: string;
    consoleGroup?: ConsoleGroup;
}
