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
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;
    if (currentPath && !children) {
      let schema = Object.entries(ScopeList).find(([k, v]) => v.menu.link === state.url);
      if(schema !== undefined) {
        let schemaName = schema[0];
        this.loginService.setSchema(schemaName);
        return this.loginService.checkUserScope(schemaName);
      }
    }
    return true;
  }
}