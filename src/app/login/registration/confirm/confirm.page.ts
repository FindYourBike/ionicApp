import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

 loading: boolean;
 
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public service : AuthService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.loading = false;
  }

  async tryConfirm() {
    if (!this.confirmForm.valid)
      return;


    this.loading = true;

    try {
      var result = await this.service.confirmUser(this.route.snapshot.paramMap.get('username'),this.confirmForm.value["code"])
      this.router.navigate(['/login']);
    } catch(error) {
      this.presentToast(error.message)
    }
    this.confirmForm.reset()
    this.loading = false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}