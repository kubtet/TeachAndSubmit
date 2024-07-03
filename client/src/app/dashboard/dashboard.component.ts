import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Repository } from '../models/repository';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SystemRole } from '../models/systemrole';
import { TaskService } from '../services/task.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected repositories: Repository[] = [];
  protected user: User | undefined;

  constructor(
    protected accountService: AccountService,
    private repositoryService: RepositoryService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.repositories = await this.repositoryService.getRepositories();
    if (this.repositories !== null) {
      await this.repositoryService.prepareRepos(this.repositories);
    }
    this.user = await firstValueFrom(this.accountService.currentUser$);
    this.isLoading.next(false);
  }
}
