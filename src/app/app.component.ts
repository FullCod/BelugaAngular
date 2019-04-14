import { User } from './models/user';
import { AuthenticationService } from './_services/authentication.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authservie: AuthenticationService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authservie.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authservie.currentUser = user;
      this.authservie.changeMemberPhoto(user.photoUrl);
    }
  }
}
