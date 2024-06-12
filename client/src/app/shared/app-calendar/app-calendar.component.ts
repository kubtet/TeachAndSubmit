import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.scss'],
})
export class AppCalendarComponent {
  /** FormControl for the calendar */
  @Input() control?: FormControl;

  /** Value of the component */
  private _date?: Date;

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

  @Output() dateChange = new EventEmitter<Date>();

  /** Method to handle calendar value changes */
  onValueChange(event: any) {
    this.date = event;
    if (this.control) {
      this.control.setValue(event);
    }
  }
}
