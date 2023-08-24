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
  loading = false;

  ngOnInit() {
    this.toggleLoadingAnimation();
  }

  toggleLoadingAnimation() {
    this.loading = true;
    // 2秒後消失
    setTimeout(() => this.loading = false, 2000);
  }
  

  constructor(
    private loginService: LoginService,
    private router: Router){
    if(!this.loginService.jwtToken){
      // 理論上這邊應該是要導頁到兆豐的登入頁面，不過開發初期，直接導到 SSO login 頁面
      this.router.navigate([""]);
    }
  }
}
