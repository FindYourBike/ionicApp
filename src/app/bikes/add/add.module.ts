import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikesPageRoutingModule } from './add-routing.module';

import { AddPage } from './add-page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
