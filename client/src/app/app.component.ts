import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected users: User[] = [];
  title = 'Teach&Submit';

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.users = await this.userService.GetUsers();
  }
}
