import {Injectable, Injector} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  router = this.injector.get(Router);
  authService = this.injector.get(AuthService);

  constructor(protected injector: Injector) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.validation();
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.validation();
    return true;
  }


  validation() {
    this.authService.isLoggedIn()
      .then((value) => {
        if (!value) {
          this.router.navigate(['']);
        }
        return !!value;
      });

  }
}
