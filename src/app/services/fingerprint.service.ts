import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  public navigatorType: boolean | any;
  public timeZone?: string
  public userAgent?: string;
  public locale?: string;
  public calendar?: string;
  public numberingSystem?: string;
  public platformType?: string;

  constructor() { }

}
