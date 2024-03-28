import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Fingerprint} from "../models/fingerprint.model";
import {Observable} from "rxjs";
const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class FingerprintService {

  fingerprint?:Fingerprint;

  //javascriptAttributes?: string;
  //httpAttributes:? string;
/*  id?: number;
  navigatorType?: string;
  timeZone?: string
  userAgent?: string;
  locale?: string;
  calendar?: string;
  numberingSystem?: string;
  platformType?: string;*/

  constructor(
    private http: HttpClient
  ) { }

  public getJavascriptAttributesData(): any{
    const connection = JSON.parse(JSON.stringify((navigator as any).connection));
    return console.log(connection);
    /*connection.forEach((javascriptAttribute: JavascriptAttributes) => {
      this.javascriptAttributeList?.connection = connection;
    })*/

  }


  saveFingerprint(data: any): Observable<any>{
    const url = "http://localhost:3000/fingerprint"
    return this.http.post<any>(url, data)

  }

  getFingerprint(id: any): Observable<any>{
    return this.http.get('${baseUrl}/${id}');
  }

  getAllFingerprints(): Observable<any>{
    return this.http.get('/api/fingerprint');

  }

  deleteFingerprint(id: any): Observable<any> {
    return this.http.delete('${baseUrl}/${id}');
  }

  public getLocationAttributes(): Observable<any>{
    return this.http.get('https://ipgeolocation.abstractapi.com/v1/?api_key=');
  }

  public getGeolocationAttributes(): Observable<any> {
    return this.http.get('http://ip-api.com/json/?fields=66846719')
  }

  getIp(): Observable<any>{
    return this.http.get('https://api.ipify.org?format=json')
      // .subscribe({
      //   next:(ipAddress) =>{
      //     console.log(this.ipAddressData)
      //     this.ipAddressData = ipAddress;
      //    }
      //   // error: (e) => console.error(e)
      // })

  }
}
