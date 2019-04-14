import { Trip } from "./../../models/Trip";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "./../../_services/alert.service";
import { AdvertService } from "./../../_services/advert.service";
import { Advert } from "./../../models/advert";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ["./advert-detail.component.css"]
})
export class AdvertDetailComponent implements OnInit {
  trip: Trip;

  constructor(
    private _advertService: AdvertService,
    private _alertservice: AlertService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAdvert();
  }
  loadAdvert() 
  {
    this._advertService.getAdvert(+this._route.snapshot.params['id']).subscribe(
      (advert: Trip) => {
        this.trip = advert;
      },
      error => {
        this._alertservice.error(error);
      }
    );
  }
}
