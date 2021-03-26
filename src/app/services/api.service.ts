import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http : HttpClient) { 

  }

  GetBikeInfo(BikeID : string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'Authorization': 'eyJraWQiOiJ1RENmWDhRbkRySXBrRVUxXC9HNzJpbFF5ckdEekZNZ3J4akVkS3AydVhNWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MjU1NDZlZC0yODUwLTQ2MDEtYTU5MC01YmI1MGI3ZTZjM2UiLCJhdWQiOiJqNzZvbm00Z2d0ZjBqbWd1ZTVzcjk3ZGlvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiZGViM2UwNTEtNDQ5Yy00Y2M1LThlMDktZmZlNDI1NTVlMWQ5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTY3ODgwMDksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0VmM2JtdkNGRiIsIm5hbWUiOiJ0ZXN0bmFtZSIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0aW5nYWNjb3VudCIsImV4cCI6MTYxNjc5MTYwOSwiaWF0IjoxNjE2Nzg4MDA5LCJlbWFpbCI6Ikx1Y2FkZWxhdXdAZ21haWwuY29tIn0.VQ9KWvZ9VZnWrbcMfyBMlo_vLdEiKwNazv7FIB9BkvacMcaXc7YhvhvUUC8Sc6P0PN4_Z30p-A6uNhzuKa6DcAU_CHwqvK117Ji8_HGMHmYmgOgncM-WuCGSDG1KYCIGJ80N-dmaWZqpVQFSHhxVZ9pcqMsgo48oxHFN3kY6bSZmyURqwkQMu-NiuBB805TdN1iO9JWJnJbWHGGoi7Cmys26L-RKPKvSiciU2CSlJncPhP5xobsalQLPr_eZsX3v7X6bChn43KcxVDR17iOFLbdaKYAwbcmskWk64_k57QaW0W2dG6cvoFkRPWYnPDxqzaRFZLTidXBLTlMmW1jmXw'
      })
    };
    return this.http.get<IBikeInfo>(`https://xdzj4zber6.execute-api.us-east-1.amazonaws.com/dev/bikes/` + BikeID, httpOptions)
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




