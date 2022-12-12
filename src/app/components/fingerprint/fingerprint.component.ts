import {Component, OnInit} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";
import {Constants} from "../../constants/constants";
import {Subject, from, takeUntil} from "rxjs";
import {
  HttpHeaderAttributes,
  JavascriptAttributes,
  Fingerprint,
  IpAddressAttributes,
  LocationAttributes
} from "../../models/fingerprint.model";
//Module on decs.d.ts
import { detectAnyAdblocker } from "just-detect-adblock";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.scss']
})
export class FingerprintComponent implements OnInit {

  public completed: boolean = false;
  public allCompleted: boolean = false;
  private unsubscribe: Subject<any> = new Subject();

  public javascriptAttributesList: JavascriptAttributes = {
    navigatorType: '',
    webRenderer: '',
    connection: '',
    adblock: '',
    keyboardLayout: '',
    cookiesEnabled: '',
    deviceMemory: '',
    screenWidth: '',
    screenHeight: '',
    gyroscope: '',
    accelerometer: '',
    hardwareConcurrency: 0,
    //battery: '',
    screen: undefined
  };

  public ipAddressAttributes: IpAddressAttributes = {
    ipAddress: '',
    ipv6Address: '',
    hostname: '',
    protocol: '',
    ipAddressLocation: '',
    localIpAddress: '',
    publicIpAddress: '',
    dnsServers: '',
    //mtu: 0,
    //hops: 0,
    ipCountry: '',
    ipStateRegion: '',
    ipCity: '',
    isp: ''
  }

  public httpHeaderAttributes: HttpHeaderAttributes = {
    userAgent: '',
    accept: '',
    contentEncoding: '',
    contentLanguage: ''
  }

   public locationAttributes: LocationAttributes = {
    coordinates: ''
   }


  private fingerprint: Fingerprint = {
    id: 0
  }


  /*public dataSource : any[] = [];
  public displayedColumns: any[] =
    [
     /!* this.constants.ATTRIBUTE_TYPE,
      this.constants.VALUE,*!/
      this.constants.USER_AGENT,
      this.constants.LOCALE,
      this.constants.CALENDAR,
      this.constants.NUMBERING_SYSTEM
    ];*/

  constructor (
    private fingerprintService: FingerprintService,
    public constants: Constants
  ) {}


