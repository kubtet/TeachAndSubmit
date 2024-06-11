import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  protected dateOfBirth: Date | undefined;
  protected roles: Role[] = [];

  constructor(private rolesService: RolesService) {}

  public async ngOnInit() {
    this.roles = await this.rolesService.getRoles();
  }

  protected login() {
    this.registerMode.emit(false);
  }
}
