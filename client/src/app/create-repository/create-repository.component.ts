import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateRepository } from '../models/createrepository';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-repository',
  templateUrl: './create-repository.component.html',
  styleUrls: ['./create-repository.component.scss'],
})
export class CreateRepositoryComponent implements OnInit {
  protected loading = new BehaviorSubject(false);
  protected subject = new FormControl<string | undefined>(undefined, [
    Validators.required,
  ]);
  protected user: User | undefined;

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private repositoryService: RepositoryService
  ) {}

  public async ngOnInit() {
    this.user = await firstValueFrom(this.accountService.currentUser$);
  }

  public async createRepository() {
    const input: CreateRepository = new CreateRepository();
    input.creatorId = this.user?.id;
    input.creatorRoleId = this.user?.roleId;
    input.subject = this.subject?.value!;

    this.loading.next(true);
    await this.repositoryService.createRepository(input);
    this.loading.next(false);

    this.ref.close();
  }
}
