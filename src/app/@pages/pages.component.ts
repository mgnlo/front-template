import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  basicMenu: NbMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu() {
    this.basicMenu = [
      // {
      //   title: '元件庫',
      //   icon: 'layout-outline',
      //   link: '/pages/element',
      //   home: true,
      // },
      {
        title: "元件庫",
        icon: "color-palette-outline",
        children: [
          {
            title: "基本元件",
            link: "/pages/element",
          },
          {
            title: "表單元件",
            link: "/pages/element2",
          },
        ]
      },
    ];
  }
}
