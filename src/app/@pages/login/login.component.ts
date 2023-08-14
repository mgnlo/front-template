import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // 密碼欄位設定
  showPassword = false;

  ngOnInit(): void { }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  
  constructor(private router: Router) {}

  login() {
    this.router.navigate(["/pages/element"]);
  }

}
