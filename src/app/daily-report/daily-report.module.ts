import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyReportPageRoutingModule } from './daily-report-routing.module';

import { DailyReportPage } from './daily-report.page';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyReportPageRoutingModule
  ],
  declarations: [DailyReportPage, CardComponent]
})
export class DailyReportPageModule {}
