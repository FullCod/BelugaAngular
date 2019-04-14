import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PaginatedResult } from '../_models/Pagination';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

   pageNumber = 1;
   pageSize = 5;
    constructor(
        private userService: UserService,
        private router: Router,
        private alertsrv: AlertService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
          catchError(error => {
            this.alertsrv.error('Failed to load members' + error);
            this.router.navigate(['/home']);
            return of(null);
          })
        );
      }
}
