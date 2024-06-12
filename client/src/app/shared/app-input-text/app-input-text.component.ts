import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './app-input-text.component.html',
  styleUrls: ['./app-input-text.component.scss'],
})
export class AppInputTextComponent implements OnChanges {
  /** FormControl for the input */
  @Input() control?: FormControl;

  /** Determines if the input is of type password */
  @Input() isPassword: boolean = false;

  /** Label of the input */
  @Input() label: string = '';

  /** Specifies if the value is required to submit the form */
  @Input() required: boolean = false;

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

  ngOnChanges() {
    if (this.control) {
      this.required = this.control.hasValidator(Validators.required);
    }
  }

  /** Method to handle input changes */
  onValueChange(event: any) {
    this.value = event;
    if (this.control) {
      this.required = this.control.hasValidator(Validators.required);
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
