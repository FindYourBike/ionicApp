import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public service : AuthService) { 
    console.log("here")
  }

  ngOnInit() {
    this.service.signinUser("testingaccount", "&n76M!WD7Q")
  }

}
