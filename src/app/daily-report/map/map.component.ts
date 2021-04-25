import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, IBikePing } from 'src/app/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {
  
  @Input() BikeID: string;
  @Input() Date: string;

  public lines: ILine[];

  colors = {
    1: "#2E7F18",
    2: "#45731E",
    3: "#675E24",
    4: "#8D472B",
    5: "#B13433",
    6: "#C82538",
  }

  latitude: Number;
  longitude: Number;
  route: ActivatedRoute

  constructor(public service : APIService, route: ActivatedRoute) { 
    this.route = route;

    this.lines = [
      {nodes: [{lat: 10, lon: 20},{lat: 20, lon: 10}], color: this.colors[1]},
      {nodes: [{lat: 20, lon: 10},{lat: 50, lon: 60}], color: this.colors[5]},
      {nodes: [{lat: 50, lon: 60},{lat: 45, lon: 32}], color: this.colors[3]},
    ]
  }

  ngOnInit() {
    this.latitude = 0
    this.longitude = 0
    //this.BikeID = this.route.snapshot.paramMap.get('BikeID')
    //this.service.GetBikePing(this.BikeID).subscribe(response => this.SetBikeInfo(response))
  }

  SetBikeInfo(info : IBikePing){
    this.latitude = Number(info.lat);
    this.longitude = Number(info.lon);
  }
}

interface INode {
  lat: number;
  lon: number;
}

interface ILine {
  nodes: INode[]
  color: string;
}
