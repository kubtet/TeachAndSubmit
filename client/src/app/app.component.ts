import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected users: User[] = [];
  title = 'Teach&Submit';

  constructor(
    protected accountService: AccountService,
    private userService: UserService
  ) {}

  public async ngOnInit() {
    this.users = await this.userService.GetUsers();
    this.setCurrentUser();
  }

  public setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
