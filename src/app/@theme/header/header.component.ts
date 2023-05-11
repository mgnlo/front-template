import { Component, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { LayoutService } from '@theme/layout/layout.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActive = true;

  private destroy$: Subject<void> = new Subject<void>();
  public userPictureOnly: boolean = false;
  public header: any = {
    title: 'Console Frontend',
  };
  public user: any = {
    account: 'administrator',
    firstName: 'Admin',
    lastName: '',
    fullName: 'Admin',
    title: '管理員',
    picture: null,
  };
  public userMenu = [{ title: 'Profile' }, { title: 'Logout' }];
  public notifyRecords: any[] = [];

  public currentTheme = 'default';
  public themes = [
    { name: 'Light', value: 'default' },
    { name: 'Dark', value: 'dark' },
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' },
  ];

  constructor(
    private menuService: NbMenuService,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService
  ) {}

  public ngOnInit(): void {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        // map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl && false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.currentTheme = this.themeService.currentTheme;
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  public changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.isActive = !this.isActive;
    return false;
  }

  public navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
