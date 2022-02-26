import { Component, OnInit } from '@angular/core';
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

  public navigatorType: boolean | any;
  constructor () {
  }


  public determineNavigatorType() {
    const usrAg = new Map([]);
    const usrAgent = navigator.userAgent;
    return this.navigatorType = (usrAgent.indexOf("Edg") > -1) ? "Microsoft Edge (Chromium)" :
     (usrAgent.indexOf("Firefox") > -1) ? "Mozilla Firefox" : (usrAgent.indexOf("Opera") > -1) ? "Opera" :
         (usrAgent.indexOf("Trident") > -1) ? "Microsoft Internet Explorer" :
           (usrAgent.indexOf("Edge") > -1) ? "Microsoft Edge (Legacy)" :
             (usrAgent.indexOf("Chrome") > -1) ? "Google Chrome" :
               (usrAgent.indexOf("Safari") > -1) ? "Safari" : "unknown"
  }



   /* if((navigator.userAgent.indexOf("Edg") > -1)){
      this.isIEOrEdge = true;
    }*/

  ngOnInit(): void {
    this.determineNavigatorType();
  }
}
