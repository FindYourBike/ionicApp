import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { IonicModule } from '@ionic/angular';

import { MapComponentRoutingModule } from './map-routing.module';

import { MapComponent } from './map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapComponentRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1P2R6rG3UA68hCKvBS3nY-YMPzSkore8'
    })
  ],
  declarations: [MapComponent]
})
export class MapComponentModule {}
