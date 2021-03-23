import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  latitude = 51.230077585660105;
  longitude = 4.416849648098205;

  lat = 52.230077585660105;
  long = 4.416849648098205;

  gemiddeldeLat: number;
  gemiddeldeLong: number;

  constructor() { 
    this.gemiddeldeLat = (this.latitude + this.lat)/2;
    this.gemiddeldeLong = (this.longitude + this.long)/2;
  }

  ngOnInit() {
  }

}
