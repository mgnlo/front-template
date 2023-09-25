import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { RestStatus } from '@common/enums/rest-enum';
import { UserProfileMock } from '@common/mock-data/user-profile-mock';
import { catchError, filter } from 'rxjs/operators';

@Component({
  selector: 'app-init',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss'],
})
export class SSOLoginComponent implements OnInit {
  initProcessMsg = "(模擬 SSO login 流程，待整合串接) 登入授權處理中，請稍候...";
  lightID: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // 自網址上取得 lightID 參數
    this.lightID = this.route.snapshot.queryParamMap.get('lightID');

    // 目前測試用 lightID : 17071 ~ 17075
    // this.lightID = "17071";
    if (this.configService.getConfig().IS_MOCK) {
      this.router.navigate(["pages"]);
      this.loginService.userProfileSubject.next(UserProfileMock);
      return;
    }
    // 發送電文請求 JWT Token 與 登入者 GroupScope，模擬成功導到 page 頁面
    this.loginService.singleSignOn(this.lightID).pipe(
      catchError(err => {
        this.initProcessMsg = "無效的lightID:" + this.lightID + "，請重新登入";
        throw new Error(err.message);
      }),
      filter(res => res.code === RestStatus.SUCCESS)
    ).subscribe(res => {
      this.loginService.jwtToken = res.result;
      this.loginService.getUserProfileSubject().subscribe(userProfile => {
        if (!userProfile.consoleGroup || !userProfile.consoleGroup.consoleGroupScope) {
          this.initProcessMsg = "您尚未設定操作權限，請洽系統管理員 !!!";
        } else {
          console.info(userProfile.consoleGroup)
          console.info(userProfile.consoleGroup.consoleGroupScope)
          this.router.navigate(["pages"]);
        }
      });
    });
  }
}



