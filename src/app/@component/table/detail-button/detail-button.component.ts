import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'detail-button',
  template: '<div class="btnCol"><button nbButton ghost status="info" size="large" (click)="search()"><nb-icon icon="search"></nb-icon></button></div>'
})
export class DetailButtonComponent<T> implements OnInit {

  @Input() value: T;
  constructor(private router: Router) { }
  urlArr: string[] = [];
  ngOnInit(): void {
    // console.info(this.value);
    let routerUrl = this.router.url;
    let preUrl = routerUrl.substring(0, routerUrl.lastIndexOf('-'));
    let url = preUrl + '-detail';
    let directString = Object.keys(this.value).map(val => {
      switch (val) {
        case 'activityId':
        case 'historyId':
        case 'scheduleId':
        case 'tagId':
        case 'groupId':
          return this.value[val];
        default:
          return null;
      }
    })[0];
    this.urlArr.push(url);
    if (!!directString) {
      this.urlArr.push(directString);
    }
    // console.info(this.urlArr)
  }

  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(this.urlArr, passData);
  }

}
