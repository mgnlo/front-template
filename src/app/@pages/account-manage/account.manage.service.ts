import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AccountManageService {
    static CONSOLE_GROUP_LIST_PATH(CONSOLE_GROUP_LIST_PATH: any, passData: NavigationExtras) {
      throw new Error('Method not implemented.');
    }
    public CONSOLE_GROUP_LIST_PATH = ['pages', 'account-manage', 'console-group-list'];
    public CONSOLE_GROUP_DETAIL_PATH = ['pages', 'account-manage', 'console-group-detail'];
    public CONSOLE_GROUP_EDIT_PATH = ['pages', 'account-manage', 'console-group-edit'];
    public CONSOLE_GROUP_ADD_PATH = ['pages', 'account-manage', 'console-group-add'];

    //ConsoleGroupListCache
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


    constructor(private router: Router) { }
}
