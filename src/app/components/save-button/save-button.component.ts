import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent {
  @Output() saveData = new EventEmitter<void>()

  save() {
    this.saveData.emit()
  }
}
