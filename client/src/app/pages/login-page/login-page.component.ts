import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService],
})
export class LoginPageComponent implements OnInit {
  protected formGroup?: FormGroup;
  protected isLoading = new BehaviorSubject(false);

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl<string | undefined>(undefined, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | undefined>(
        undefined,
        Validators.required
      ),
    });
  }

  public async login() {
    this.isLoading.next(true);
    const input: Login = {
      email: this.formGroup?.controls['email'].value,
      password: this.formGroup?.controls['password'].value,
    };

    try {
      await firstValueFrom(this.accountService.login(input));
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Login or password is incorrect!',
      });
    }

    this.isLoading.next(false);
  }

  public register() {
    this.router.navigateByUrl('register');
  }
}
