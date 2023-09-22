import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { LoginService } from '@api/services/login.service';
import { NbMenuItem } from '@nebular/theme';

export const ParentMenu: { [parentMenu: string]: NbMenuItem } = {
  'customer-manage': { title: "用戶管理", icon: "people-outline", children: [] },
  'review-manage': { title: "審核管理", icon: "checkmark-square-outline", children: [] },
  'schedule-manage': { title: "排程管理", icon: "file-text-outline", children: [] },
  'account-manage': { title: "帳號管理", icon: "lock-outline", children: [] }
};

/**
 * 頁面權限
 * @SchemaName 功能名稱
 * @param crud 頁面可使用的動作(CRUD)
 * @param menu nbMenuItem (產menu用)
 * @param parentMenu 對應ParentMenu
*/
export const ScopeList: { [schemaName: string]: { crud: string[], menu: NbMenuItem, parentMenu?: string } } = {
  'dashboard': { crud: ['read'], menu: { title: "儀表板", icon: "pie-chart-outline", link: "/pages/dashboard/dashboard-room" } },
  'customer': { crud: ['read'], menu: { title: "用戶列表", link: "/pages/customer-manage/customer-list" }, parentMenu: 'customer-manage' },
  'activity': { crud: ['read', 'create', 'update', 'delete'], menu: { title: "客群活動名單", link: "/pages/customer-manage/activity-list" }, parentMenu: 'customer-manage' },
  'tag': { crud: ['read', 'create', 'update', 'delete'], menu: { title: "標籤管理", icon: "pricetags-outline", link: "/pages/tag-manage/tag-list" } },
  'review-tag': { crud: ['read', 'update'], menu: { title: "標籤審核", link: "/pages/review-manage/review-tag-list" }, parentMenu: 'review-manage' },
  'review-activity': { crud: ['read', 'update'], menu: { title: "客群名單審核", link: "/pages/review-manage/review-activity-list" }, parentMenu: 'review-manage' },
  'review-schedule': { crud: ['read', 'update'], menu: { title: "名單排程審核", link: "/pages/review-manage/review-schedule-list" }, parentMenu: 'review-manage' },
  'schedule-tag': { crud: ['read', 'update'], menu: { title: "貼標排程", link: "/pages/schedule-manage/schedule-tag-list" }, parentMenu: 'schedule-manage' },
  'schedule-activity': { crud: ['read', 'create', 'update', 'delete'], menu: { title: "名單排程", link: "/pages/schedule-manage/schedule-activity-list" }, parentMenu: 'schedule-manage' },
  'console-user': { crud: ['read', 'update'], menu: { title: "使用者管理", link: "/pages/account-manage/console-user-list" }, parentMenu: 'account-manage' },
  'console-group': { crud: ['read', 'create', 'update', 'delete'], menu: { title: "權限管理", link: "/pages/account-manage/console-group-list" }, parentMenu: 'account-manage' }
};

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  basicMenu: NbMenuItem[] = [];

  constructor(private loginSerivce: LoginService, private router: Router) { }

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu() {
    this.basicMenu = [
      { title: '登入畫面', icon: 'log-in-outline', link: '/login', home: true },
      {
        title: "元件庫", icon: "color-palette-outline",
        children: [
          { title: "基本元件", link: "/pages/element" },
          { title: "表單元件", link: "/pages/element2" },
          { title: "表格", link: "/pages/table" },
          { title: "Echarts圖表內容", link: "/pages/charts/echarts" }
        ]
      }
    ];

    for (const [key, val] of Object.entries(ScopeList)) {
      if (!this.loginSerivce.checkUserScope(key)) { continue; } //沒read權限就不塞進menu
      if (!val.parentMenu) {
        this.basicMenu.push(val.menu);
      } else {
        let parentMenu = this.basicMenu.find(menu => menu.title === ParentMenu[val.parentMenu].title);
        if (!parentMenu) {
          ParentMenu[val.parentMenu].children.push(val.menu);
          this.basicMenu.push(ParentMenu[val.parentMenu]);
        } else {
          parentMenu.children.push(val.menu);
        }
      }
    }
  }
}
