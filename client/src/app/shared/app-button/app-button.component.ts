import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  /** Label of the button */
  @Input() label: string = '';

  /** Type of the button */
  @Input() type: string = '';

  /** Event emitter on click */
  @Output() onClick = new EventEmitter(undefined);

  /** Method to handle button clicks */
  handleClick(event: Event) {
    this.onClick.emit(event);
  }
}
