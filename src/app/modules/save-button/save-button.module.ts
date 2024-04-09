import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DownloadButtonComponent} from "../../components/download-button/download-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {SaveButtonComponent} from "../../components/save-button/save-button.component";



@NgModule({
  declarations: [
    SaveButtonComponent
  ],
  exports: [
    SaveButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    NgOptimizedImage,
    MatIconModule
  ]
})
export class SaveButtonModule { }
