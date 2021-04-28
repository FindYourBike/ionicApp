import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../../bikes.page';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page';
import { PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-regularbike',
  templateUrl: './regularbike.component.html',
  styleUrls: ['./regularbike.component.scss'],
})
export class RegularbikeComponent implements OnInit {

  @Input() bike: IBikeCard;

  constructor(public popoverController:PopoverController) {} 

  async presentPopover(ev: any, bike) {
    const popover = await this.popoverController.create({
      component: PopovercomponentPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {bike: bike}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  
  ngOnInit() {
    console.log(this.bike)
  }
}

export interface IBikeCard extends ICard {
  lon: string;
  id: string;
  lat: string;
  time: number;
  bat: number;
}
