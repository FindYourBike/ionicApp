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
  loading: boolean;

  constructor(public service : APIService) { 
    this.bikes = new Array();
  }

  ngOnInit() {
    this.loading = true;
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }

  SetBikes(bikes : IBikes){
    bikes.bikes.forEach(element => {
      this.service.GetBikeInfo(element).subscribe(response => this.AddBike(response))
    });
    this.loading = false;
  }

  AddBike(bike : IBikeInfo){
    let now = new Date()
    bike.time = Math.trunc((now.getTime() - bike.time) / 1000 / 60)
    this.bikes.push(bike)
  }
}
