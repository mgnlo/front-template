import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { ConsoleGroup, GridInnerCheckBox } from '@api/models/console-group.model';
import { ConsoleUser } from '@api/models/console-user.model';
import { ApiService } from '@api/services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class AccountManageService {

    readonly consoleUserFunc = 'console-user/';
    readonly consoleGroupFunc = 'console-group/';
    readonly CONSOLE_GROUP_LIST_PATH = ['pages', 'account-manage', 'console-group-list'];
    readonly CONSOLE_GROUP_DETAIL_PATH = ['pages', 'account-manage', 'console-group-detail'];
    readonly CONSOLE_GROUP_SET_PATH = ['pages', 'account-manage', 'console-group-set'];

    createDefaultScopeGridInnerCheckBoxs(): Array<GridInnerCheckBox> {
        return [
            { featureName: "dashboard", read: false },
            { featureName: "customer", read: false },
            { featureName: "activity", read: false, create: false, update: false, delete: false },
            { featureName: "tag", read: false, create: false, update: false, delete: false },
            { featureName: "review-tag", read: false, update: false },
            { featureName: "review-activity", read: false, update: false },
            { featureName: "review-schedule", read: false, update: false },
            { featureName: "schedule-tag", read: false, update: false },
            { featureName: "schedule-activity", read: false, create: false, update: false, delete: false },
            { featureName: "console-user", read: false, update: false },
            { featureName: "console-group", read: false, create: false, update: false, delete: false }
        ];
    }
    
    updateCheckbox(target: GridInnerCheckBox[], source: GridInnerCheckBox[]) {
        target.forEach(targetRow => {
            let sourceRow = source.find(row => row.featureName === targetRow.featureName);
            if (!sourceRow) { return; }
            Object.keys(sourceRow).filter(key => key !== 'featureName').forEach(key => {
                targetRow[key] = sourceRow[key];
            });
        });
    }

    constructor(private service: ApiService) { }

    // 6.7 更新使用者：PUT /api/console-user/{userId}
    // reqBody ConsoleUser with ConsoleGroup
    updateConsoleUser(userId: string, reqData: ConsoleUser): Observable<ResponseModel<any>> {
        return this.service.doPut(this.consoleUserFunc + userId, reqData);
    }

    // 7.1 取得所有群組：GET /api/console-group     
    // response List<ConsoleGroup>
    getConsoleGroupList(size?: number): Observable<ResponseModel<Array<ConsoleGroup>>> {
        return !!size ? this.service.doGet(this.consoleGroupFunc, { size }) : this.service.doGet(this.consoleGroupFunc);
    }

    // 7.2 取得群組設定：GET /api/console-group/{groupId}
    // response ConsoleGroup with ConsoleGroupScope with ConsoleUser
    getConsoleGroup(groupId: string): Observable<ResponseModel<ConsoleGroup>> {
        return this.service.doGet(`${this.consoleGroupFunc}${groupId}`);
    }

    // 7.3 建立新群組設定：POST /api/console-group
    // reqBody ConsoleGroup with ConsoleGroupScope
    createConsoleGroup(reqData: ConsoleGroup): Observable<ResponseModel<any>> {
        return this.service.doPost(this.consoleGroupFunc, reqData);
    }

    // 7.4 更新群組設定：PUT /api/console-group/{groupId}
    // reqBody ConsoleGroup with ConsoleGroupScope with ConsoleUser
    updateConsoleGroup(groupId: string, reqData: ConsoleGroup): Observable<ResponseModel<any>> {
        return this.service.doPut(`${this.consoleGroupFunc}${groupId}`, reqData);
    }
}
