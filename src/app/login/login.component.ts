import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password1:string;
  model: any = {};
  loading = false;
  returnUrl: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService, private alertify: AlertifyService) { }

  ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
  //  this.alertify.message('les information de connection sont :' + this.model.username + ' ' + this.model.password);
    this.authenticationService.login(this.model)
        .subscribe(
            data => {
                this.router.navigate(['home']);
                this.alertService.success('logged in succesfully');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
       }

}
