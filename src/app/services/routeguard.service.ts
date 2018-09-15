import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.getCookie('logintime') == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  getCookie(name): any {
    let cookies = document.cookie;
    let cookieArray = cookies.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
      var arr = cookieArray[i].split("=");
      if (arr[0] == name) {
        return arr[1];
      }
    }
    return null;
  }

}
