import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RepositoryService } from '../services/repository.service';
import { TaskService } from '../services/task.service';
import { RemoveEntity } from '../models/removeentity';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  protected id: number;
  protected entityToBeRemoved: RemoveEntity = RemoveEntity.NONE;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private repositoryService: RepositoryService,
    private taskService: TaskService
  ) {}

  public async ngOnInit() {
    this.id = this.config.data.id;
    this.entityToBeRemoved = this.config.data.toBeRemoved;
  }

  public async confirm() {
    switch (this.entityToBeRemoved) {
      case 1:
        await this.repositoryService.removeRepository(this.id);
        console.log(this.id);
        break;
      case 2:
        await this.taskService.RemoveTask(this.id);
        console.log(this.id);
        break;
      default:
        this.ref.close();
        break;
    }

    await this.taskService.RemoveTask(this.id);
    console.log(this.entityToBeRemoved);
    this.ref.close();
  }

  public async decline() {
    this.ref.close();
  }
}
