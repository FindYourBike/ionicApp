import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http : HttpClient, private service : AuthService, public toastController: ToastController) { 

  }

  GetBikePing(BikeID : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };
    return this.http.get<IBikePing>(`https://pjseu3wbn4.execute-api.us-east-1.amazonaws.com/dev/pings/` + BikeID, httpOptions)
  }

  GetBikes(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };
    return this.http.get<IUserInfo>(`https://pjseu3wbn4.execute-api.us-east-1.amazonaws.com/dev/users/` + this.service.getUserID(), httpOptions)
  }

  GetReports(BikeID : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };
    return this.http.get<IReport[]>(`https://pjseu3wbn4.execute-api.us-east-1.amazonaws.com/dev/reports/` + BikeID, httpOptions)
  }

  PatchUser(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };

    this.http.patch<any>(`https://pjseu3wbn4.execute-api.us-east-1.amazonaws.com/dev/users/` + this.service.getUserID(), JSON.parse(body), httpOptions).subscribe(data => {
      console.log(data)
      this.presentToast("Succes, please reload page")
    }) 
   }

   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

  



export interface IBikePing {
  lon: string;
  id: string;
  lat: string;
  time: number;
  bat: number;
}

export interface IUserInfo {
  UserID: string;
  bikes: Object[];
}

export interface IReport {
  BikeID: string;
  bikename: string;
  time: number;
  distance: number;
  nodes: INode[];
}

export interface INode {
  time: number;
  roadquality: string;
  BikeID: string;
  latitude: number;
  longitude: number;
}




