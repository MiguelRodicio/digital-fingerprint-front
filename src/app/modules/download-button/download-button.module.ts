import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DownloadButtonComponent} from "../../components/download-button/download-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    DownloadButtonComponent
  ],
  exports: [
    DownloadButtonComponent
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    NgOptimizedImage,
    MatIconModule
  ]
})
export class DownloadButtonModule { }
