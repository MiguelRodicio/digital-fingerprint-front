import {MapMarker} from "@angular/google-maps";

export class Fingerprint{
  public id?: number;
  public userAgent?: string;
  public accept?: string;
  public contentEncoding?: string;
  public contentLanguage?: string;
  public cookies?: string;
  public ipAddress?: string;
  public ipv6Address?: string;
  public hostname?: string;
  public protocol?: string;
  public ipAddressLocation?: string;
  public localIpAddress?: string;
  public publicIpAddress?: string;
  public dnsServers?: string;
  //public mtu?: number;
  //public hops?: number;
  public ipCountry?: string;
  public ipStateRegion?: string;
  public ipCity?: string;
  public navigatorType?: string;
  public locale?: string;
  public calendar?: string;
  public numberingSystem?: string;
  public connection?: any;
  public webGLRenderer?: any;
  public webGLVendor?: any;
  public javascriptContentLanguage?: string;
  public adblock?: any;
  public keyboardLayout?: string;
  public videoFormats?: string;
  public cookiesEnabled?: string;
  public platformType?: string;
  public deviceMemory?: string;
  public timeZone?: string;
  public screenWidth?: string;
  public screenHeight?: string;
  public gyroscope?: string;
  public accelerometer?: string;
  public hardwareConcurrency?: number;
  public battery?: any;
  public screen?: string
  public query?: string;
  public status?: string;

  public timezone?: string;
  public offset?: number;
  public currency?: string;

  public org?: string;
  public as?: string;
  public asName?: string;
  public reverse?: string;
  public mobile?: boolean;
  public proxy?: boolean;
  public hosting?: boolean;
  public isp?: string;
  public continent?: string;
  public continentCode?: string;
  public country?: string;
  public countryCode?: string;
  public region?: string;
  public regionName?: string;
  public city?: string;
  public district?: string;
  public zip?: string;
  public coordinates?: string;
  public latitude?: number;
  public longitude?: number;
  public positionMap?: google.maps.LatLngLiteral
  public mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  //public center: google.maps.LatLngLiteral;

}

export interface BatteryInfo {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
}
