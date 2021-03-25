import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http : HttpClient) { }

  GetBikeInfo(){
    return this.http.get<IBikeInfo>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/bikes/TestDemo1`)
  }
}



  export interface IBikeInfo {
      longitude: string;
      BikeID: string;
      latitude: string;
      LocationTimeStamp: number;
  }




