import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent implements OnInit{

  fingerprintData: any;
  showMenu: boolean = false;
  iconPath = './icons/txt-icon.svg';

  @Input() data: any;
  @Output() downloadRequested = new EventEmitter<any>;
  @Output() downloadTypeSelected = new EventEmitter<string>();

  constructor(private sharedDataService: SharedDataService) { }
  selectDownloadType(type: string) {
    this.downloadTypeSelected.emit(type);
  }
  fileTypes = [
    {label: 'JSON', fileType: 'json'},
    {label: 'TXT', fileType: 'txt'}
  ]

  public toggleMenu(){
    this.showMenu = !this.showMenu;
  }
  public downloadDocument(fileType: string) {
    if(this.fingerprintData) {
      let dataToSave: any;
      let fileName: any;

      if (fileType === 'json') {
        dataToSave = JSON.stringify(this.fingerprintData, null, 2);
        fileName = 'fingerprint.json';
      } else if (fileType === 'txt') {
        const mappedData = Object.entries(this.fingerprintData).map(([key, value]) => `${key}: ${value}`);
        //const mappedData = this.fingerprintData.map((item: any) => `${item.attribute}: ${item.value}`);
        dataToSave = mappedData.join('\n');
        fileName = 'fingerprint.txt';
      }

      const blob = new Blob([dataToSave], { type: fileType === 'json' ? 'application/json' : 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;

      a.click();
      window.URL.revokeObjectURL(url);

      this.downloadRequested.emit();
    }

  }
  ngOnInit(): void {
    this.sharedDataService.fingerprintData$.subscribe(data => {
      this.fingerprintData = data;
    });
  }


}
