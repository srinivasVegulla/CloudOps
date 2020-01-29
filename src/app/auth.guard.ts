import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  /* CanActivateChild,
  CanLoad, Route */
}                           from '@angular/router';
import { LoginService }      from './login/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  /* canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
 */
  /* canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  } */

  checkLogin(url: string): boolean {
    if (localStorage.getItem("isLoggedIn") == 'true') { 
      return true; 
    }


    // Store the attempted URL for redirecting
   
    localStorage.setItem("redirectUrl", `${url}`);

    // Navigate to the login page 
    this.router.navigate(['/login']);
    return false;
  }
}
