import { Component, OnInit } from '@angular/core';
import { APIService, IBikePing, IUserInfo } from '../services/api.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.page.html',
  styleUrls: ['./bikes.page.scss'],
})

export class BikesPage implements OnInit {

  bikes : ICard[];
  loading : boolean;

  constructor(public service : APIService) { 
    this.bikes = new Array();
  }

  ngOnInit() {
    this.refresh()
  }

  SetBikes(bikes : IUserInfo){
    if(bikes.bikes == undefined || bikes.bikes == null) {
      this.loading = false
      return
    }
    var jsonbikes = JSON.parse(JSON.stringify(bikes.bikes))
    jsonbikes.forEach(element => {
      this.service.GetBikePing(element.bikeid).subscribe(response => {
        if(response != undefined && response != null) {
          this.AddBikeCard(response, element.bikename)
          console.log(response)
        } else {
          console.log("here")
        }
      }, error => {
        console.log(error)
        this.AddErrorCard(element.bikename)
      });
    })
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
      bat: bike.bat,
      type: "A"
    }
    this.bikes.push(newbike);
    this.sortBikes();
    this.loading = false;
  }

  AddErrorCard(bikename : string) {
    var newcard : ICard = {
      name: bikename,
      type: "B",
      time: 0
    }
    this.bikes.push(newcard);
    this.sortBikes();
    this.loading = false;
  }

  refresh(): void{
    this.loading = true;
    this.bikes = new Array()
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }

  instanceOfIBikeCard(object: any): object is IBikeCard {
    return 'bat' in object;
  }

  sortBikes() {
    this.bikes.sort(function(a, b) {
      if (a.time === 0)
        return 1;
      if (b.time === 0)
        return -1;
      return a.time - b.time;
    });
  }
}

interface IBikeCard extends ICard {
  lon: string;
  id: string;
  lat: string;
  bat: number;
}

export interface ICard {
  name : string;
  type: string;
  time: number;
}
