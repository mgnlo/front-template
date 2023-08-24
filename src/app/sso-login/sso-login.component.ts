import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@api/services/loading.service';
import { LoginService } from '@api/services/login.service';
import { RestStatus } from '@common/enums/rest-enum';
import { Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-init',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss'],
})
export class SSOLoginComponent implements OnInit, OnDestroy {
  initProcessMsg = "(模擬 SSO login 流程，待整合串接) 登入授權處理中，請稍候 ...";
  lightID: any = "123456789";
  userProfileSubscription: Subscription;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    // 自網址上取得 lightID 參數
    this.lightID = new URLSearchParams(window.location.search).get("lightID");
    // 目前測試用 lightID : 17071 ~ 170175
    this.lightID = "17071";
    // 發送電文請求 JWT Token 與 登入者 GroupScope，模擬成功導到 page 頁面
    // setTimeout 主要是用來 delay 一下方便 debug，正是可以拿掉
    this.loadingService.open();
    setTimeout(() => {
      this.loginService.singleSignOn(this.lightID).pipe(
        catchError((err) => {
          this.loadingService.close();
          throw new Error(err.message);
        }),
        tap(res => {
          console.info(res)
          this.loadingService.close();
        })).subscribe(res => {
          if (res.code === RestStatus.SUCCESS) {
            if (res.result) {
              this.loginService.jwtToken = res.result;
              this.userProfileSubscription = this.loginService.getUserProfileSubject().subscribe(userProfile => {
                if (userProfile) {
                  if (!userProfile.consoleGroup || !userProfile.consoleGroup.consoleGroupScope) {
                    this.initProcessMsg = "您尚未設定操作權限，請洽系統管理員 !!!";
                  } else {
                    this.router.navigate(["pages"]);
                  }
                }
              });
            } else {

            }
          }
        });
    }, 2000);

    // 模擬電文成功導轉到 Pages，底下這段在上面電文串接成功後要改寫
    // setTimeout(() => {
      // 存放 User 相關資訊， JWT Token user 的 ConsoleGroup 與 Scope
      // JWT payload with full scope
      // this.loginService.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVNjY5NzJiYTA1YzM0MTkwYTViZmQ1NzZkYWQxMDQ5MyIsImFjY291bnQiOiJhZG1pbjE5IiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB3ZWJjb21tLmNvbS50dyIsImJ1c2luZXNzVW5pdCI6IkNyZWRpdF9DYXJkcyIsImVuYWJsZSI6dHJ1ZSwibGFzdExvZ2luVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJjb25zb2xlR3JvdXAiOnsiZ3JvdXBJZCI6InV1aWQtMSIsImdyb3VwTmFtZSI6Iuezu-e1seeuoeeQhuWToSIsImRlc2NyaXB0aW9uIjoi57O757Wx566h55CG5ZOhIiwicHJpb3JpdHkiOjIsImVuYWJsZSI6dHJ1ZSwiY3JlYXRlVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJtb2RpZmljYXRpb25UaW1lIjoiMjAyMy0wNy0wMyAxNTozMDowMCIsImNvbnNvbGVHcm91cFNjb3BlIjpbeyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJkYXNoYm9hcmQucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiY3VzdG9tZXIucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiYWN0aXZpdHkucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiYWN0aXZpdHkuY3JlYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJhY3Rpdml0eS51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImFjdGl2aXR5LmRlbGV0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoidGFnLnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy5jcmVhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy5kZWxldGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InJldmlldy10YWcucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoicmV2aWV3LXRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InJldmlldy1hY3Rpdml0eS5yZWFkIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJyZXZpZXctYWN0aXZpdHkudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJyZXZpZXctc2NoZWR1bGUucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoicmV2aWV3LXNjaGVkdWxlLnVwZGF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoic2NoZWR1bGUtdGFnLnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLXRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLWFjdGl2aXR5LnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLWFjdGl2aXR5LmNyZWF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoic2NoZWR1bGUtYWN0aXZpdHkudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJzY2hlZHVsZS1hY3Rpdml0eS5kZWxldGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImNvbnNvbGUtdXNlci5yZWFkIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJjb25zb2xlLXVzZXIudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJjb25zb2xlLWdyb3VwLnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImNvbnNvbGUtZ3JvdXAuY3JlYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJjb25zb2xlLWdyb3VwLnVwZGF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiY29uc29sZS1ncm91cC5kZWxldGUifV19LCJpYXQiOjE2OTE3MzcxNTJ9.Zqb-guz9_F95C6bGYt9fKBy-vZxdspkZ_rLCA7ujL_k";

