import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './app-dropdown.component.html',
  styleUrls: ['./app-dropdown.component.scss'],
})
export class AppDropdownComponent {
  /** Label of the component. */
  @Input() label: string = '';

  /** An array of objects to display as the available options. */
  @Input() options: any[] = [];

  /** Name of the label field of an option. */
  @Input() optionLabel: string = '';

  /** Placeholder text to show when filter input is empty. */
  @Input() placeholder: string = '';
}
