import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from '../models/repository';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RepoUser } from '../models/repouser';
import { CreateRepository } from '../models/createrepository';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  protected repositories: Repository[] = [];

  constructor(private http: HttpClient) {}

  public async getRepositories() {
    if (this.repositories.length === 0) {
      this.repositories = await firstValueFrom(
        this.http.get<Repository[]>(environment.apiUrl + 'repositories')
      );
    }
    return this.repositories;
  }

  public async getRepositoryUsers(repoId: number) {
    const repoUsers: RepoUser[] = await firstValueFrom(
      this.http.get<RepoUser[]>(
        environment.apiUrl + 'repositories/' + repoId + '/users'
      )
    );

    return repoUsers;
  }

  public async createRepository(input: CreateRepository) {
    const repo: Repository = await firstValueFrom(
      this.http.post<Repository>(
        environment.apiUrl + 'repositories/create',
        input
      )
    );

    console.log(repo);
    return repo;
  }
}
