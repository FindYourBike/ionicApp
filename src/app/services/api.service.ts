import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http : HttpClient) { }

  GetBikeInfo(BikeID : string){
    return this.http.get<IBikeInfo>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/bikes/` + BikeID)
  }

  GetBikes(){
    return this.http.get<IBikes>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/users/testuser`)
  }
}



  export interface IBikeInfo {
      lon: string;
      BikeID: string;
      lat: string;
      time: number;
  }

  export interface IBikes {
    UserID: string;
    bikes: string[];
}




