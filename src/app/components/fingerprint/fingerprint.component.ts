import {Component, OnInit} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {


  constructor (public _fingerprintService: FingerprintService) {}


  public getNavigatorType() {
    const usrAgent = navigator.userAgent;
    return this._fingerprintService.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
     (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
         (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
           (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
             (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
               (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown"
  }

  public getNavigatorUserAgent(){
    return this._fingerprintService.userAgent = navigator.userAgent;
  }
  public getTimeZone(){
    return this._fingerprintService.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  public getLocale(){
    return this._fingerprintService.locale = Intl.DateTimeFormat().resolvedOptions().locale;
  }
  public getCalendar(){
    return this._fingerprintService.calendar = Intl.DateTimeFormat().resolvedOptions().calendar;
  }
  public getNumberingSystem(){
    return this._fingerprintService.numberingSystem = Intl.DateTimeFormat().resolvedOptions().numberingSystem;
  }
  public getPlatformType(){
    return this._fingerprintService.platformType = window.navigator.platform;
  }

  public loadInitialData(){
    this.getNavigatorType();
    this.getTimeZone();
    this.getCalendar();
    this.getLocale();
    this.getNumberingSystem();
    this.getNavigatorUserAgent();
    this.getPlatformType();
  }



   /* if((navigator.userAgent.indexOf("Edg") > -1)){
      this.isIEOrEdge = true;
    }*/

  ngOnInit(): void {
    this.loadInitialData();
  }
}
