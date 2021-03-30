import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http : HttpClient, private service : AuthService) { 

  }

  GetBikeInfo(BikeID : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };
    return this.http.get<IBikeInfo>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/bikes/` + BikeID, httpOptions)
  }

  GetBikes(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.service.getToken()
      })
    };
    return this.http.get<IBikes>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/users/` + this.service.getUserID(), httpOptions)
  }
}



  export interface IBikeInfo {
      lon: string;
      BikeID: string;
      lat: string;
      time: number;
      bat: number;
  }

  export interface IBikes {
    UserID: string;
    bikes: string[];
}




