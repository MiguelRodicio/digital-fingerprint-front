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
  public webRenderer?: any;
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
}

export class LocationAttributes {
  public coordinates?: string;
}
