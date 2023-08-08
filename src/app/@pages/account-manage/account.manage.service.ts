import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ResponseModel } from '@api/models/base.model';
import { ConsoleGroup } from '@api/models/console-group.model';
import { ConsoleUser, ConsoleUserReq } from '@api/models/console-user.model';
import { ApiService } from '@api/services/api.service';
import { DialogService } from '@api/services/dialog.service';
import { RestStatus } from '@common/enums/rest-enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AccountManageService {
    
    public readonly CONSOLE_GROUP_LIST_PATH = ['pages', 'account-manage', 'console-group-list'];
    public readonly CONSOLE_GROUP_DETAIL_PATH = ['pages', 'account-manage', 'console-group-detail'];
    public readonly CONSOLE_GROUP_EDIT_PATH = ['pages', 'account-manage', 'console-group-edit'];
    public readonly CONSOLE_GROUP_ADD_PATH = ['pages', 'account-manage', 'console-group-add'];

    readonly consoleUserFunc = 'console-user/';
    readonly consoleGroupFunc = 'console-group/';

    //ConsoleGroupListCache，做為返回取消 cache 用途
    private consoleGroupLiistCahce: string;

    public setConsoleGroupListCache(cache: any){
        this.consoleGroupLiistCahce = JSON.stringify(cache);
    }

    public getConsoleGroupListCache(){
        let cache = null;

        if(this.consoleGroupLiistCahce){
            cache = JSON.parse(this.consoleGroupLiistCahce);
            this.consoleGroupLiistCahce = null;
        }
        
        return cache;
    }

    //ConsoleGroupDetailCache
    public consoleGroupDetailCache: string;

    public setConsoleGroupDetailCache(cache: any){
        this.consoleGroupDetailCache = JSON.stringify(cache);
    }

    public getConsoleGroupDetailCache(){
        let cache = null;
        
        if(this.consoleGroupDetailCache){
            cache = JSON.parse(this.consoleGroupDetailCache);
            this.consoleGroupDetailCache = null;
        }
        
        return cache;
    }


    constructor(private service: ApiService, dialogService: DialogService) { }

    // 6.1 取得所有使用者：GET /api/console-user
    // List<ConsoleUser> with ConsoleGroup
    // 用於當無任何查詢條件參數時使用
    getAllConsoleUser(): Observable<ResponseModel<Array<ConsoleGroup>>> {
        return this.service.doGet(this.consoleUserFunc);
    }

    // 6.2 搜尋使用者：GET /api/console-user?filterField=filterValue
    // List<ConsoleUser> with ConsoleGroup
    getConsoleUser(reqData: ConsoleUserReq): Observable<ResponseModel<Array<ConsoleGroup>>> {
        return this.service.doGet(this.consoleGroupFunc, reqData);
    }

    // 6.6 更新使用者：PUT /api/console-user/{userId}
    // reqBody ConsoleUser with ConsoleGroup
    updateConsoleUser(userId: string, reqData: ConsoleUser): Observable<ResponseModel<any>> {
        return this.service.doPut(this.consoleGroupFunc + userId, reqData);
    }

    // 7.1 取得所有群組：GET /api/console-group     
    // response List<ConsoleGroup>
    getConsoleGroupList(): Observable<ResponseModel<Array<ConsoleGroup>>> {
        return this.service.doGet(this.consoleGroupFunc);
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
