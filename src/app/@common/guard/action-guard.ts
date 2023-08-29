import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { LoginService } from '@api/services/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class ActionGuard implements CanActivateChild {

  constructor(private loginService: LoginService) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;

    if (currentPath == '' && !!children) {
      currentPath = children.find(child => child.path === currentPath).redirectTo;
      let schema = children.find(route => route.path === currentPath).data.schema;
      this.loginService.setSchema(schema);
      return this.loginService.checkUserScope(schema, 'read');
    }

    return true;

  }
}