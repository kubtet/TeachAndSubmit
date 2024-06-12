import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  protected email: string = '';
  protected password: string = '';

  constructor(private accountService: AccountService, private router: Router) {}

  public async login() {
    const input: Login = {
      email: this.email,
      password: this.password,
    };

    await firstValueFrom(this.accountService.login(input));
  }

  public register() {
    this.router.navigateByUrl('register');
  }
}
