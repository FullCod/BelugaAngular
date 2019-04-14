import { Trip } from './../models/Trip';
import { Injectable } from '@angular/core';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "../app.config";
import { BaseService } from "./base.service";
import { FormPosterService } from "./formPoster.service";
import { HttpClient } from '@angular/common/http';
import { Advert } from '../models/advert';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AdvertService extends BaseService {
  baseUrl = environment.apiUrl;
  constructor( private _http: HttpClient, private _formPosterSvc: FormPosterService) {
    super();
  }

  CreateAdvert(advert:Advert) {
    this._formPosterSvc
    .submitEmployeeForm(this.baseUrl + 'Trips/CreateAdvert', advert)
    .subscribe(
      data => console.log('data retrieved from server :', data),
      err => console.log('an error occured ', err)
    );
  }

  getAdvert(id):Observable<Trip> {
    return this._http.get<Trip>(this.baseUrl + 'Trips/' + id);
  }
}
