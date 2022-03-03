import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FingerprintComponent} from "../../components/fingerprint/fingerprint.component";
import {MatChipsModule} from "@angular/material/chips";
import {FlexModule} from "@angular/flex-layout";



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
    FlexModule
  ]
})
export class FingerprintModule { }
