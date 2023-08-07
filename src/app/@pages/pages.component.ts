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
      {
        title: '登入畫面',
        icon: 'log-in-outline',
        link: '/login',
        home: true,
      },
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
          {
            title: "表格",
            link: "/pages/table",
          },
          {
            title: "Echarts圖表內容",
            link: "/pages/charts/echarts",
          },
        ]
      },
    ];
  }
}
