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
          if (response.time == undefined || response.time == null)
            this.AddErrorCard(response, element.bikename)
          else
            this.AddBikeCard(response, element.bikename)

          this.sortBikes();
          this.loading = false;
          console.log(response)
        } else {
          console.log("here")
        }
      }, error => {
        console.log(error)
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
  }

  AddErrorCard(bike : IBikePing, bikename : string) {
    var newcard : ICard = {
      id: bike.id,
      name: bikename,
      type: "B",
      time: 0
    }
    this.bikes.push(newcard);
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
  lat: string;
  bat: number;
}

export interface ICard {
  id: string;
  name : string;
  type: string;
  time: number;
}
