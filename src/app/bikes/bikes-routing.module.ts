import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikesPage } from './bikes.page';

const routes: Routes = [
  {
    path: '',
    component: BikesPage,
  },
  { path: 'map', loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)},
  { path: 'add', loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)},  {
    path: 'delete',
    loadChildren: () => import('./delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'popovercomponent',
    loadChildren: () => import('./cards/popovercomponent/popovercomponent.module').then( m => m.PopovercomponentPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikesPageRoutingModule {}
