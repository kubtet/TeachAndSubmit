import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './app-input-text.component.html',
  styleUrls: ['./app-input-text.component.scss'],
})
export class AppInputTextComponent {
  /** Determines if the input is of type password */
  @Input() isPassword: boolean = false;

  /** Label of the input */
  @Input() label: string = '';

  /** Value of the input */
  private _value: string = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(val: string) {
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
