import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FingerprintModule} from "./modules/fingerprint/fingerprint.module";
import {FlexModule} from "@angular/flex-layout";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {Constants} from "./constants/constants";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FingerprintModule,
    FlexModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
