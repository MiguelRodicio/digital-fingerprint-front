import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import {DownloadButtonModule} from "../download-button/download-button.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {AppModule} from "../../app.module";
import {SaveButtonModule} from "../save-button/save-button.module";

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, DownloadButtonModule, MatMenuModule, MatButtonModule, SaveButtonModule],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
