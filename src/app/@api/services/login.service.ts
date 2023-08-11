import { Injectable } from '@angular/core';
import { ConsoleUser } from '@api/models/console-user.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from '@api/models/base.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    readonly consoleUserFunc = 'console-user/';

    private _jwtToken: string = null;

    public get jwtToken() {
        return this._jwtToken;
    };

    public set jwtToken(jwt: string) {
        this._jwtToken = jwt;
        this.service.jwtToken = this._jwtToken;
        this._userProfile = this.parseJwtPayload();
        this.storageService.putLocalVal("jwtToken", jwt);
    };

    private _userProfile: ConsoleUser;

    public get userProfile() {
        return this._userProfile;
    }

    constructor(
        private service: ApiService,
        private storageService: StorageService) {
        this.jwtToken = this.storageService.getLocalVal("jwtToken");
    }

    // SSO 登入：GET /api/ssoLogin?lightID=
    // response JWT PAYLOAD： ConsoleUser with ConsoleGroup with ConsoleGroupScope
    singleSignOn(lightID: string): Observable<ResponseModel<string>> {
        return this.service.doGet(this.consoleUserFunc, {
            lightID: lightID
        });
    }

    // 解析 patload 取得 userProfit
    private parseJwtPayload() {
        if(this._jwtToken){
            var base64Url = this._jwtToken.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } else {
            return null;
        }
    }

    public checkMenuScope(scope: string) {
        let index = this._userProfile.consoleGroup.consoleGroupScope.findIndex(e => e.scope.startsWith(scope));

        return index >= 0 ? true : false;
    }
}
