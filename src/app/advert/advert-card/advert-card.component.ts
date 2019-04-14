import { Trip } from './../../models/Trip';
import { Advert } from './../../models/advert';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './advert-card.component.html',
  styleUrls: ['./advert-card.component.css']
})
export class AdvertCardComponent implements OnInit {

  @Input() trip: Trip;

  constructor() { }

  ngOnInit() {
  }

}
