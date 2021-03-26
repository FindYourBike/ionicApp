import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, IBikeInfo } from '../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  @Input() BikeID: string;

  latitude: string;
  longitude: string;
  route: ActivatedRoute

  constructor(public service : APIService, route: ActivatedRoute) { 
    this.route = route;
  }

  ngOnInit() {
    this.BikeID = this.route.snapshot.paramMap.get('BikeID')
    this.service.GetBikeInfo(this.BikeID).subscribe(response => this.SetBikeInfo(response))
  }

  SetBikeInfo(info : IBikeInfo){
    this.latitude = info.lat;
    this.longitude = info.lon;
  }

}
