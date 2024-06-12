import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
})
export class AppLoadingComponent {
  /** Flag saying if the component should be visible */
  @Input() isLoading: boolean = false;

  /** Flag saying if the component should overlay the rest of the page */
  @Input() isOverlay: boolean = false;
}
