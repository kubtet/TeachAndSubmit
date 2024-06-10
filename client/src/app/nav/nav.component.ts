import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonIconPosition } from '../shared/models/ButtonIconPosition';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  protected iconPosition: ButtonIconPosition = ButtonIconPosition.RIGHT;
  protected items: MenuItem[] = [];

  constructor(public accountService: AccountService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
      },
      {
        label: 'Log out',
        command: () => {
          this.accountService.logout();
        },
      },
    ];
  }
}
