import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.scss'],
})
export class AppCalendarComponent implements OnChanges {
  /** FormControl for the calendar */
  @Input() control: FormControl;

  /** The maximum selectable date. */
  @Input() maxDate: Date;

  /** The minimum selectable date. */
  @Input() minDate: Date;

  /** Value of the component */
  private _date: Date;

  @Input()
  get date(): Date | undefined {
    return this._date;
  }

  set date(value: Date | undefined) {
    this._date = value;
    this.dateChange.emit(this._date);
  }

  /** Label of the component */
  @Input() label: string = '';

  /** Specifies if the value is required to submit the form */
  @Input() required: boolean = false;

  @Output() dateChange = new EventEmitter<Date>();

  ngOnChanges() {
    if (this.control) {
      this.required = this.control.hasValidator(Validators.required);
    }
  }

  /** Method to handle calendar value changes */
  onValueChange(event: any) {
    this.date = event;
    if (this.control) {
      this.control.setValue(event);
    }
  }
}
