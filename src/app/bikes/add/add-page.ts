import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  name: string
  ID: string

  addFormName = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
  });

  addFormID = this.formBuilder.group({
    ID: new FormControl('', [Validators.required, Validators.pattern("[0-9a-fA-F]{16}")]),
  })

  @ViewChild(IonSlides) slides: IonSlides;
  constructor(public service : APIService, private formBuilder: FormBuilder, private router: Router) { 
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // child is set
    //this.slides.lockSwipes(true);
    this.slides.lockSwipeToNext(true);
}

  goto(slide) {
    this.slides.lockSwipeToNext(false)
    this.slides.slideTo(slide)
    this.slides.lockSwipeToNext(true)
  }

  tryAddName() {
    if (!this.addFormName.valid)
      return

    this.name = this.addFormName.value["name"]
    this.goto(2)
  }

  tryAddID() {
    if (!this.addFormID.valid)
      return

    this.ID = this.addFormID.value["ID"]
    this.goto(3)
  }

  async tryAddBike() {
    var body = {}
    var bikelist = new Array()
    this.service.GetBikes().subscribe(bikes => {
      if(bikes.bikes != undefined || bikes.bikes != null) {
        bikes.bikes.forEach(element => {
          bikelist.push(element)
        });
      }
      var newbike = new Object()
      newbike["bikename"] = this.name
      newbike["bikeid"] = this.ID
      bikelist.push(newbike)
      body["bikes"] = bikelist
      this.service.PatchUser(JSON.stringify(body))

    })
    this.router.navigate(['/tabs/bikes']);
  }

}
