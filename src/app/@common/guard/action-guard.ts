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
    const currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;
    if(!!currentPath && !children){
      let schema = childRoute.routeConfig.data?.schema;
      this.loginService.setSchema(schema);
      return this.loginService.checkUserScope(schema, 'read');
    }

    return true;

  }
}