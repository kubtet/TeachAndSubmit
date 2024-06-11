import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  protected baseUrl: string = environment.apiUrl;
  protected roles: Role[] = [];

  constructor(private http: HttpClient) {}

  public async getRoles() {
    if (this.roles.length === 0) {
      this.roles = await firstValueFrom(
        this.http.get<Role[]>(this.baseUrl + 'roles')
      );
    }
    return this.roles;
  }
}
