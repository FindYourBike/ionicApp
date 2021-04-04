import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, IBikePing } from '../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  @Input() BikeID: string;

  latitude: Number;
  longitude: Number;
  route: ActivatedRoute

  constructor(public service : APIService, route: ActivatedRoute) { 
    this.route = route;
  }

  ngOnInit() {
    this.BikeID = this.route.snapshot.paramMap.get('BikeID')
    this.service.GetBikePing(this.BikeID).subscribe(response => this.SetBikeInfo(response))
  }

  SetBikeInfo(info : IBikePing){
    this.latitude = Number(info.lat);
    this.longitude = Number(info.lon);
  }

}
