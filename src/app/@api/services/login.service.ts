import { Injectable } from '@angular/core';
import { ConsoleUser } from '@api/models/console-user.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from '@api/models/base.model';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    readonly ssoLoginFunc = 'ssoLogin/';

    private _jwtToken: string = null;

    public get jwtToken() {
        return this._jwtToken;
    };

    public set jwtToken(jwt: string) {
        this._jwtToken = jwt;
        this.service.jwtToken = this._jwtToken;
        this._userProfile = this.parseJwtPayload();
        this.userProfileSubject.next(this._userProfile);
        this.storageService.putSessionVal("jwtToken", jwt);
    };

    private _userProfile: ConsoleUser;

    public getUserProfileSubject() {
        return this.userProfileSubject;
    }

    public userProfileSubject: BehaviorSubject<ConsoleUser> = new BehaviorSubject<ConsoleUser>(null);

    constructor(
        private service: ApiService,
        private storageService: StorageService) {
        let storageJwt = this.storageService.getSessionVal("jwtToken");

        if(storageJwt) {
          this.jwtToken = storageJwt;
        }
    }

    // SSO 登入：GET /api/ssoLogin?lightID=
    // response JWT PAYLOAD： ConsoleUser with ConsoleGroup with ConsoleGroupScope
    singleSignOn(lightID: string): Observable<ResponseModel<string>> {
        return this.service.doGet(this.ssoLoginFunc, {
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

            return JSON.parse(JSON.parse(jsonPayload).sub);
        } else {
            return null;
        }
    }

    public checkUserScope(scope: string) {
        let index = this._userProfile.consoleGroup.consoleGroupScope.findIndex(e => e.scope.startsWith(scope));

        return index >= 0 ? true : false;
    }
}
