import {Component, OnInit} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";
import {Fingerprint} from "../../models/fingerprint.model";
import {Constants} from "../../constants/constants";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

  public dataSource : any[] = [];
  public displayedColumns: string[] =
    [
      this.constants.ATTRIBUTE_TYPE,
      this.constants.VALUE
    ];

  private unsubscribe: Subject<any> = new Subject();

  constructor (
    public fingerprintService: FingerprintService,
    public constants: Constants
  ) {}


/*  public getNavigatorType() {
    const usrAgent = navigator.userAgent;
    return this._fingerprintService.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
     (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
         (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
           (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
             (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
               (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown"
  }*/

 /* public getNavigatorUserAgent(){
    return this._fingerprintService.userAgent = navigator.userAgent;
  }*/
  /*public getTimeZone(){
    return this._fingerprintService.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }*/
  /*public getLocale(){
    return this._fingerprintService.locale = Intl.DateTimeFormat().resolvedOptions().locale;
  }*/
  /*public getCalendar(){
    return this._fingerprintService.calendar = Intl.DateTimeFormat().resolvedOptions().calendar;
  }*/
  /*public getNumberingSystem(){
    return this._fingerprintService.numberingSystem = Intl.DateTimeFormat().resolvedOptions().numberingSystem;
  }*/
  /*public getPlatformType(){
    return this._fingerprintService.platformType = window.navigator.platform;
  }*/

  public loadInitialData(){

    const usrAgent = navigator.userAgent;
    this.fingerprintService.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
      (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
        (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
          (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
            (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
              (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown";

    this.fingerprintService.userAgent = navigator.userAgent;
    this.fingerprintService.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.fingerprintService.locale = Intl.DateTimeFormat().resolvedOptions().locale;
    this.fingerprintService.calendar = Intl.DateTimeFormat().resolvedOptions().calendar;
    this.fingerprintService.numberingSystem = Intl.DateTimeFormat().resolvedOptions().numberingSystem;
    this.fingerprintService.platformType = window.navigator.platform;

    return this.dataSource.push(this.fingerprintService);
  }

  saveFingerprint(): void {
    const data = {
      id: this.fingerprintService.id,
      navigatorType: this.fingerprintService.navigatorType,
      userAgent: this.fingerprintService.userAgent,
      timeZone: this.fingerprintService.timeZone,
      locale: this.fingerprintService.locale,
      calendar: this.fingerprintService.calendar,
      numberingSystem: this.fingerprintService.numberingSystem,
      platformType: this.fingerprintService.platformType
    };
    this.fingerprintService.createFingerprint(data)
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

   /* if((navigator.userAgent.indexOf("Edg") > -1)){
      this.isIEOrEdge = true;
    }*/

  ngOnInit(): void {
    this.loadInitialData();
    this.saveFingerprint();
  }
}
