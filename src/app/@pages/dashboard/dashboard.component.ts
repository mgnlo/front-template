import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  template: '<router-outlet></router-outlet>',
})
export class DashboardComponent implements OnDestroy, OnInit {

  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
