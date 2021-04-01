import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { IonSlides } from '@ionic/angular';

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
    ID: new FormControl('', [Validators.required, Validators.pattern("[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}")]),
  })

  @ViewChild(IonSlides) slides: IonSlides;
  constructor(public service : APIService, private formBuilder: FormBuilder) { 
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

}
