import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonIconPosition } from '../models/ButtonIconPosition';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  /** When present, it specifies that the component should be disabled. */
  @Input() disabled: boolean = false;

  /** Name of the icon. */
  @Input() icon: string = '';

  /** Position of the icon, valid values are "left" and "right". */
  @Input() iconPos: ButtonIconPosition = ButtonIconPosition.LEFT;

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
