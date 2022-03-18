import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Fingerprint } from "../models/fingerprint.model";
import {Observable} from "rxjs";
const baseUrl = 'http://localhost:8080/fingerprint';

@Injectable({
  providedIn: 'root'
})

export class FingerprintService {

  //javascriptAttributes?: string;
  //httpAttributes:? string;
  id?: number;
  navigatorType?: string;
  timeZone?: string
  userAgent?: string;
  locale?: string;
  calendar?: string;
  numberingSystem?: string;
  platformType?: string;

  constructor(
    private http: HttpClient
  ) { }

  createFingerprint(data: any, options?:any): Observable<any>{
    return this.http.post(baseUrl, data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8"
      })
    });
  }

  getFingerprint(id: any): Observable<any>{
    return this.http.get('{$baseUrl}/${id}');
  }

  deleteFingerprint(id: any): Observable<any> {
    return this.http.delete('${baseUrl}/${id}');
  }
}
