import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyReportPage } from './daily-report.page';

const routes: Routes = [
  {
    path: '',
    component: DailyReportPage
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapComponentModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyReportPageRoutingModule {}
