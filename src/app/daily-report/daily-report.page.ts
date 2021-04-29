import { Component, OnInit } from '@angular/core';
import { receiveMessageOnPort } from 'node:worker_threads';
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
    this.refresh()
  }


  SetBikes(bikes : IUserInfo){
    console.log(bikes)
    if(bikes.bikes == undefined || bikes.bikes == null) {
      this.loading = false
      return
    }
    var jsonbikes = JSON.parse(JSON.stringify(bikes.bikes))
    jsonbikes.forEach(element => {
      this.service.GetReports(element.bikeid).subscribe(response => {this.SetReports(response,element.bikename)}, error => {});
    })
  }

  SetReports(reports : IReport[], bikename: string){
    console.log(reports)
    reports.forEach(report => {
      report.bikename = bikename;
      if (this.reportsmap.has(report.time)) {
        var [toAdd, toAddDistance] = this.reportsmap.get(report.time);
        toAddDistance += report.distance
        toAdd.push(report)
        this.reportsmap.set(report.time,[toAdd, toAddDistance])
      } else {
        this.reportsmap.set(report.time,[new Array(report),report.distance])
      }
    });
    this.reports_day = Array.from(this.reportsmap, ([name, value]) => ({ name, value }));
    this.sortReports()
    console.log(this.reports_day)
    this.loading = false;
  }

  refresh(): void{
    this.loading = true;
    this.reports_day = new Array()
    this.service.GetBikes().subscribe(response => this.SetBikes(response))
  }

  sortReports() {
    this.reports_day.sort(function(a, b) {
      return b.name - a.name;
    });
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
