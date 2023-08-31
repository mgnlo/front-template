import { Injectable } from '@angular/core';
import { ResponseModel } from '@api/models/base.model';
import { ConsoleUserList } from '@api/models/console-user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    readonly ssoLoginFunc = 'ssoLogin/';
    schemaName: string = '';

    setSchema(schema: string) {
        this.schemaName = schema;
    }

    private _jwtToken: string = null;

    public get jwtToken() {
        return this._jwtToken;
    };

    public set jwtToken(jwt: string) {
        this._jwtToken = jwt;
        this.service.jwtToken = this._jwtToken;
        this._userProfile = this.parseJwtPayload();
        this.userProfileSubject.next({ ...this._userProfile });
        this.storageService.putSessionVal("jwtToken", jwt);
    };

    private _userProfile: ConsoleUserList;

    public getUserProfileSubject() {
        return this.userProfileSubject.asObservable();
    }

    public userProfileSubject: BehaviorSubject<ConsoleUserList> = new BehaviorSubject<ConsoleUserList>(null);

    constructor(
        private service: ApiService,
        private storageService: StorageService) {
        let storageJwt = this.storageService.getSessionVal("jwtToken");

        if (storageJwt) {
            this.jwtToken = storageJwt;
        }
    }

    // SSO 登入：GET /api/ssoLogin?lightID=
    // response JWT PAYLOAD： ConsoleUserList with ConsoleGroup with ConsoleGroupScope
    singleSignOn(lightID: string): Observable<ResponseModel<string>> {
        return this.service.doGet(this.ssoLoginFunc, {
            lightID: lightID
        });
    }

    // 解析 patload 取得 userProfit
    private parseJwtPayload() {
        if (this._jwtToken) {
            var base64Url = this._jwtToken.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(JSON.parse(jsonPayload).sub);
        } else {
            return null;
        }
    }

    /**
     * 檢查是否有權限操作
     * @param schema 傳入設定在各xxx-routing.moudule.ts path的schema
     * @param action 操作權限(未傳入預設取是否有read)
    */
    public checkUserScope(schema?: string, action?: 'read' | 'create' | 'update' | 'delete' | string): boolean {
        action = !action ? 'read' : action;
        let features: { [key: string]: string[] } = {};
        let currentSchema = !schema ? this.schemaName : schema;
        this._userProfile.consoleGroup.consoleGroupScope.forEach((groupScope) => {
            let scope = groupScope.scope.split(".");
            if (!features[scope[0]]) { features[scope[0]] = [] };
            features[scope[0]].push(scope[1]);
        });
        // if(!features[currentSchema]){ console.warn('schemaName:', currentSchema, '無對應的權限設定')}
        return !features[currentSchema] ? false : features[currentSchema].includes(action);
    }
}
