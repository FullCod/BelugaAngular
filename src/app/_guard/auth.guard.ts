import { AlertifyService } from './../_services/alertify.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private _authService: AuthenticationService, private _router:Router, private _alertify:AlertifyService) {

}
  canActivate():  boolean {
    if ( this._authService.loggedIn()) {
      return true;
    }
    this._alertify.error('You shall not pass');
    this._router.navigate(['/login']);
    return false;
  }
}
