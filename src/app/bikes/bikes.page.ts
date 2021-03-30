import { Component, OnInit } from '@angular/core';
import { APIService, IBikeInfo, IBikes } from '../services/api.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.page.html',
  styleUrls: ['./bikes.page.scss'],
})
export class BikesPage implements OnInit {

  bikes : IBikeInfo[];

  constructor(public service : APIService) { 
    this.bikes = new Array();
  }

  ngOnInit() {
    this.refresh()
  }

  SetBikes(bikes : IBikes){
    bikes.bikes.forEach(element => {
      this.service.GetBikeInfo(element).subscribe(response => this.AddBike(response))
    });
  }

  AddBike(bike : IBikeInfo){
    let now = new Date()
    bike.time = (now.getTime() - bike.time) / 1000
    console.log(bike.bat)
    //bike.battery = Math.trunc(Math.random() * 100)
    this.bikes.push(bike)
  }

  refresh(): void{
    this.bikes = new Array()
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }
}
