
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

import { AppConfig } from "../app.config";
import { User } from "../models/user";
import { BaseService } from "./base.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/Pagination";

// const httpOptions = {
// headers: new HttpHeaders({
//   'Authorization' : 'Bearer ' + localStorage.getItem('token')
// })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService implements CanActivate {
  userLoggedIn = false;
  loggedInUser: string;
  authUser: any;
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private router: Router
  ) {
    super();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    return this.verifyUrl(url);
  }

  verifyUrl(url: string): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  getAll() {
    return this.http
      .get(this.baseUrl + 'account')
      .map((response: Response) => response.json());
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'account/' + id);
  }

  getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (params != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<User[]>(this.baseUrl + 'account/getusers',{observe:'response',params}).pipe(
      map(response =>{
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    );
  }

  getById(id: number) {
    return this.http
      .get(this.baseUrl + "account/" + id)
      .map((response: Response) => response);
  }

  create(user: User) {
    return this.http.post(this.baseUrl + "account/register", user);
  }

  update(id: number, user: User) {
    return this.http.put(this.baseUrl + "account/" + id, user);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "users/" + id);
  }

  facebookLogin(accessToken: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ accessToken });
    return this.http
      .post(this.config.apiUrl + "/externalauth/facebook", body)
      .map(res => {
        localStorage.setItem("auth_token", res.toString());
        //  this.loggedIn = true;
        //  this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  // updateProfilePicture(fileToUpdate: any) {
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   let headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   let options = new RequestOptions({ headers: headers });
  //   fileToUpdate.append("currentuser", currentUser);
  //   return this.http.post(
  //     this.config.apiUrl + "api/account/updateprofilepicture",
  //     fileToUpdate
  //   );
  // }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }
}
