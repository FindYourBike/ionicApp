import { Component, Input, OnInit } from '@angular/core';
import { AuthService, IUserInfo } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  @Input() user: IUserInfo;


  constructor(public service : AuthService) { }

  ngOnInit() {
    this.user = this.service.getUserInfo()
  }

  logout(): void {
    this.service.logoutUser()
  }

}


