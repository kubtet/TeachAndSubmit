import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [MessageService],
})
export class RegisterPageComponent implements OnInit {
  protected loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  protected roles: Role[] = [];

  protected formGroup?: FormGroup;
  constructor(
    private messageService: MessageService,
    private rolesService: RolesService,
    private router: Router
  ) {}

  public async ngOnInit() {
    this.loading.next(true);
    this.roles = await this.rolesService.getRoles();

    this.formGroup = new FormGroup({
      dateOfBirth: new FormControl<Date | undefined>(undefined),
      email: new FormControl<string | undefined>(undefined, [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl<string | undefined>(undefined, Validators.required),
      password: new FormControl<string | undefined>(
        undefined,
        Validators.required
      ),
      confirmedPassword: new FormControl<string | undefined>(
        undefined,
        Validators.required
      ),
      roleId: new FormControl<number | undefined>(
        undefined,
        Validators.required
      ),
      surname: new FormControl<string | undefined>(
        undefined,
        Validators.required
      ),
    });
    this.loading.next(false);
  }

  public async register() {
    const control = this.formGroup!.controls;
    if (control['password'].value !== control['confirmedPassword'].value) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match!',
      });
    }
  }

  public login() {
    this.router.navigateByUrl('login');
  }
}
