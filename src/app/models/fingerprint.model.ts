import {MapMarker} from "@angular/google-maps";

export class Fingerprint{
  public id?: number;

}

export class HttpHeaderAttributes {

  public userAgent?: string;
  public accept?: string;
  public contentEncoding?: string;
  public contentLanguage?: string;
  public cookies?: string;
}

export class IpAddressAttributes {
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
  public isp?: string
}

export class JavascriptAttributes {

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
  public battery?: string;
  public screen?: Screen
  public query?: string;
  public status?: string;

  public timezone?: string;
  public offset?: number;
  public currency?: string;
  public isp?: string;
  public org?: string;
  public as?: string;
  public asName?: string;
  public reverse?: string;
  public mobile?: boolean;
  public proxy?: boolean;
  public hosting?: boolean;



}

export class LocationAttributes {
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
