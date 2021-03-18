import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPage } from '../map/map.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'map', loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)},
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
