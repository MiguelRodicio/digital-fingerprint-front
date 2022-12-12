import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Fingerprint, JavascriptAttributes, IpAddressAttributes} from "../models/fingerprint.model";
import {Observable} from "rxjs";
const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class FingerprintService {

  fingerprint?:Fingerprint;
  ipAddressData?: IpAddressAttributes;

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
    const connection = JSON.parse(JSON.stringify(window.navigator.connection));
    return console.log(connection);
    /*connection.forEach((javascriptAttribute: JavascriptAttributes) => {
      this.javascriptAttributeList?.connection = connection;
    })*/

  }


  createFingerprint(data: any): Observable<any>{
    return this.http.post<any>('api/fingerprint', data);
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
