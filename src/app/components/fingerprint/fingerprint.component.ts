import {Component, OnInit, Renderer2} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";
import {Constants} from "../../constants/constants";
import {Subject} from "rxjs";
import {Fingerprint, JavascriptAttributes} from "../../models/fingerprint.model";
//Module on decs.d.ts
import { detectAnyAdblocker } from "just-detect-adblock";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.scss']
})
export class FingerprintComponent implements OnInit {

  private javascriptAttributes?: JavascriptAttributes = {
    webRenderer: '',
    connection: '',
    adblock: '',
    keyboardLayout: '',
    cookiesEnabled: false
  };
  public dataSource : any[] = [];
  public displayedColumns: any[] =
    [
     /* this.constants.ATTRIBUTE_TYPE,
      this.constants.VALUE,*/
      this.constants.USER_AGENT,
      this.constants.LOCALE,
      this.constants.CALENDAR,
      this.constants.NUMBERING_SYSTEM
    ];
  public fingerprint?: Fingerprint;

  private unsubscribe: Subject<any> = new Subject();

  constructor (
    private fingerprintService: FingerprintService,
    public constants: Constants,
    private renderer: Renderer2
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
    this.fingerprintService.getAllFingerprints()
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    /*createFingerprint(data)
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error: (e) => console.error(e)
      });*/
  }


  public getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    if(this.javascriptAttributes?.webRenderer != undefined){
      this.javascriptAttributes.webRenderer = gl.getExtension('WEBGL_debug_renderer_info');
      return this.javascriptAttributes.webRenderer ? {
        vendor: gl.getParameter(this.javascriptAttributes.webRenderer.UNMASKED_VENDOR_WEBGL),
        renderer:  gl.getParameter(this.javascriptAttributes.webRenderer.UNMASKED_RENDERER_WEBGL),
      } : {
        error: "no WEBGL_debug_renderer_info",
      };
    }
    return { error: 'Error'};
  }

  public getJavascriptAttributesData(){
    const connection = window.navigator.connection;
    if(this.javascriptAttributes?.connection!=undefined){
      this.javascriptAttributes.connection = connection;
    }
  }

  public hasAdBlock(){
    detectAnyAdblocker().then((detected: string) => {
      if(detected && this.javascriptAttributes?.adblock != undefined){
        // an adblocker is detected
         this.javascriptAttributes.adblock = "Yes";
      }
      // @ts-ignore
        this.javascriptAttributes.adblock = "Does not have adblock";
    });
  }

  //TODO
  /* public getKeyboardLayout(){
    const keyboard = (navigator as any).keyboard;
    //return this.javascriptAttributes.keyboardLayout = keyboard.getLayoutMap();
  }*/

  public hasCookiesEnabled() {
    if(this.javascriptAttributes?.cookiesEnabled != undefined) {
      this.javascriptAttributes.cookiesEnabled = window.navigator.cookieEnabled;
    }
  }

  public deviceMemory() {
    //const deviceMemory = window.navigator.deviceMemory;
    const devMem = (window.navigator as any).deviceMemory;
    console.log(devMem)



  }


  ngOnInit(): void {
    this.loadInitialData();
    this.saveFingerprint();
    this.getJavascriptAttributesData();
    this.getVideoCardInfo();
    this.hasAdBlock();
    this.hasCookiesEnabled();
    this.deviceMemory();
    //this.getKeyboardLayout();




  }
}