      // JWT payload 有 ConsoleGroup 沒有 ConsoleGroup scope (應該不會有這個 condition)
      // this.loginService.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVNjY5NzJiYTA1YzM0MTkwYTViZmQ1NzZkYWQxMDQ5MyIsImFjY291bnQiOiJhZG1pbjE5IiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB3ZWJjb21tLmNvbS50dyIsImJ1c2luZXNzVW5pdCI6IkNyZWRpdF9DYXJkcyIsImVuYWJsZSI6dHJ1ZSwibGFzdExvZ2luVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJjb25zb2xlR3JvdXAiOnsiZ3JvdXBJZCI6InV1aWQtMSIsImdyb3VwTmFtZSI6Iuezu-e1seeuoeeQhuWToSIsImRlc2NyaXB0aW9uIjoi57O757Wx566h55CG5ZOhIiwicHJpb3JpdHkiOjIsImVuYWJsZSI6dHJ1ZSwiY3JlYXRlVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJtb2RpZmljYXRpb25UaW1lIjoiMjAyMy0wNy0wMyAxNTozMDowMCIsImNvbnNvbGVHcm91cFNjb3BlIjpudWxsfSwiaWF0IjoxNjkxNjM4MTQ2fQ.E83HaJXud4eifvNCH818aSoGTkXuTQawFDRBWeEfUvo";

      // JWT payload 沒有 ConsoleGroup
      // this.loginService.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVNjY5NzJiYTA1YzM0MTkwYTViZmQ1NzZkYWQxMDQ5MyIsImFjY291bnQiOiJhZG1pbjE5IiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB3ZWJjb21tLmNvbS50dyIsImJ1c2luZXNzVW5pdCI6IkNyZWRpdF9DYXJkcyIsImVuYWJsZSI6dHJ1ZSwibGFzdExvZ2luVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJpYXQiOjE2OTE2NDgxMzN9.N4EhJ86MN-UJKUF7XgEapKNPbk2GP5x3fwf71OTRYfE";

      // JWT payload 沒有 consoleGroup.read 權限
      // this.loginService.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVNjY5NzJiYTA1YzM0MTkwYTViZmQ1NzZkYWQxMDQ5MyIsImFjY291bnQiOiJhZG1pbjE5IiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB3ZWJjb21tLmNvbS50dyIsImJ1c2luZXNzVW5pdCI6IkNyZWRpdF9DYXJkcyIsImVuYWJsZSI6dHJ1ZSwibGFzdExvZ2luVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJjb25zb2xlR3JvdXAiOnsiZ3JvdXBJZCI6InV1aWQtMSIsImdyb3VwTmFtZSI6Iuezu-e1seeuoeeQhuWToSIsImRlc2NyaXB0aW9uIjoi57O757Wx566h55CG5ZOhIiwicHJpb3JpdHkiOjIsImVuYWJsZSI6dHJ1ZSwiY3JlYXRlVGltZSI6IjIwMjMtMDctMDMgMTU6MzA6MDAiLCJtb2RpZmljYXRpb25UaW1lIjoiMjAyMy0wNy0wMyAxNTozMDowMCIsImNvbnNvbGVHcm91cFNjb3BlIjpbeyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJkYXNoYm9hcmQucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiY3VzdG9tZXIucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiYWN0aXZpdHkucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiYWN0aXZpdHkuY3JlYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJhY3Rpdml0eS51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImFjdGl2aXR5LmRlbGV0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoidGFnLnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy5jcmVhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InRhZy5kZWxldGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InJldmlldy10YWcucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoicmV2aWV3LXRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InJldmlldy1hY3Rpdml0eS5yZWFkIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJyZXZpZXctYWN0aXZpdHkudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJyZXZpZXctc2NoZWR1bGUucmVhZCJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoicmV2aWV3LXNjaGVkdWxlLnVwZGF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoic2NoZWR1bGUtdGFnLnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLXRhZy51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLWFjdGl2aXR5LnJlYWQifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6InNjaGVkdWxlLWFjdGl2aXR5LmNyZWF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoic2NoZWR1bGUtYWN0aXZpdHkudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJzY2hlZHVsZS1hY3Rpdml0eS5kZWxldGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImNvbnNvbGUtdXNlci5yZWFkIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJjb25zb2xlLXVzZXIudXBkYXRlIn0seyJncm91cElkIjoidXVpZC0xIiwic2NvcGUiOiJjb25zb2xlLWdyb3VwLmNyZWF0ZSJ9LHsiZ3JvdXBJZCI6InV1aWQtMSIsInNjb3BlIjoiY29uc29sZS1ncm91cC51cGRhdGUifSx7Imdyb3VwSWQiOiJ1dWlkLTEiLCJzY29wZSI6ImNvbnNvbGUtZ3JvdXAuZGVsZXRlIn1dfSwiaWF0IjoxNjkxNzQzMzIyfQ.1FnpXNhcdg0cubEGequy4cAciLqmz31r6m5PzW2GK4I";

      // this.userProfileSubscription = this.loginService.getUserProfileSubject().subscribe(userProfile => {
      //   if (userProfile) {
      //     if (!userProfile.consoleGroup || !userProfile.consoleGroup.consoleGroupScope) {
      //       this.initProcessMsg = "您尚未設定操作權限，請洽系統管理員 !!!";
      //     } else {
      //       this.router.navigate(["pages"]);
      //     }
      //   }
      // });
    // }, 1000);
  }

  public ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }
}



