import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@api/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Console-Frontend';

  constructor(
    private loginService: LoginService,
    private router: Router){
    if(!this.loginService.jwtToken){
      // 理論上這邊應該是要導頁到兆豐的登入頁面，不過開發初期，直接導到 SSO login 頁面
      this.router.navigate([""]);
    }
  }
}
