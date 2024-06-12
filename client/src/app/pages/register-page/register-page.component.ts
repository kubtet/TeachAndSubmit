import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  @Output() registerMode: EventEmitter<boolean> = new EventEmitter<boolean>(
    true
  );
  protected loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  protected roles: Role[] = [];

  protected formGroup?: FormGroup;
  constructor(private rolesService: RolesService) {}

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
    console.log(this.formGroup);
  }

  public login() {
    this.registerMode.emit(false);
  }
}
