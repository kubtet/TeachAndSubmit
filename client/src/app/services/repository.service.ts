import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from '../models/repository';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RepoUser } from '../models/repouser';
import { CreateRepository } from '../models/createrepository';
import { SystemRole } from '../models/systemrole';
import { TaskService } from './task.service';
import { GetStudents } from '../models/getstudents';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  protected repositories: Repository[] = [];

  constructor(private http: HttpClient, private taskService: TaskService) {}

  public async getRepositories() {
    if (this.repositories.length === 0) {
      this.repositories = await firstValueFrom(
        this.http.get<Repository[]>(environment.apiUrl + 'repositories')
      );
    }
    return this.repositories;
  }

  public async getRepository(id: number) {
    const repository = await firstValueFrom(
      this.http.get<Repository>(environment.apiUrl + 'repositories/' + id)
    );

    return repository;
  }

  public async getRepositoryUsers(repoId: number) {
    const repoUsers: RepoUser[] = await firstValueFrom(
      this.http.get<RepoUser[]>(
        environment.apiUrl + 'repositories/' + repoId + '/users'
      )
    );

    return repoUsers;
  }

  public async getRepositoryStudents(input: GetStudents) {
    const params = new HttpParams()
      .set('taskId', input.taskId)
      .set('repositoryId', input.repositoryId);

    const students: Student[] = await firstValueFrom(
      this.http.get<Student[]>(environment.apiUrl + 'repositories/students', {
        params,
      })
    );

    return students;
  }

  public async getRepositoriesForUser(userId: number) {
    const repositories: Repository[] = await firstValueFrom(
      this.http.get<Repository[]>(
        environment.apiUrl + 'repositories/' + userId + '/repos'
      )
    );

    return repositories;
  }

  public async getRepositoriesNotFromUser(userId: number) {
    const repositories: Repository[] = await firstValueFrom(
      this.http.get<Repository[]>(
        environment.apiUrl + 'repositories/' + userId + '/nonrepos'
      )
    );

    return repositories;
  }

  public async createRepository(input: CreateRepository) {
    const repo: Repository = await firstValueFrom(
      this.http.post<Repository>(
        environment.apiUrl + 'repositories/create',
        input
      )
    );

    return repo;
  }

  public async prepareRepos(repositories: Repository[]) {
    repositories.forEach(async (repo) => {
      repo.repoUsers = await this.getRepositoryUsers(repo.id!);
      repo.numberOfStudents = repo.repoUsers.filter(
        (u) => u.roleId === SystemRole.STUDENT
      ).length;
      repo.teachers = repo.repoUsers.filter(
        (u) => u.roleId === SystemRole.TEACHER
      );
      repo.numberOfTasks = await this.taskService.GetNumberOfTasksForRepository(
        repo.id!
      );
    });
  }

  public async removeRepository(id: number) {
    await firstValueFrom(
      this.http.delete(environment.apiUrl + 'repositories/delete/' + id)
    );
  }
}
