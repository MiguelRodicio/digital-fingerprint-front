import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() id: string | undefined;
  @Input() disabled: boolean | undefined;

  @Input() value: boolean | undefined;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(){
    this.valueChange.emit(!this.value);
  }

}
