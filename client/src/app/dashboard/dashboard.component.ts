import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Repository } from '../models/repository';
import { BehaviorSubject } from 'rxjs';
import { SystemRole } from '../models/systemrole';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected repositories: Repository[] = [];

  constructor(
    private repositoryService: RepositoryService,
    private taskService: TaskService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.repositories = await this.repositoryService.getRepositories();
    await this.prepareRepos();
    console.log(this.repositories);
    this.isLoading.next(false);
  }

  public async prepareRepos() {
    this.repositories.forEach(async (repo) => {
      repo.repoUsers = await this.repositoryService.getRepositoryUsers(
        repo.id!
      );
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
}
