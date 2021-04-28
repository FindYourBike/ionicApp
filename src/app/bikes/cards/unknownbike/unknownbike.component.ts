import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ICard } from '../../bikes.page';
import { PopovercomponentPage } from '../popovercomponent/popovercomponent.page';

@Component({
  selector: 'app-unknownbike',
  templateUrl: './unknownbike.component.html',
  styleUrls: ['./unknownbike.component.scss'],
})
export class UnknownbikeComponent implements OnInit {

  @Input() bike: ICard;
  
  constructor(public popoverController:PopoverController) { }

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

