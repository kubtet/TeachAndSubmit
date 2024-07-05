import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Repository } from 'src/app/models/repository';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-my-repositories-teacher',
  templateUrl: './my-repositories-teacher.component.html',
  styleUrls: ['./my-repositories-teacher.component.scss'],
})
export class MyRepositoriesTeacherComponent implements OnInit {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected repositories: Repository[] = [];
  protected user: User | undefined;

  constructor(
    protected accountService: AccountService,
    private dialogService: DialogService,
    private repositoryService: RepositoryService,
    private router: Router
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

  public async remove(id: number) {
    const dialog = this.dialogService.open(ConfirmDialogComponent, {
      header: 'Remove Repository',
      width: '50%',
      data: { repositoryId: id },
    });

    dialog.onClose.subscribe(() => {
      this.isLoading.next(true);
      window.location.reload();
      this.isLoading.next(false);
    });
  }

  public async openRepo(id: number) {
    this.router.navigateByUrl('repository/' + id);
  }
}
