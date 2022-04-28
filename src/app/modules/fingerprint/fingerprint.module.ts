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
    FormsModule
  ]
})
export class FingerprintModule { }
