import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  confirmForm = this.formBuilder.group({
    code: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}")]),
 });
 
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public service : AuthService) { }

  ngOnInit() {
  }

  tryConfirm(): void{
    this.service.confirmUser(this.route.snapshot.paramMap.get('username'),this.confirmForm.value["code"])
    this.confirmForm.reset()
  }
}