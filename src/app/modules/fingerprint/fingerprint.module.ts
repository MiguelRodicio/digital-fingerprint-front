import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { FingerprintComponent} from "../../components/fingerprint/fingerprint.component";


@NgModule({
  declarations: [
    FingerprintComponent
  ],
  exports: [
    FingerprintComponent
  ],
  imports: [
    CommonModule,
    PlatformModule
  ]
})
export class FingerprintModule { }
