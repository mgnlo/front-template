import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ConfigService } from '@api/services/config.service';
import { LoginService } from '@api/services/login.service';
import { StorageService } from '@api/services/storage.service';
import { ScopeList } from '@pages/pages.component';
import { Observable } from 'rxjs';

@Injectable()
export class CrudGuard implements CanActivate, CanActivateChild {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService,
    private configService: ConfigService,
  ) { }

  //檢查page
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.configService.getConfig().IS_MOCK && !this.storageService.getSessionVal("jwtToken")) {
      this.router.navigate(['']); //非mock環境 且 session裡沒Token 踢回登入頁
      return false;
    }
    return true;
  }

  //檢查所有page底下的child compoenent
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.configService.getConfig().IS_MOCK && !this.storageService.getSessionVal("jwtToken")) {
      this.router.navigate(['']); //非mock環境 且 session裡沒Token 踢回登入頁
      return false;
    }
    const currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;
    if (currentPath && !children) {
      let schemaName = currentPath.split('-').length < 3 ? currentPath.slice(0, currentPath.lastIndexOf('-')) : currentPath.split("-").slice(0, 2).join('-');
      let schema = Object.keys(ScopeList).find(scope => scope === schemaName);
      if (schema !== undefined) {
        this.loginService.setSchema(schemaName);
        if (currentPath.includes('set/:') || state.url.includes('/edit/')) {
          return this.loginService.checkUserScope(schemaName, 'update'); //編輯頁檢查update權限
        } else if (currentPath.includes('set') || state.url.includes('/copy/')) {
          return this.loginService.checkUserScope(schemaName, 'create'); //新增頁檢查create權限
        } else {
          return this.loginService.checkUserScope(schemaName, 'read'); //查詢頁檢查read權限
        }
      }
      throw new Error(`schemaName:${schemaName} 無對應的權限設定`);
    }
    return true;
  }
}