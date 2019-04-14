import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class FormPosterService {
  constructor(private _http: HttpClient) {}
  submitEmployeeForm(apiUrl: string, model: any): Observable<any> {
    console.log('model submitted from component: ', model);
    return this._http
      .post(apiUrl, model)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getLanguages(): Observable<any> {
    return this._http
      .get('http://localhost:3100/get-languages')
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  FindTripsByDate(model: any): Observable<any> {
    console.log('model submitted from component: ', model);
    return this._http
      .post('http://localhost:33119/api/Trips/FindTrips', model)
      .map((res: Response) => {
        console.log(res);
        return res;
      })
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.fields || {};
  }

  private extractLanguages(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private extractTrips(res: Response) {
    let body = res.json();
    return body.Content || {};
  }
  private handleError(error: any) {
    console.error("post error", error);
    return Observable.throw(error);
  }
}
