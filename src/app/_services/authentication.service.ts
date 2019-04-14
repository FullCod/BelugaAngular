import { User } from './../models/user';
import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import {  HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppConfig } from '../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/team/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private config: AppConfig) {}

  changeMemberPhoto(photoUrl: string) {
      this.photoUrl.next(photoUrl);
  }
  login(user: User) {
    return this.http
      .post(this.config.apiUrl + 'api/account/authenticate', user)
      .pipe(
        map((response: any) => {
          const createduser = response;
          if (createduser) {
            localStorage.setItem('token', createduser.token);
            localStorage.setItem('user', JSON.stringify(createduser.user));
            this.decodedToken = this.jwtHelper.decodeToken(createduser.token);
            this.currentUser = createduser.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
           // const expirationDate = this.jwtHelper.getTokenExpirationDate(user.token);
          }
        })
      );
  }

  facebooklogin() {
    return this.http
      .get(this.config.apiUrl + 'api/Account/FacebookLogin')
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser  =null;
  }

  loadprofilePicture() {}

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: "text/csv" });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
