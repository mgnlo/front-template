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
          {
            title: "Echarts圖表內容",
            link: "/pages/charts/echarts",
          },
        ]
      },
      {
        title: "儀表板",
        icon: "pie-chart-outline",
        link: "/pages/dashboard/center-room"
      },
      {
        title: "用戶管理",
        icon: "people-outline",
        children: [
          {
            title: "用戶列表",
            link: "/pages/customer-manage/customer-list",
          },
          {
            title: "客群活動名單",
            link: "/pages/customer-manage/activity-list",
          },
        ]
      },
      {
        title: "標籤管理",
        icon: "pricetags-outline",
        link: "/pages/tag-manage/tag-list"
      },
      {
        title: "審核管理",
        icon: "checkmark-square-outline",
        children: [
          {
            title: "標籤審核",
            link: "/pages/review-manage/tag-review-list",
          },
          {
            title: "客群名單審核",
            link: "/pages/review-manage/activity-review-list",
          },
          {
            title: "排程審核",
            link: "/pages/review-manage/schedule-review-list",
          },
        ]
      },
      {
        title: "排程管理",
        icon: "file-text-outline",
        children: [
          {
            title: "貼標排程",
            link: "/pages/schedule-manage/schedule-tag-detail",
          },
          {
            title: "名單排程",
            link: "/pages/schedule-manage/schedule-activity-list",
          },
        ]
      },
      {
        title: "帳號管理",
        icon: "lock-outline",
        children: [
          {
            title: "使用者管理",
            link: "/pages/account-manage/console-user",
          },
          {
            title: "權限管理",
            link: "/pages/account-manage/console-group-list",
          },
        ]
      },
    ];
  }
}
