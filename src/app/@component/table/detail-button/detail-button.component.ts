import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'detail-button',
  template: '<button nbButton ghost status="info" size="medium" (click)="search()"><nb-icon icon="search"></nb-icon></button>'
})
export class DetailButtonComponent<T> implements OnInit {

  @Input() value: T;
  constructor(private router: Router) {}
  urlArr: string[] = [];
  ngOnInit(): void {
    // console.info(this.value);
    let routerUrl = this.router.url;
    let preUrl = routerUrl.substring(0, routerUrl.lastIndexOf('-'));
    let url = preUrl+'-detail';
    let directStrng = Object.keys(this.value).map(val => {
      switch (val) {
        case 'activityId':
        case 'historyId':
          return this.value[val];
        default:
          return null;
      }
    })[0];
    this.urlArr.push(url);
    if(!!directStrng){
      this.urlArr.push(directStrng);
    }
    // console.info(this.urlArr)
  }
  
  search() {
    let passData: NavigationExtras = { state: this.value };
    this.router.navigate(this.urlArr, passData);
  }

}