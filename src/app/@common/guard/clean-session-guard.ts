import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '@api/services/storage.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class CleanSessionGuard implements CanActivateChild {

  constructor(private storage: StorageService, private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
        //  this.previousUrl = tmpUrl.substring(tmpUrl.lastIndexOf('/')+1, tmpUrl.length);
      });
  }

  previousUrl: string;
  keepSessionPathList: string[] = [];
  sessionKeyList: string[] = [];

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentPath = childRoute.routeConfig.path;
    const children = childRoute.routeConfig.children;
    const parentRoute = '/' + childRoute.pathFromRoot.filter(v => v.url.length > 0).filter((v, i) => i < 2)
      .map(v => v.url).map(segment => segment.toString()).join('/') + '/';
    if (currentPath == '' && !!children) {
      let keepSessionRouteList = children.filter(route => route.path.includes('-detail') || route.path.includes('-list'));
      this.sessionKeyList = children.filter(route => route.path.includes('-list')).map(route => route.path);
      this.keepSessionPathList = keepSessionRouteList.map(route => {
        return route.path.includes('/') ? parentRoute + route.path.split('/')[0] : parentRoute + route.path
      });
    }
    if (!!this.previousUrl && this.keepSessionPathList.some(path => this.previousUrl.includes(path))) {
      return true;
    }
    this.sessionKeyList.forEach(sessionKey => {
      this.storage.removeSessionVal(sessionKey);
    })
    return true;
  }
}