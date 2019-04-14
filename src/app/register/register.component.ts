import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { User } from './../models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {

  user: User;
  loading = false;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor( private router: Router,
     private userService: UserService,
      private alertService: AlertService,
       private fb:FormBuilder,
       private authService: AuthenticationService,
       private alertify:AlertifyService) {

   }

   ngOnInit(): void {
     this.bsConfig = {
       containerClass : 'theme-red',
       dateInputFormat: 'D/MM/YYYY'
     };
    // this.registerForm = new FormGroup({
    //     firstName: new FormControl('', Validators.required),
    //     lastName: new FormControl('', Validators.required),
    //     email: new FormControl('', Validators.required),
    //     userName: new FormControl(),
    //     password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //     confirmPassWord : new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
    this.createRegisterForm();
}

createRegisterForm() {
 this.registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['Male',Validators.required],
    dateOfBirth: [''],
    userName: [''],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    confirmPassWord : ['', Validators.required]
  }, { validator: this.passwordMatchValidator});
}
passwordMatchValidator(g:FormGroup){
  return g.get('password').value === g.get('confirmPassWord').value ? null : {'mismatch':true};
}
  register() {
if (this.registerForm.valid) {
this.user = Object.assign({}, this.registerForm.value);
this.userService.create(this.user).subscribe(()=>{
  this.alertify.success('Registration succeeded');
}, error => {
  this.alertify.error(error);
}, () => {
  this.authService.login(this.user).subscribe(()=>{
    this.router.navigate(['/member']);
  });
});

}

    // this.loading = true;
    // this.userService.create(this.model)
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Registration successful', true);
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.alertService.error(error._body);
    //             this.loading = false;
    //         });
    console.log(this.registerForm.value);
}
}
