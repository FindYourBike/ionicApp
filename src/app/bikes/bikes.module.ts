import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikesPageRoutingModule } from './bikes-routing.module';
import { UnknownbikeComponent } from './cards/unknownbike/unknownbike.component'
import { RegularbikeComponent } from './cards/regularbike/regularbike.component'

import { BikesPage } from './bikes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikesPageRoutingModule,
  ],
  declarations: [
    BikesPage,
    UnknownbikeComponent,
    RegularbikeComponent
  ]
})
export class BikesPageModule {}
