import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }

  SetBikes(bikes : IBikes){
    console.log(bikes);
    bikes.bikes.forEach(element => {
      this.service.GetBikeInfo(element).subscribe(response => this.AddBike(response))
    });
  }

  AddBike(bike : IBikeInfo){
    let now = new Date()
    console.log(bike.time)
    bike.time = Math.trunc((now.getTime() - bike.time) / 1000 / 60)
    console.log(bike.time)
    this.bikes.push(bike)
  }
}
