import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent {

  @Input() data: any;
  @Output() downloadRequested = new EventEmitter<any>;
  @Output() downloadTypeSelected = new EventEmitter<string>();
  selectDownloadType(type: string) {
    this.downloadTypeSelected.emit(type);
  }
  fileTypes = [
    {label: 'JSON', fileType: 'json'},
    {label: 'TXT', fileType: 'txt'}
  ]

  public downloadDocument(fileType: string) {
    if(this.data) {
      let dataToSave: any;
      let fileName: any;

      if (fileType === 'json') {
        dataToSave = JSON.stringify(this.data.data, null, 2);
        fileName = 'fingerprint.json';
      } else if (fileType === 'txt') {
        const mappedData = this.data.data.map((item: any) => `${item.attribute}: ${item.value}`);
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


}
