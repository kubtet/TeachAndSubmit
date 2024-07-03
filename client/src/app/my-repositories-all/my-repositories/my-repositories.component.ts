import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-repositories',
  templateUrl: './my-repositories.component.html',
  styleUrls: ['./my-repositories.component.scss'],
})
export class MyRepositoriesComponent implements OnInit {
  protected user: User | undefined;

  constructor(private accountService: AccountService) {}

  public async ngOnInit() {
    this.user = await firstValueFrom(this.accountService.currentUser$);
  }
}