  public setAllChecked() {
    this.allCompleted = true;

  }
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
    if(this.javascriptAttributesList?.navigatorType != undefined){
      this.javascriptAttributesList.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
        (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
          (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
            (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
              (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
                (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown";
    }

    this.httpHeaderAttributes.userAgent = navigator.userAgent;
    this.javascriptAttributesList.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.javascriptAttributesList.locale = Intl.DateTimeFormat().resolvedOptions().locale;
    this.javascriptAttributesList.calendar = Intl.DateTimeFormat().resolvedOptions().calendar;
    this.javascriptAttributesList.numberingSystem = Intl.DateTimeFormat().resolvedOptions().numberingSystem;
    this.javascriptAttributesList.platformType = window.navigator.platform;
  }

  public async saveFingerprint(){
    if(this.javascriptAttributesList.adblock!=undefined){
      this.javascriptAttributesList.adblock = await this.hasAdBlock();
    }
    const data = {
      id: this.fingerprint.id,
      navigatorType: this.javascriptAttributesList.navigatorType,
      locale: this.javascriptAttributesList.locale,
      calendar: this.javascriptAttributesList.calendar,
      numberingSystem: this.javascriptAttributesList.numberingSystem,
      connection: this.javascriptAttributesList.connection,
      webRenderer: this.javascriptAttributesList.webRenderer,
      adblock: this.javascriptAttributesList.adblock,
      cookiesEnabled: this.javascriptAttributesList.cookiesEnabled,
      platformType: this.javascriptAttributesList.platformType,
      deviceMemory: this.javascriptAttributesList.deviceMemory,
      timeZone: this.javascriptAttributesList.timeZone,
      screenWidth: this.javascriptAttributesList.screenWidth,
      screenHeight: this.javascriptAttributesList.screenHeight,
      gyroscope: this.javascriptAttributesList.gyroscope,
      accelerometer: this.javascriptAttributesList.accelerometer,
      hardwareConcurrency: this.javascriptAttributesList.hardwareConcurrency,
      screen: this.javascriptAttributesList.screen
    };
    this.fingerprintService.createFingerprint(data)
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
    if(this.javascriptAttributesList?.webRenderer != undefined){
      this.javascriptAttributesList.webRenderer = gl.getExtension('WEBGL_debug_renderer_info');
      return this.javascriptAttributesList.webRenderer ? {
        vendor: gl.getParameter(this.javascriptAttributesList.webRenderer.UNMASKED_VENDOR_WEBGL),
        renderer:  gl.getParameter(this.javascriptAttributesList.webRenderer.UNMASKED_RENDERER_WEBGL),
      } : {
        error: "no WEBGL_debug_renderer_info",
      };
    }
    return { error: 'Error'};
  }

  public getJavascriptAttributesData(){
    if(this.javascriptAttributesList?.connection!=undefined){
      return this.javascriptAttributesList.connection = window.navigator.connection;
    }
    return { error: 'Error'}
  }
  //TODO
  public async hasAdBlock(){

     detectAnyAdblocker().then((detected: any) => {
      if (detected) {
        this.javascriptAttributesList.adblock = "Yes";
      }
      this.javascriptAttributesList.adblock = "No";
    });
  }

  //TODO
  /* public getKeyboardLayout(){
    const keyboard = (navigator as any).keyboard;
    //return this.javascriptAttributesList.keyboardLayout = keyboard.getLayoutMap();
  }*/

  public hasCookiesEnabled() {
    if(this.javascriptAttributesList?.cookiesEnabled != undefined) {
      return this.javascriptAttributesList.cookiesEnabled = window.navigator.cookieEnabled.toString();
    } return { error: 'Error'}
  }

  public screenSize() {
    if((this.javascriptAttributesList?.screenWidth != undefined) && (this.javascriptAttributesList?.screenHeight != undefined)){
      this.javascriptAttributesList.screenWidth = screen.width.toString();
      this.javascriptAttributesList.screenHeight = screen.height.toString();
      return this.javascriptAttributesList.screenWidth.concat("x" + this.javascriptAttributesList.screenHeight);
    } return { error: 'Error'};
  }

  public gyroscope() {
    let gyroscope = 'No';
    if(this.javascriptAttributesList?.gyroscope != undefined) {
      window.addEventListener("devicemotion", function(event){
        if(event.rotationRate?.alpha || event.rotationRate?.beta || event.rotationRate?.gamma)
          gyroscope = 'Yes';
      });
      return this.javascriptAttributesList.gyroscope = gyroscope;
    } return { error : 'Error'};
  }

  public deviceMemory() {
    //const deviceMemory = window.navigator.deviceMemory;
    const deviceMemory = (window.navigator as any).deviceMemory;
    if(this.javascriptAttributesList?.deviceMemory != undefined){
      return this.javascriptAttributesList.deviceMemory = deviceMemory;
    } return { error: 'Error'};
  }

  public getScreen(){
    const screen = window.screen;
    if(this.javascriptAttributesList.screen != undefined){
      return this.javascriptAttributesList.screen = screen;
    }
    return { error: "Error"}
  }

  public accelerometer() {
    let accelerometer = 'No'
    if(this.javascriptAttributesList?.accelerometer != undefined){
      window.addEventListener("devicemotion", function(event){
        if(event.acceleration?.x || event.acceleration?.y || event.acceleration?.z)
          accelerometer = 'Yes';
      });
      return this.javascriptAttributesList.accelerometer = accelerometer;
    } return { error: 'Error'};
  }

  public hardwareConcurrency() {
    if(this.javascriptAttributesList?.hardwareConcurrency != undefined){
      return this.javascriptAttributesList.hardwareConcurrency = navigator.hardwareConcurrency;
    } return { error: 'Error'}
  }

    public getIpAddress(){
      return this.fingerprintService.getIp()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next:(res) =>{
            this.ipAddressAttributes.ipAddress = res.ip;
          }
        })
  }

  public getHostname(){
    this.ipAddressAttributes.hostname = location.hostname;
  }

  public getProtocol(){
    this.ipAddressAttributes.protocol = location.protocol;
  }

  public getPosition(){
    return this.fingerprintService.getLocationAttributes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next:(res) =>{
          this.locationAttributes.coordinates = res.coords.latitude
          console.log(this.locationAttributes.coordinates)
        }
      })
    // this.locationAttributes.location;
    //   navigator.geolocation.getCurrentPosition((position) => console.log(position));

  }

  public getLocation(){
    navigator.geolocation.getCurrentPosition(position => {
      this.locationAttributes.coordinates = position.coords.latitude + ', ' + position.coords.longitude
    })
  }
  //TODO
  public getMTU(){}






  ngOnInit(): void {
    /*this.dataSource.push(this.javascriptAttributesList)*/
    this.getLocation()
    this.loadInitialData();
    //navigator.geolocation.getCurrentPosition((position) => console.log(position))
    this.getJavascriptAttributesData();
    this.getVideoCardInfo();
    //console.log(window.navigator)
    //console.log(this.hasAdBlock());
    this.hasCookiesEnabled();
    this.deviceMemory();
    this.screenSize();
    this.gyroscope();
    this.accelerometer();
    this.hardwareConcurrency();
    this.saveFingerprint();
    this.getProtocol();
    //this.getPosition();
    console.log(this.getIpAddress());
    console.log(this.ipAddressAttributes.ipAddress);
    console.log(this.getHostname());
    this.getLocation()
    //console.log(this.fingerprintService.getAllFingerprints())
    //this.getKeyboardLayout();




  }
}
