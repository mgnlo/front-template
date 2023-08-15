import { Component, OnInit } from '@angular/core';
import { ConsoleGroup, ConsoleGroupScope } from '@api/models/console-group.model';
import { LoginService } from '@api/services/login.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  basicMenu: NbMenuItem[] = [];

  constructor(private loginSerivce: LoginService) {    
  }

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
      }
    ];

    // 是否有儀表板權限
    if (this.loginSerivce.checkScope("dashboard.read")) {
      this.basicMenu.push({
        title: "儀表板",
        icon: "pie-chart-outline",
        link: "/pages/dashboard/center-room"
      });
    }

    // 是否有使用者列表、客群活動名單權限
    let hasCustomerRead = this.loginSerivce.checkScope("customer.read");
    let hasActivityRead = this.loginSerivce.checkScope("activity.read");

    if (hasCustomerRead || hasActivityRead) {
      let subMenuItrm = {
        title: "用戶管理",
        icon: "people-outline",
        children: []
      };

      if (hasCustomerRead) {
        subMenuItrm.children.push({
          title: "用戶列表",
          link: "/pages/customer-manage/customer-list",
        });
      }

      if (hasActivityRead) {
        subMenuItrm.children.push({
          title: "客群活動名單",
          link: "/pages/customer-manage/activity-list",
        });
      }

      this.basicMenu.push(subMenuItrm);
    }

    // 是否有標籤權限
    if (this.loginSerivce.checkScope("tag.read")) {
      this.basicMenu.push({
        title: "標籤管理",
        icon: "pricetags-outline",
        link: "/pages/tag-manage/tag-list"
      });
    }

    // 是否有使用者列表、客群活動名單權限
    let hasTagReview = this.loginSerivce.checkScope("review-tag.read");
    let hasActivityReview = this.loginSerivce.checkScope("review-activity.read");
    let hasScheduleReview = this.loginSerivce.checkScope("review-schedule.read");

    if (hasTagReview || hasActivityReview || hasScheduleReview) {
      let subMenuItrm = {
        title: "審核管理",
        icon: "people-outline",
        children: []
      };

      if (hasTagReview) {
        subMenuItrm.children.push({
          title: "標籤審核",
          link: "/pages/review-manage/tag-review-list",
        });
      }

      if (hasActivityReview) {
        subMenuItrm.children.push({
          title: "客群名單審核",
          link: "/pages/review-manage/activity-review-list",
        });
      }

      if (hasScheduleReview) {
        subMenuItrm.children.push({
          title: "名單排程審核",
          link: "/pages/review-manage/schedule-review-list",
        });
      }

      this.basicMenu.push(subMenuItrm);
    }

    // 是否有排程權限
    let hasScheduleTag = this.loginSerivce.checkScope("schedule-tag.read");
    let hasScheduleActivity = this.loginSerivce.checkScope("schedule-activity.read");

    if (hasScheduleTag || hasScheduleActivity) {
      let subMenuItrm = {
        title: "排程管理",
        icon: "file-text-outline",
        children: []
      };

      if (hasScheduleTag) {
        subMenuItrm.children.push({
          title: "貼標排程",
              link: "/pages/schedule-manage/schedule-tag-detail",
        });
      }

      if (hasScheduleActivity) {
        subMenuItrm.children.push({
          title: "名單排程",
              link: "/pages/schedule-manage/schedule-activity-list",
        });
      }

      this.basicMenu.push(subMenuItrm);
    }

    //是否有使用者管理、權限管理
    let hasConsoleUserRead = this.loginSerivce.checkScope("console-user.read");
    let hasConsoleGroupRead = this.loginSerivce.checkScope("console-group.read");

    if (hasConsoleUserRead || hasConsoleGroupRead) {
      let subMenuItrm = {
        title: "帳號管理",
        icon: "lock-outline",
        children: []
      };

      if (hasConsoleUserRead) {
        subMenuItrm.children.push({
          title: "使用者管理",
          link: "/pages/account-manage/console-user",
        });
      }

      if (hasConsoleGroupRead) {
        subMenuItrm.children.push({
          title: "權限管理",
          link: "/pages/account-manage/console-group-list",
        });
      }

      this.basicMenu.push(subMenuItrm);
    }
  }
}
