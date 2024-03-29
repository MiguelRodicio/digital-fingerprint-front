import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DownloadButtonComponent} from "../../components/download-button/download-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";



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
    MatMenuModule
  ]
})
export class DownloadButtonModule { }
