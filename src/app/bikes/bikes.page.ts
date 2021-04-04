import { Component, OnInit } from '@angular/core';
import { APIService, IBikePing, IUserInfo } from '../services/api.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.page.html',
  styleUrls: ['./bikes.page.scss'],
})
export class BikesPage implements OnInit {

  bikes : IBikeCard[];

  constructor(public service : APIService) { 
    this.bikes = new Array();
  }

  ngOnInit() {
    this.refresh()
  }

  SetBikes(bikes : IUserInfo){
    var jsonbikes = JSON.parse(JSON.stringify(bikes.bikes))
    jsonbikes.forEach(element => {
      this.service.GetBikePing(element.bikeid).subscribe(response => this.AddBikeCard(response, element.bikename))
    });
  }

  AddBikeCard(bike : IBikePing, bikename : string){
    let now = new Date()
    bike.time = (now.getTime() - bike.time) / 1000
    var newbike : IBikeCard = {
      id: bike.id,
      lat: bike.lat,
      lon: bike.lon,
      time: bike.time,
      name: bikename,
      bat: bike.bat
    }
    this.bikes.push(newbike)
  }

  refresh(): void{
    this.bikes = new Array()
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }
}

export interface IBikeCard {
  lon: string;
  id: string;
  lat: string;
  time: number;
  bat: number;
  name: string;
}
