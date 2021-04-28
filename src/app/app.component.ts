import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // time1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0, 0, 0 );
  // time2 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 21, 0, 0, 0 );

  constructor(private localNotifications: LocalNotifications) {
    this.localNotifications.schedule
    ([
      {
        id: 1,
        title: 'Good morning',
        text: 'Your bike is ready to go, try to reach your goals!',
        trigger: {every: {hour: 8, minute: 0}}
      },
      {
        id: 2,
        title: 'Good evening',
        text: 'Great day of biking, check out your daily report now!',
        trigger: {every: {hour: 21, minute: 0}}
      }
    ]);
  }

}
