export class Fingerprint{

  public id?: number;
  public httpHeaderAttributesList?: HttpHeaderAttributes [];
  public javascriptAttributesList: JavascriptAttributes[] | undefined;

}

export class HttpHeaderAttributes {

  public userAgent?: string;
  public accept?: string;
  public contentEncoding?: string;
  public contentLanguage?: string;
}

export class JavascriptAttributes {

  public navigatorType?: string;
  public locale?: string;
  public calendar?: string;
  public numberingSystem?: string;
  public connection?: any;
  public webRenderer?: any;
  public javascriptContentLanguage?: string;
  public adblock?: string;
  public keyboardLayout?: string;
  public videoFormats?: string;
  public cookiesEnabled?: boolean;
  public platformType?: string;
  public deviceMemory?: string;
  public timeZone?: string;
  public screenWidth?: string;
  public screenHeight?: string;
  public gyroscope?: string;
  public accelerometer?: string;
  public hardwareConcurrency?: string;
  public battery?: string;
}
