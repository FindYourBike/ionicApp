import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registerForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
 });

  constructor(public service : AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  
  tryRegister(): void{
    this.service.signupUser(this.registerForm.value["username"], this.registerForm.value["password"], this.registerForm.value["email"], this.registerForm.value["name"])
    this.registerForm.reset()
  }
}
