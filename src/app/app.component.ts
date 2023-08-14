import { Component } from '@angular/core';

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
  
}
