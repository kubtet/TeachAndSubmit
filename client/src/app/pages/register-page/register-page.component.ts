import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  @Output() registerMode: EventEmitter<boolean> = new EventEmitter<boolean>(
    true
  );
  protected dateOfBirth: Date | undefined;

  login() {
    this.registerMode.emit(false);
  }
}
