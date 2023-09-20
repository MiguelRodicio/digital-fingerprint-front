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
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
//import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FingerprintModule,
    FlexModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
