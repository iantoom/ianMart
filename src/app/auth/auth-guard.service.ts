import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IAuthStatus, AuthService } from './auth.service';
import { UiServiceService } from '../common/ui-service.service';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  protected currentAuthStatus: IAuthStatus;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    private uiService: UiServiceService,
  ) {
    this.authService.authStatus.subscribe(authStatus => this.currentAuthStatus = authStatus);
   }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute);
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params: any;

    if (route) {
      const expectedRole = route.data.expectedRole;

      if (expectedRole) {
        roleMatch = this.currentAuthStatus.userRole === expectedRole;
      }

      if (roleMatch) {
        params = {redirectUrl: route.pathFromRoot.map(r => r.url).join('/')};
      }
    }

    if (!this.currentAuthStatus.isAuthenticated || !roleMatch) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);

      this.router.navigate(['login'], params || {});
      return false;
    }

    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must Login to continue');
    }

    if (!roleMatch) {
      this.uiService.showToast('you do not have permissions to view this source');
    }
  }
}
