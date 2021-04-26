import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  name: string
  ID: string

  delFormName = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
  });

  delFormID = this.formBuilder.group({
    ID: new FormControl('', [Validators.required, Validators.pattern("[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}")]),
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

  tryDelName() {
    if (!this.delFormName.valid)
      return

    this.name = this.delFormName.value["name"]
    this.goto(2)
  }

  tryDelID() {
    if (!this.delFormID.valid)
      return

    this.ID = this.delFormID.value["ID"]
    this.goto(3)
  }

  async tryDelBike() {
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
