import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private fingerprintDataSubject = new BehaviorSubject<any>(null)
  fingerprintData$ = this.fingerprintDataSubject.asObservable();
  data: any;

  constructor() { }

  public setFingerprintData(data: any) {
    this.fingerprintDataSubject.next(data)
  }

  public getData() {
    return this.data;
  }
}
