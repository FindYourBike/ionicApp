import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    login: '',
    password: ''
 });

  constructor(public service : AuthService, private router: Router, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    //this.service.signinUser("testingaccount", "&n76M!WD7Q")
    if(this.service.isAuthenticated()) {
      this.router.navigate(['/tabs'])
    }
  }

  tryLogin(): void{
    this.service.signinUser(this.loginForm.value["login"],this.loginForm.value["password"])
    this.loginForm.reset()
  }

}
