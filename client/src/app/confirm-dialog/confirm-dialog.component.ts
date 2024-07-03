import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  protected id: number | undefined;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private repositoryService: RepositoryService
  ) {}

  public async ngOnInit() {
    this.id = this.config.data.repositoryId;
  }

  public async confirm() {
    await this.repositoryService.removeRepository(this.id!);
    this.ref.close();
  }

  public async decline() {
    this.ref.close();
  }
}
