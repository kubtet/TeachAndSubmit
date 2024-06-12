import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './app-input-text.component.html',
  styleUrls: ['./app-input-text.component.scss'],
})
export class AppInputTextComponent {
  /** FormControl for the input */
  @Input() control?: FormControl;

  /** Determines if the input is of type password */
  @Input() isPassword: boolean = false;

  /** Label of the input */
  @Input() label: string = '';

  /** Value of the input */
  private _value: string | undefined = '';
  @Input()
  get value(): string | undefined {
    return this._value;
  }
  set value(val: string | undefined) {
    this._value = val;
    this.valueChange.emit(this._value);
  }

  /** Event emitter for value change */
  @Output() valueChange = new EventEmitter<string>();

  /** Flag to toggle password visibility */
  protected showPassword: boolean = false;

  /** Method to handle input changes */
  onValueChange(event: any) {
    this.value = event;
    if (this.control) {
      this.control.setValue(event);
    }
  }

  /** Toggle password visibility */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /** Get the input type */
  getInputType() {
    return this.isPassword ? (this.showPassword ? 'text' : 'password') : 'text';
  }
}
