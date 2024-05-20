import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public async GetUsers() {
    return await firstValueFrom(
      this.http.get<User[]>('https://localhost:5001/api/users')
    );
  }
}
