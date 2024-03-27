import {Component, OnInit} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";
import {Constants} from "../../constants/constants";
import {forkJoin, from, Observable, Subject, takeUntil} from "rxjs";
import {Fingerprint} from "../../models/fingerprint.model";

import { BatteryInfo } from '../../models/fingerprint.model';
//Module on decs.d.ts
import {detectAnyAdblocker} from "just-detect-adblock";
import {getGPUTier} from 'detect-gpu';
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.scss']
})
export class FingerprintComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);

  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 }, // Coordenadas del centro del mapa
    zoom: 10, // Nivel de zoom
  };

  //center: google.maps.LatLngLiteral;

  public completed: boolean = false;
  public allCompleted: boolean = false;
  private unsubscribe: Subject<any> = new Subject();
  public apiData: any = {};


  public fingerprint: Fingerprint = {
    navigatorType: '',
    webGLRenderer: '',
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
    battery: '',
    screen: '',
    cookies: '',
    positionMap: {lat: 0, lng: 0},
    mapCenter:  { lat: 0, lng: 0 },
    id: 0
  };

  // public ipAddressAttributes: IpAddressAttributes = {
  //   ipAddress: '',
  //   ipv6Address: '',
  //   hostname: '',
  //   protocol: '',
  //   ipAddressLocation: '',
  //   localIpAddress: '',
  //   publicIpAddress: '',
  //   dnsServers: '',
  //   //mtu: 0,
  //   //hops: 0,
  //   ipCountry: '',
  //   ipStateRegion: '',
  //   ipCity: '',
  // }
  //


  //Mat-table data

  columns: string[] = ['attribute', 'value'];


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

    constructor(private fingerprintService: FingerprintService, public constants: Constants) {
      this.loadInitialData()

    }
    public geolocationData: any;
    public javascriptAttributesData: any;

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

  public loadInitialData() {
    this.fingerprint.navigatorType = this.getBrowserName();
    this.fingerprint.userAgent = navigator.userAgent;
    const dateTimeOptions = Intl.DateTimeFormat().resolvedOptions();
    this.fingerprint.timeZone = dateTimeOptions.timeZone;
    this.fingerprint.locale = dateTimeOptions.locale;
    this.fingerprint.calendar = dateTimeOptions.calendar;
    this.fingerprint.numberingSystem = dateTimeOptions.numberingSystem;
    this.fingerprint.platformType = window.navigator.platform;
  }

  private getBrowserName() {
    const usrAgent = navigator.userAgent;
    const browserMap = {
      "Edg": "Microsoft Edge (Chromium)",
      "Firefox": "Mozilla Firefox",
      "Opera": "Opera",
      "Trident": "Microsoft Internet Explorer",
      "Edge": "Microsoft Edge (Legacy)",
      "Chrome": "Google Chrome",
      "Safari": "Safari"
    };

    return Object.keys(browserMap).find(key => usrAgent.includes(key)) || "unknown";

  }


  public async saveFingerprint(){
    if(this.fingerprint.adblock!=undefined){
      this.fingerprint.adblock = await this.hasAdBlock();
    }
    const data = {
      id: this.fingerprint.id,
      navigatorType: this.fingerprint.navigatorType,
      locale: this.fingerprint.locale,
      calendar: this.fingerprint.calendar,
      numberingSystem: this.fingerprint.numberingSystem,
      connection: this.fingerprint.connection,
      webRenderer: this.fingerprint.webGLRenderer,
      adblock: this.fingerprint.adblock,
      cookiesEnabled: this.fingerprint.cookiesEnabled,
      platformType: this.fingerprint.platformType,
      deviceMemory: this.fingerprint.deviceMemory,
      timeZone: this.fingerprint.timeZone,
      screenWidth: this.fingerprint.screenWidth,
      screenHeight: this.fingerprint.screenHeight,
      gyroscope: this.fingerprint.gyroscope,
      accelerometer: this.fingerprint.accelerometer,
      hardwareConcurrency: this.fingerprint.hardwareConcurrency,
      screen: this.fingerprint.screen
    };
    this.fingerprintService.saveFingerprint(data)
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

  public getGpu(){
    (async () => {
      const gpuTier = await getGPUTier();
      this.fingerprint.webGLRenderer = gpuTier.gpu;

      // Example output:
      // {
      //   "tier": 1,
      //   "isMobile": false,
      //   "type": "BENCHMARK",
      //   "fps": 21,
      //   "gpu": "intel iris graphics 6100"
      // }
    })();
  }

    public getGpuToObservable(): Observable<any> {
        return from(getGPUTier());
    }
    public  getGpuInfo(): void {
        this.getGpuToObservable()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((gpuTier) => {
                this.fingerprint.webGLRenderer = gpuTier.gpu;
            });
    }

  // getGPUInfo(): void {
  //   const canvas = document.createElement('canvas');
  //   const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  //
  //   if (gl) {
  //     this.javascriptAttributesList.webGLRenderer = gl;
  //     const vendor = gl.getParameter(gl.VENDOR);
  //     const renderer = gl.getParameter(gl.RENDERER);
  //     console.log('Proveedor de GPU:', gpuInfo.vendor);
  //     console.log('Modelo de GPU:', gpuInfo.renderer);
  //   } else {
  //     console.error('WebGL no es compatible en este navegador.');
  //   }
  // }
  public getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    if(this.fingerprint?.webGLRenderer != undefined){
      const extension = gl.getExtension('WEBGL_debug_renderer_info');
      if(extension) {
        this.fingerprint.webGLVendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
        this.fingerprint.webGLRenderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      }
    }
    return {
      vendor: this.fingerprint.webGLVendor,
      renderer: this.fingerprint.webGLRenderer,
    };
  }

  public getJavascriptAttributesData(){
    if(this.fingerprint?.connection != undefined){
      return this.fingerprint.connection = (navigator as any).connection;
    }
    return { error: 'Error'}
  }
  //TODO
  public async hasAdBlock(){
     detectAnyAdblocker().then((detected: any) => {
      if (detected) {
        this.fingerprint.adblock = "Yes";
      }
      this.fingerprint.adblock = "No";
    });
  }

  //TODO
  /* public getKeyboardLayout(){
    const keyboard = (navigator as any).keyboard;
    //return this.javascriptAttributesList.keyboardLayout = keyboard.getLayoutMap();
  }*/

  public hasCookiesEnabled() {
    if(this.fingerprint?.cookiesEnabled != undefined) {
      return this.fingerprint.cookiesEnabled = window.navigator.cookieEnabled.toString();
    } return { error: 'Error'}
  }

  public screenSize() {
    if((this.fingerprint?.screenWidth != undefined) && (this.fingerprint?.screenHeight != undefined)){
      this.fingerprint.screenWidth = screen.width.toString();
      this.fingerprint.screenHeight = screen.height.toString();
      return this.fingerprint.screen =this.fingerprint.screenWidth.concat("x" + this.fingerprint.screenHeight);
    } return { error: 'Error'};
  }

  public gyroscope() {
    let gyroscope = 'No';
    if(this.fingerprint?.gyroscope != undefined) {
      window.addEventListener("devicemotion", function(event){
        if(event.rotationRate?.alpha || event.rotationRate?.beta || event.rotationRate?.gamma)
          gyroscope = 'Yes';
      });
      return this.fingerprint.gyroscope = gyroscope;
    } return { error : 'Error'};
  }

  public deviceMemory() {
    //const deviceMemory = window.navigator.deviceMemory;
    const deviceMemory = (window.navigator as any).deviceMemory;
    if(this.fingerprint?.deviceMemory != undefined){
      return this.fingerprint.deviceMemory = deviceMemory + "GB";
    } return { error: 'Error'};
  }

  // public getScreen(){
  //   const screen = window.screen;
  //   if(this.javascriptAttributes.screen != undefined){
  //     return this.javascriptAttributes.screen = screen;
  //   }
  //   return { error: "Error"}
  // }

  public accelerometer() {
    let accelerometer = 'No'
    if(this.fingerprint?.accelerometer != undefined){
      window.addEventListener("devicemotion", function(event){
        if(event.acceleration?.x || event.acceleration?.y || event.acceleration?.z)
          accelerometer = 'Yes';
      });
      return this.fingerprint.accelerometer = accelerometer;
    } return { error: 'Error'};
  }

  public hardwareConcurrency() {
    if(this.fingerprint?.hardwareConcurrency != undefined){
      return this.fingerprint.hardwareConcurrency = navigator.hardwareConcurrency;
    } return { error: 'Error'}
  }

    public getIpAddress(){
      return this.fingerprintService.getIp()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next:(res) =>{
            this.fingerprint.ipAddress = res.ip;
          }
        })
  }

  public getHostname(){
    this.fingerprint.hostname = location.hostname;
  }

  public getProtocol(){
    this.fingerprint.protocol = location.protocol;
  }

  checkBatteryStatus(): Promise<string> {
    return new Promise((resolve, reject) => {
      (navigator as any).getBattery()
        .then((battery: any) => {
          if (battery.chargingTime === 0 && battery.dischargingTime === Infinity) {
            resolve("false");
          } else {
            resolve("true");
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // public getPosition(){
  //   this.fingerprintService.getLocationAttributes()
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe({
  //       next:(res) =>{
  //         this.locationAttributes.coordinates = res.coords.latitude
  //         console.log(this.locationAttributes.coordinates)
  //       }
  //     })
  //   // this.locationAttributes.location;
  //   //   navigator.geolocation.getCurrentPosition((position) => console.log(position));
  //
  // }

  public getLocationForMap() {
     this.fingerprintService.getLocationAttributes()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res) =>{
            this.fingerprint.positionMap = {
                lat : res.coords.latitude,
                lng : res.coords.longitude
            };
        })
   //const markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Ubicación del marcador
   //  navigator.geolocation.getCurrentPosition(position => {
   //    markerPosition.lat = position.coords.latitude; // Asignar la latitud obtenida
   //    markerPosition.lng = position.coords.longitude; // Asignar la longitud obtenida
   //    this.centerMap(markerPosition);
    }

    public setMapCenter() {
        navigator.geolocation.getCurrentPosition((position) => {
          this.fingerprint.mapCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
    }


  public getGpu2(): Observable<any> {
    return new Observable((observer) => {
      getGPUTier()
          .then((gpuTier) => {
            observer.next(gpuTier);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
    });
  }
  public getAPIAttributes2() {
    forkJoin([
      this.fingerprintService.getGeolocationAttributes(),
      this.getGpu2()
    ])
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: ([geoAttributes, gpuTier]) => {
            // Los resultados de ambos observables están disponibles aquí
            this.javascriptAttributesData = geoAttributes;
            this.fingerprint.webGLRenderer = gpuTier.gpu;

            // Continúa con cualquier otra lógica que necesites después de obtener la ubicación y la GPU.
          },
          error: (error) => {
            console.error(error);
          }
        });
  }

  /**
   * Asigna dinámicamente los atributos del objeto fuente al objeto destino.
   *
   * @param {object} target - El objeto al que se asignarán los atributos.
   * @param {object} source - El objeto que contiene los atributos a asignar.
   */
  public assignAttributes(target: any, source: any) {
    Object.keys(source).forEach((key) => {
      target[key] = source[key];
    });
  }


  public assignAttributesFromAPI(res: any){
    this.assignAttributes(this.fingerprint, res);
  }

  // public getAPIAttributes(){
  //   this.fingerprintService.getGeolocationAttributes()
  //     .pipe(takeUntil(this.unsubscribe))
  //     .subscribe({
  //       next:(res) =>{
  //       //this.javascriptAttributesData = res;
  //         this.assignJavascriptAttributes(res);
  //         this.assignLocationAttributes(res);
  //
  //         const newData = [
  //           {attribute: this.constants.QUERY, value: this.javascriptAttributes.query},
  //           {attribute: this.constants.STATUS, value: this.javascriptAttributes.status},
  //           {attribute: this.constants.CONTINENT, value: this.locationAttributes.continent},
  //           {attribute: this.constants.CONTINENT_CODE, value: this.locationAttributes.continentCode},
  //           {attribute: this.constants.COUNTRY, value: this.locationAttributes.country},
  //           {attribute: this.constants.COUNTRY_CODE, value: this.locationAttributes.countryCode},
  //           {attribute: this.constants.REGION, value: this.locationAttributes.region},
  //           {attribute: this.constants.REGION_NAME, value: this.locationAttributes.regionName},
  //           {attribute: this.constants.CITY, value: this.locationAttributes.city},
  //           {attribute: this.constants.DISTRICT, value: this.locationAttributes.district},
  //           {attribute: this.constants.ZIP, value: this.locationAttributes.zip},
  //           {attribute: this.constants.ASNAME, value: this.javascriptAttributes.asName},
  //           {attribute: this.constants.REVERSE, value: this.javascriptAttributes.reverse},
  //           {attribute: this.constants.MOBILE, value: this.javascriptAttributes.mobile},
  //           {attribute: this.constants.PROXY, value: this.javascriptAttributes.proxy},
  //           {attribute: this.constants.OFFSET, value: this.javascriptAttributes.offset},
  //           {attribute: this.constants.CURRENCY, value: this.javascriptAttributes.currency},
  //           {attribute: this.constants.ISP, value: this.javascriptAttributes.isp},
  //           {attribute: this.constants.ZIP, value: this.locationAttributes.zip},
  //           {attribute: this.constants.HOSTING, value: this.javascriptAttributes.hosting}
  //         ]
  //         return this.dataSource.data = [...this.dataSource.data, ...newData];
  //
  //       },
  //       error: (error) => {
  //       console.error(error);
  //     }
  //   })
  // }

  public transformData(data: any[]): any {
    return data.map(object => {
      const newObject: { [key: string]: any } = {};
      for (const key in object) {
        if (key !== 'id') {
          newObject[object[key].attribute] = object[key].value;
        }
      }
      return newObject;
    });

  }
// public postFingerprintData(){
//   this.fingerprintService.getGeolocationAttributes()
//     .pipe(takeUntil(this.unsubscribe))
//     .subscribe({
//       next: (res: any) => {
//         //this.assignAttributesFromAPI(res);
//         this.fingerprint.status = res.status;
//         this.fingerprint.continent = res.continent;
//         this.fingerprint.continentCode = res.continentCode;
//         this.fingerprint.country = res.country;
//         this.fingerprint.countryCode = res.countryCode;
//         this.fingerprint.region = res.region;
//         this.fingerprint.regionName = res.regionName;
//         this.fingerprint.city = res.city;
//         this.fingerprint.district = res.district;
//         this.fingerprint.zip = res.zip;
//         this.fingerprint.latitude = res.lat;
//         this.fingerprint.longitude = res.lon;
//         this.fingerprint.timezone = res.timezone;
//         this.fingerprint.offset = res.offset;
//         this.fingerprint.currency = res.currency;
//         this.fingerprint.isp = res.isp;
//         this.fingerprint.org = res.org;
//         this.fingerprint.as = res.as;
//         this.fingerprint.asName = res.asname;
//         this.fingerprint.reverse = res.reverse;
//         this.fingerprint.mobile = res.mobile;
//         this.fingerprint.proxy = res.proxy;
//         this.fingerprint.hosting = res.hosting;
//         this.fingerprint.query = res.query;
//       },
//       error: (error) => {
//         console.error(error);
//       }
//     });
// }
public setupDataSource2() {

    this.fingerprintService.getGeolocationAttributes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
      next: (res: any) => {
        this.dataSource.data = this.setupDataSource(res);
        //this.assignAttributesFromAPI(res);
        this.fingerprint.status = res.status;
        this.fingerprint.continent = res.continent;
        this.fingerprint.continentCode = res.continentCode;
        this.fingerprint.country = res.country;
        this.fingerprint.countryCode = res.countryCode;
        this.fingerprint.region = res.region;
        this.fingerprint.regionName = res.regionName;
        this.fingerprint.city = res.city;
        this.fingerprint.district = res.district;
        this.fingerprint.zip = res.zip;
        this.fingerprint.latitude = res.lat;
        this.fingerprint.longitude = res.lon;
        this.fingerprint.timezone = res.timezone;
        this.fingerprint.offset = res.offset;
        this.fingerprint.currency = res.currency;
        this.fingerprint.isp = res.isp;
        this.fingerprint.org = res.org;
        this.fingerprint.as = res.as;
        this.fingerprint.asName = res.asname;
        this.fingerprint.reverse = res.reverse;
        this.fingerprint.mobile = res.mobile;
        this.fingerprint.proxy = res.proxy;
        this.fingerprint.hosting = res.hosting;
        this.fingerprint.query = res.query;



        const newData = [

        ]
      },
      error: (error) => {
        console.error(error);
      }
    });
}

  public setupDataSource(res:any): any[] {
    return [
      {attribute: this.constants.USER_AGENT, value: this.fingerprint.userAgent},
      {attribute: this.constants.NAVIGATOR_TYPE, value: this.fingerprint.navigatorType},
      {attribute: this.constants.TIMEZONE, value: this.fingerprint.timeZone},
      {attribute: this.constants.LOCALE, value: this.fingerprint.locale},
      {attribute: this.constants.CALENDAR, value: this.fingerprint.calendar},
      {attribute: this.constants.NUMBERING_SYSTEM, value: this.fingerprint.numberingSystem},
      {attribute: this.constants.PLATFORM_TYPE, value: this.fingerprint.platformType},
      {attribute: this.constants.BATTERY, value: this.fingerprint.battery},
      {attribute: this.constants.HARDWARE_CONCURRENCY, value: this.fingerprint.hardwareConcurrency},
      {attribute: this.constants.WEBGL_RENDERER, value: this.fingerprint.webGLRenderer},
      {attribute: this.constants.WEBGL_VENDOR, value: this.fingerprint.webGLVendor},
      {attribute: this.constants.DEVICE_MEMORY, value: this.fingerprint.deviceMemory},
      {attribute: this.constants.GYROSCOPE, value: this.fingerprint.gyroscope},
      {attribute: this.constants.SCREEN, value: this.fingerprint.screen},
      {attribute: this.constants.IPADDRESS, value: this.fingerprint.ipAddress},
      {attribute: this.constants.COOKIES_ENABLED, value: this.fingerprint.cookiesEnabled},
      {attribute: this.constants.HOSTNAME, value: this.fingerprint.hostname},
      {attribute: this.constants.PROTOCOL, value: this.fingerprint.protocol},
      {attribute: this.constants.QUERY, value: res.query},
      {attribute: this.constants.STATUS, value: res.status},
      {attribute: this.constants.CONTINENT, value: res.continent},
      {attribute: this.constants.CONTINENT_CODE, value: res.continentCode},
      {attribute: this.constants.COUNTRY, value: res.country},
      {attribute: this.constants.COUNTRY_CODE, value: res.countryCode},
      {attribute: this.constants.REGION, value: res.region},
      {attribute: this.constants.REGION_NAME, value: res.regionName},
      {attribute: this.constants.CITY, value: res.city},
      {attribute: this.constants.DISTRICT, value: res.district},
      {attribute: this.constants.ASNAME, value: res.asname},
      {attribute: this.constants.AS, value: res.as},
      {attribute: this.constants.REVERSE, value: res.reverse},
      {attribute: this.constants.MOBILE, value: res.mobile},
      {attribute: this.constants.PROXY, value: res.proxy},
      {attribute: this.constants.OFFSET, value: res.offset},
      {attribute: this.constants.CURRENCY, value: res.currency},
      {attribute: this.constants.ISP, value: res.isp},
      {attribute: this.constants.ZIP, value: res.zip},
      {attribute: this.constants.HOSTING, value: res.hosting},
      {attribute: this.constants.LOCATION, value: this.fingerprint.coordinates},
    ];
  }

public getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.fingerprint.coordinates = position.coords.latitude + ', ' + position.coords.longitude;
      // Crear un nuevo elemento de datos
      const newData = { attribute: this.constants.LOCATION, value: this.fingerprint.coordinates };
      // Obtener los datos actuales del dataSource
      const currentData = this.dataSource.data;

      // Agregar el nuevo elemento a los datos actuales
      // const updatedData = [...currentData, newData];

      // Asignar los datos actualizados al dataSource
      this.dataSource.data = [...currentData, newData];
    });
  }
  //TODO
  public getMTU(){}

    // public getGPUDetails(): string {
    //     const canvas = document.createElement('canvas');
    //     const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    //
    //     if (!gl) {
    //         return 'WebGL is not available in this browser.';
    //     }
    //
    //     const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    //     if (!debugInfo) {
    //         return 'GPU information is not accessible.';
    //     }
    //
    //     const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    //     const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    //
    //     return `GPU: ${vendor} ${renderer}`;
    // }

  ngOnInit(): void {
    /*this.dataSource.push(this.javascriptAttributesList)*/
    this.getLocation()
    this.loadInitialData();
    this.getJavascriptAttributesData();
    this.getVideoCardInfo();
    this.hasCookiesEnabled();
    this.deviceMemory();
    this.screenSize();
    this.gyroscope();
    this.accelerometer();
    this.hardwareConcurrency();
    //this.saveFingerprint();
    this.getProtocol();
    this.getLocationForMap();
    this.setMapCenter();
    this.getGpu();
    this.getGpuInfo();

    this.setupDataSource2();
  }
}
