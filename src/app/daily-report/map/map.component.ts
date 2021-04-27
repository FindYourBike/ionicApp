import { isSyntheticPropertyOrListener } from '@angular/compiler/src/render3/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
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

  public bikename: string;
  public date: number;

  latitude: Number;
  longitude: Number;
  route: ActivatedRoute
  state$: Observable<object>;

  constructor(public service : APIService, route: ActivatedRoute) { 
    this.route = route;

    this.lines = []
  } 

  ngOnInit() {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state))
    this.state$.subscribe(report => {this.SetReport(report)})
    this.latitude = 0
    this.longitude = 0
    //this.BikeID = this.route.snapshot.paramMap.get('BikeID')
    //this.service.GetBikePing(this.BikeID).subscribe(response => this.SetBikeInfo(response))
  }

  SetReport(report){
    console.log(report)
    this.date = report.time
    var previouselement;
    report.nodes.forEach(element => {
      console.log(element)
      if (previouselement != undefined && previouselement != null) {
        var a: INode = {latitude: Number(previouselement.latitude), longitude: Number(previouselement.longitude)}
        var b: INode = {latitude: Number(element.latitude), longitude: Number(element.longitude)}
        var $ = new Array(a, b)
        this.lines.push({nodes: $, color: this.colors[1]})
      }
      previouselement = element;
    });
    //this.latitude = Number(info.lat);
    //this.longitude = Number(info.lon);
  }
}

interface INode {
  latitude: number;
  longitude: number;
}

interface ILine {
  nodes: INode[]
  color: string;
}
