import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    protected accountService: AccountService,
    private router: Router
  ) {}

  public async logout() {
    this.accountService.logout();
    this.router.navigateByUrl('login');
  }
}
