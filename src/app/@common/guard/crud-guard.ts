import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '@api/services/login.service';
import { ScopeList } from '@pages/pages.component';
import { Observable } from 'rxjs';

@Injectable()
export class CrudGuard implements CanActivateChild {

  constructor(private loginService: LoginService) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;
    const parentRoute = '/' + childRoute.pathFromRoot.filter(v => v.url.length > 0).filter((v, i) => i < 2)
      .map(v => v.url).map(segment => segment.toString()).join('/') + '/';
    if (currentPath && !children) {
      let schemaName = currentPath.slice(0, currentPath.lastIndexOf('-'));
      let schema = Object.entries(ScopeList).find(([k, v]) => k === schemaName);
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
    }
    return true;
  }
}