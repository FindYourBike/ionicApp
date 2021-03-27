import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @Input() user : IUserInfo
  constructor() { }

  ngOnInit() {
  }

}
