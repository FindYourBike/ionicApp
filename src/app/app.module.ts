import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, JwtModule.forRoot({
    config: {
      tokenGetter: function  tokenGetter() { 
      return localStorage.getItem('token');
      }}}) ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
