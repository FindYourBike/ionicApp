import { Component, OnInit } from '@angular/core';
import { APIService, IReport } from '../services/api.service';
import { IUserInfo } from '../services/api.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.page.html',
  styleUrls: ['./daily-report.page.scss'],
})
export class DailyReportPage implements OnInit {
  public reports_day = [];
  reportsmap = new Map();
  loading : boolean;

  constructor(public service : APIService) { 
    this.loading = true;
  }

  ngOnInit() {
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }


  SetBikes(bikes : IUserInfo){
    if(bikes.bikes == undefined || bikes.bikes == null) {
      //this.loading = false
      return
    }
    var jsonbikes = JSON.parse(JSON.stringify(bikes.bikes))
    jsonbikes.forEach(element => {
      this.service.GetReports(element.bikeid).subscribe(response => {this.SetReports(response)}, error => {});
    })
  }

  SetReports(reports : IReport[]){
    reports.forEach(report => {
      if (this.reportsmap.has(report.time)) {
        var toAdd = this.reportsmap.get(report.time);
        toAdd.push(report)
        this.reportsmap.set(report.time,toAdd)
      } else {
        this.reportsmap.set(report.time,new Array(report))
      }
    });
    this.loading = false;
    this.reports_day = Array.from(this.reportsmap, ([name, value]) => ({ name, value }));
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.reports_day.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
