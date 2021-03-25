import { Component, OnInit } from '@angular/core';
import { APIService, IBikeInfo } from '../services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  // latitude = 51.230077585660105;
  // longitude = 4.416849648098205;

  latitude: string;
  longitude: string;


  //gemiddeldeLat: number;
  //gemiddeldeLong: number;

  constructor(public service : APIService) { 
    //this.gemiddeldeLat = (this.latitude + this.lat)/2;
    //this.gemiddeldeLong = (this.longitude + this.long)/2;

    this.service.GetBikeInfo().subscribe(response => this.SetBikeInfo(response))

  }

  ngOnInit() {
  }

  SetBikeInfo(info : IBikeInfo){
    console.log(info);
    this.latitude = info.latitude;
    this.longitude = info.lontitude;
  }

}
