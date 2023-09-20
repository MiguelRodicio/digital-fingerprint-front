import {Component, OnInit} from '@angular/core';
import {FingerprintService} from "../../services/fingerprint.service";
import {Constants} from "../../constants/constants";
import {forkJoin, from, Observable, Subject, takeUntil} from "rxjs";
import {
  Fingerprint,
  HttpHeaderAttributes,
  IpAddressAttributes,
  JavascriptAttributes,
  LocationAttributes
} from "../../models/fingerprint.model";
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


  public javascriptAttributes: JavascriptAttributes = {
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
    coordinates: '',
     positionMap: {lat: 0, lng: 0},
     mapCenter:  { lat: 0, lng: 0 }
   }



  private fingerprint: Fingerprint = {
    id: 0
  }
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

    }
    public geolocationData: any;
    public javascriptAttributesData: any;



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
    if(this.javascriptAttributes?.navigatorType != undefined){
      this.javascriptAttributes.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
        (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
          (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
            (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
              (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
                (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown";
    }

    this.httpHeaderAttributes.userAgent = navigator.userAgent;
    this.javascriptAttributes.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.javascriptAttributes.locale = Intl.DateTimeFormat().resolvedOptions().locale;
    this.javascriptAttributes.calendar = Intl.DateTimeFormat().resolvedOptions().calendar;
    this.javascriptAttributes.numberingSystem = Intl.DateTimeFormat().resolvedOptions().numberingSystem;
    this.javascriptAttributes.platformType = window.navigator.platform;
  }

  public async saveFingerprint(){
    if(this.javascriptAttributes.adblock!=undefined){
      this.javascriptAttributes.adblock = await this.hasAdBlock();
    }
    const data = {
      id: this.fingerprint.id,
      navigatorType: this.javascriptAttributes.navigatorType,
      locale: this.javascriptAttributes.locale,
      calendar: this.javascriptAttributes.calendar,
      numberingSystem: this.javascriptAttributes.numberingSystem,
      connection: this.javascriptAttributes.connection,
      webRenderer: this.javascriptAttributes.webGLRenderer,
      adblock: this.javascriptAttributes.adblock,
      cookiesEnabled: this.javascriptAttributes.cookiesEnabled,
      platformType: this.javascriptAttributes.platformType,
      deviceMemory: this.javascriptAttributes.deviceMemory,
      timeZone: this.javascriptAttributes.timeZone,
      screenWidth: this.javascriptAttributes.screenWidth,
      screenHeight: this.javascriptAttributes.screenHeight,
      gyroscope: this.javascriptAttributes.gyroscope,
      accelerometer: this.javascriptAttributes.accelerometer,
      hardwareConcurrency: this.javascriptAttributes.hardwareConcurrency,
      screen: this.javascriptAttributes.screen
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

  public getGpu(){
    (async () => {
      const gpuTier = await getGPUTier();
      this.javascriptAttributes.webGLRenderer = gpuTier.gpu;

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
                this.javascriptAttributes.webGLRenderer = gpuTier.gpu;
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
    if(this.javascriptAttributes?.webGLRenderer != undefined){
      const extension = gl.getExtension('WEBGL_debug_renderer_info');
      if(extension) {
        this.javascriptAttributes.webGLVendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
        this.javascriptAttributes.webGLRenderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      }
    }
    return {
      vendor: this.javascriptAttributes.webGLVendor,
      renderer: this.javascriptAttributes.webGLRenderer,
    };
  }

  public getJavascriptAttributesData(){
    if(this.javascriptAttributes?.connection != undefined){
      return this.javascriptAttributes.connection = (navigator as any).connection;
    }
    return { error: 'Error'}
  }
  //TODO
  public async hasAdBlock(){
     detectAnyAdblocker().then((detected: any) => {
      if (detected) {
        this.javascriptAttributes.adblock = "Yes";
      }
      this.javascriptAttributes.adblock = "No";
    });
  }

  //TODO
  /* public getKeyboardLayout(){
    const keyboard = (navigator as any).keyboard;
    //return this.javascriptAttributesList.keyboardLayout = keyboard.getLayoutMap();
  }*/

  public hasCookiesEnabled() {
    if(this.javascriptAttributes?.cookiesEnabled != undefined) {
      return this.javascriptAttributes.cookiesEnabled = window.navigator.cookieEnabled.toString();
    } return { error: 'Error'}
  }

  public screenSize() {
    if((this.javascriptAttributes?.screenWidth != undefined) && (this.javascriptAttributes?.screenHeight != undefined)){
      this.javascriptAttributes.screenWidth = screen.width.toString();
      this.javascriptAttributes.screenHeight = screen.height.toString();
      return this.javascriptAttributes.screenWidth.concat("x" + this.javascriptAttributes.screenHeight);
    } return { error: 'Error'};
  }

  public gyroscope() {
    let gyroscope = 'No';
    if(this.javascriptAttributes?.gyroscope != undefined) {
      window.addEventListener("devicemotion", function(event){
        if(event.rotationRate?.alpha || event.rotationRate?.beta || event.rotationRate?.gamma)
          gyroscope = 'Yes';
      });
      return this.javascriptAttributes.gyroscope = gyroscope;
    } return { error : 'Error'};
  }

  public deviceMemory() {
    //const deviceMemory = window.navigator.deviceMemory;
    const deviceMemory = (window.navigator as any).deviceMemory;
    if(this.javascriptAttributes?.deviceMemory != undefined){
      return this.javascriptAttributes.deviceMemory = deviceMemory + "GB";
    } return { error: 'Error'};
  }

  public getScreen(){
    const screen = window.screen;
    if(this.javascriptAttributes.screen != undefined){
      return this.javascriptAttributes.screen = screen;
    }
    return { error: "Error"}
  }

  public accelerometer() {
    let accelerometer = 'No'
    if(this.javascriptAttributes?.accelerometer != undefined){
      window.addEventListener("devicemotion", function(event){
        if(event.acceleration?.x || event.acceleration?.y || event.acceleration?.z)
          accelerometer = 'Yes';
      });
      return this.javascriptAttributes.accelerometer = accelerometer;
    } return { error: 'Error'};
  }

  public hardwareConcurrency() {
    if(this.javascriptAttributes?.hardwareConcurrency != undefined){
      return this.javascriptAttributes.hardwareConcurrency = navigator.hardwareConcurrency;
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
            this.locationAttributes.positionMap = {
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
          this.locationAttributes.mapCenter = {
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
            this.javascriptAttributes.webGLRenderer = gpuTier.gpu;

            // Continúa con cualquier otra lógica que necesites después de obtener la ubicación y la GPU.
          },
          error: (error) => {
            console.error(error);
          }
        });
  }
  public getAPIAttributes(){
    this.fingerprintService.getGeolocationAttributes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next:(res) =>{
        //this.javascriptAttributesData = res;
          this.assignJavascriptAttributes(res);
          this.assignLocationAttributes(res);

          const newData = [
            {attribute: this.constants.QUERY, value: this.javascriptAttributes.query},
            {attribute: this.constants.STATUS, value: this.javascriptAttributes.status},
            {attribute: this.constants.CONTINENT, value: this.locationAttributes.continent},
            {attribute: this.constants.CONTINENT_CODE, value: this.locationAttributes.continentCode},
            {attribute: this.constants.COUNTRY, value: this.locationAttributes.country},
            {attribute: this.constants.COUNTRY_CODE, value: this.locationAttributes.countryCode},
            {attribute: this.constants.REGION, value: this.locationAttributes.region},
            {attribute: this.constants.REGION_NAME, value: this.locationAttributes.regionName},
            {attribute: this.constants.CITY, value: this.locationAttributes.city},
            {attribute: this.constants.DISTRICT, value: this.locationAttributes.district},
            {attribute: this.constants.ZIP, value: this.locationAttributes.zip},
            {attribute: this.constants.ASNAME, value: this.javascriptAttributes.asName},
            {attribute: this.constants.REVERSE, value: this.javascriptAttributes.reverse},
            {attribute: this.constants.MOBILE, value: this.javascriptAttributes.mobile},
            {attribute: this.constants.PROXY, value: this.javascriptAttributes.proxy},
            {attribute: this.constants.OFFSET, value: this.javascriptAttributes.offset},
            {attribute: this.constants.CURRENCY, value: this.javascriptAttributes.currency},
            {attribute: this.constants.ISP, value: this.javascriptAttributes.isp},
            {attribute: this.constants.ZIP, value: this.locationAttributes.zip},
            {attribute: this.constants.HOSTING, value: this.javascriptAttributes.hosting}
          ]
          this.dataSource.data = [...this.dataSource.data, ...newData];

        },
        error: (error) => {
        console.error(error);
      }
    })
  }

  public assignJavascriptAttributes(res: any){
    this.javascriptAttributes.query = res.query;
    this.javascriptAttributes.status = res.status;
    this.locationAttributes.continent = res.continent;
    this.locationAttributes.continentCode = res.continentCode;
    this.locationAttributes.country = res.country;
    this.locationAttributes.countryCode = res.countryCode;
    this.locationAttributes.region = res.region;
    this.locationAttributes.regionName = res.regionName;
    this.locationAttributes.city = res.city;
    this.locationAttributes.district = res.district;
    this.locationAttributes.zip = res.zip;
  }
  public assignLocationAttributes(res: any){
    this.javascriptAttributes.asName = res.asname;
    this.javascriptAttributes.reverse = res.reverse;
    this.javascriptAttributes.mobile = res.mobile;
    this.javascriptAttributes.proxy = res.proxy;
    this.javascriptAttributes.offset = res.offset;
    this.javascriptAttributes.currency = res.currency;
    this.javascriptAttributes.timezone = res.timezone;
    this.javascriptAttributes.isp = res.isp;
    this.javascriptAttributes.hosting = res.hosting;

  }
  public getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.locationAttributes.coordinates = position.coords.latitude + ', ' + position.coords.longitude;
      // Crear un nuevo elemento de datos
      const newData = { attribute: this.constants.LOCATION, value: this.locationAttributes.coordinates };
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
  private setupDataSource(): void {
    this.dataSource.data = [
      {attribute: this.constants.USER_AGENT, value: this.httpHeaderAttributes.userAgent},
      {attribute: this.constants.NAVIGATOR_TYPE, value: this.javascriptAttributes.navigatorType},
      {attribute: this.constants.TIMEZONE, value: this.javascriptAttributes.timeZone},
      {attribute: this.constants.LOCALE, value: this.javascriptAttributes.locale},
      {attribute: this.constants.CALENDAR, value: this.javascriptAttributes.calendar},
      {attribute: this.constants.NUMBERING_SYSTEM, value: this.javascriptAttributes.numberingSystem},
      {attribute: this.constants.PLATFORM_TYPE, value: this.javascriptAttributes.platformType},
      {attribute: this.constants.BATTERY, value: this.javascriptAttributes.battery},
      {attribute: this.constants.HARDWARE_CONCURRENCY, value: this.javascriptAttributes.hardwareConcurrency},
      {attribute: this.constants.WEBGL_RENDERER, value: this.javascriptAttributes.webGLRenderer},
      {attribute: this.constants.WEBGL_VENDOR, value: this.javascriptAttributes.webGLVendor},
      {attribute: this.constants.DEVICE_MEMORY, value: this.javascriptAttributes.deviceMemory},
      {attribute: this.constants.IPADDRESS, value: this.ipAddressAttributes.ipAddress},
      {attribute: this.constants.HOSTNAME, value: this.ipAddressAttributes.hostname},
      {attribute: this.constants.PROTOCOL, value: this.ipAddressAttributes.protocol}
    ];
  }

  ngOnInit(): void {
    /*this.dataSource.push(this.javascriptAttributesList)*/
    this.getLocation()
    this.loadInitialData();
    //navigator.geolocation.getCurrentPosition((position) => console.log(position))
    this.getJavascriptAttributesData();
    this.getVideoCardInfo();
    //console.log(this.getPosition())
    //console.log(window.navigator)
    //console.log(this.hasAdBlock());
    this.hasCookiesEnabled();
    //console.log(this.getLocationForMap())
    this.deviceMemory();
    this.screenSize();
    this.gyroscope();
    this.accelerometer();
    this.hardwareConcurrency();
    this.saveFingerprint();
    this.getProtocol();
    this.getLocationForMap();
    this.setMapCenter();
    this.getGpu();
    //his.getPosition();

    //console.log(this.getIpAddress());
    //console.log(this.ipAddressAttributes.ipAddress);
    //console.log(this.getHostname());
    //console.log(this.getJavascriptAttributesData())
    //console.log(this.fingerprintService.getAllFingerprints())
    //this.getKeyboardLayout();
    this.getGpuInfo();
    this.getAPIAttributes();
    console.log(this.getVideoCardInfo());

    this.setupDataSource();
  }
}
