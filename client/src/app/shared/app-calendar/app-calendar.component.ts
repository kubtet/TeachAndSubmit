import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.scss'],
})
export class AppCalendarComponent {
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
}
