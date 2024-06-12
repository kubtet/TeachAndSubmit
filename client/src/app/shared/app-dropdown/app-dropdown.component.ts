import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './app-dropdown.component.html',
  styleUrls: ['./app-dropdown.component.scss'],
})
export class AppDropdownComponent {
  /** FormControl for the dropdown */
  @Input() control?: FormControl;

  /** Label of the component. */
  @Input() label: string = '';

  /** An array of objects to display as the available options. */
  @Input() options: any[] = [];

  /** Name of the label field of an option. */
  @Input() optionLabel: string = '';

  /** Name of the value field of an option. */
  @Input() optionValue: string = '';

  /** Placeholder text to show when filter input is empty. */
  @Input() placeholder: string = '';

  /** Value picked from dropdown */
  private _value: number | undefined;
  @Input()
  get value(): number | undefined {
    return this._value;
  }
  set value(val: number | undefined) {
    this._value = val;
    this.valueChange.emit(this._value);
  }

  /** Event emitter for value change */
  @Output() valueChange = new EventEmitter<number>();

  /** Method to handle dropdown value changes */
  onValueChange(event: any) {
    this.value = event;
    if (this.control) {
      this.control.setValue(event);
    }
  }
}
