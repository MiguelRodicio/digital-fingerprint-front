import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FingerprintComponent} from "../../components/fingerprint/fingerprint.component";
import {MatChipsModule} from "@angular/material/chips";
import {FlexModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {AppModule} from "../../app.module";
import {DownloadButtonComponent} from "../../components/download-button/download-button.component";
import {DownloadButtonModule} from "../download-button/download-button.module";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [
    FingerprintComponent
  ],
  exports: [
    FingerprintComponent
  ],
    imports: [
        CommonModule,
        MatChipsModule,
        FlexModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        FormsModule,
        GoogleMapsModule,
        MatTooltipModule,
        MatIconModule,
        DownloadButtonModule,
        MatButtonModule,
        MatMenuModule
    ]
})
export class FingerprintModule { }
