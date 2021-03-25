import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPage } from '../map/map.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bikes',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'bikes', loadChildren: () => import('../bikes/bikes.module').then( m => m.BikesPageModule)},
      { path: 'daily-report', loadChildren: () => import('../daily-report/daily-report.module').then( m => m.DailyReportPageModule)},
      { path: 'account', loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
