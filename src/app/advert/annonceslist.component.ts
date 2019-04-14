import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormPosterService } from '../_services/formPoster.service';
import { NgForm } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'app-annonceslist',
  templateUrl: './annonceslist.component.html',
  styleUrls: ['./annonceslist.component.css']
})
export class AnnonceslistComponent implements OnInit {
  bsValue = new Date();
  colorTheme = 'theme-dark-blue';
  departcity: string;
  arriveecity: string;
  firstname: string;
  model: any = {};
  Trips: any = {};

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private _formPosterSvc: FormPosterService,private alertService:AlertService) {
   
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, });
  }

  displayLanguage() {
  }

  ValidateLanguage(value) {
    console.log('lang: ' + this.model.primaryLanguage);
    if (value === 'default') {
    } else {
    }
  }

  SubmitEmployee(form: NgForm) {
    console.log('submitting form', form.value);

    this.ValidateLanguage(this.model.primaryLanguage);

    this._formPosterSvc
      .submitEmployeeForm('', this.model)
      .subscribe(
        data => console.log('data retrieved from server :', data),
        err => console.log('an error occured ', err)
      );
  }

  FindTripsByDate(form: NgForm) {
    console.log(this.model.dateDepart);
    console.log('submitting form', form.value);
    this._formPosterSvc.FindTripsByDate(this.model).subscribe(
      data => {
        console.log('data retrieved from server :', data);
        this.Trips = data;
        console.log(this.Trips);
      },
      err =>{
        this.alertService.error(err);
        console.log('an error occured', err);
      } 
    );
  }
}
