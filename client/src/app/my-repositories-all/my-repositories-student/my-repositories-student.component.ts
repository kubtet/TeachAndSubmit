import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Repository } from 'src/app/models/repository';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-my-repositories-student',
  templateUrl: './my-repositories-student.component.html',
  styleUrls: ['./my-repositories-student.component.scss'],
})
export class MyRepositoriesStudentComponent implements OnInit {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected repositories: Repository[] = [];
  protected user: User | undefined;

  constructor(
    protected accountService: AccountService,
    private repositoryService: RepositoryService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.user = await firstValueFrom(this.accountService.currentUser$);
    this.repositories = await this.repositoryService.getRepositoriesForUser(
      this.user?.id!
    );
    if (this.repositories !== null) {
      await this.repositoryService.prepareRepos(this.repositories);
    }
    this.isLoading.next(false);
  }
}
