import { AuthenticationService } from "./../_services/authentication.service";
import { AlertService } from "./../_services/alert.service";
import { catchError } from "rxjs/operators";
import { UserService } from "./../_services/user.service";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { User } from "../models/user";
import { of, Observable } from "rxjs";

@Injectable()
export class MemberResolver implements Resolve<User> {
  /**
   *
   */
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private alertsrv: AlertService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertsrv.error('Failed to load your data' + error);
        this.router.navigate(['/member']);
        return of(null);
      })
    );
  }
}
