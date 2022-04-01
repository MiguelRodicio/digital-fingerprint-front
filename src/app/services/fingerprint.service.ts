import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Fingerprint, JavascriptAttributes} from "../models/fingerprint.model";
import {Observable} from "rxjs";
const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class FingerprintService {

  fingerprint?:Fingerprint;
  javascriptAttributeList?: JavascriptAttributes;
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


  createFingerprint(data: any, options?:any): Observable<any>{
    return this.http.post(baseUrl, data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8"
      })
    });
  }

  getFingerprint(id: any): Observable<any>{
    return this.http.get('${baseUrl}/${id}');
  }

  getAllFingerprints(): Observable<any>{
    return this.http.get(baseUrl);
  }

  deleteFingerprint(id: any): Observable<any> {
    return this.http.delete('${baseUrl}/${id}');
  }
}
