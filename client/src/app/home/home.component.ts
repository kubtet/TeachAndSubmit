import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected users: User[] = [];
  protected title: string = 'Teach&Submit';

  constructor(
    protected accountService: AccountService,
    private userService: UserService
  ) {}

  public async ngOnInit() {
    this.users = await this.userService.GetUsers();
  }
}
