import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FingerprintModule } from './modules/fingerprint/fingerprint.module';
import { DownloadButtonModule } from "./modules/download-button/download-button.module";
import { SearchBarModule } from "./modules/search-bar/search-bar.module";
import {Constants} from "./constants/constants";
import { SaveButtonComponent } from './components/save-button/save-button.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SaveButtonModule} from "./modules/save-button/save-button.module";


@NgModule({
  declarations: [AppComponent, NavbarComponent, CheckboxComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FingerprintModule,
    FlexModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    MatButtonModule,
    DownloadButtonModule,
    SaveButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [Constants],
  bootstrap: [AppComponent]
})
export class AppModule {}
