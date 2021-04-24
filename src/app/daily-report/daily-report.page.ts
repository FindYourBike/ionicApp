import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.page.html',
  styleUrls: ['./daily-report.page.scss'],
})
export class DailyReportPage implements OnInit {
  public items: any = [];
  public reports_day = [];

  constructor() { 
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];

    this.reports_day = [
      {date: "24/5/2021", expanded: false},
      {date: "4/5/2021", expanded: false},
      {date: "8/5/2020", expanded: false},
      {date: "6/5/2021", expanded: false},
      {date: "16/5/2020", expanded: false},
    ]
  }

  ngOnInit() {
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
