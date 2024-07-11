import { Component, OnInit } from '@angular/core';
import { Repository } from '../models/repository';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RemoveEntity } from '../models/removeentity';
import { SolutionsListComponent } from '../solutions-list/solutions-list.component';
import { SolutionService } from '../services/solution.service';
import { AddSolution } from '../models/addsolution';

@Component({
  selector: 'app-repository-view',
  templateUrl: './repository-view.component.html',
  styleUrls: ['./repository-view.component.scss'],
})
export class RepositoryViewComponent implements OnInit {
  protected id: number | undefined; //repositoryId
  protected isLoading = new BehaviorSubject(false);
  protected repository: Repository | undefined;
  protected tasks: Task[] = [];
  protected uploadedFiles: any[] = [];
  protected user: User | undefined;

  constructor(
    private accountService: AccountService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute,
    private solutionService: SolutionService,
    private taskService: TaskService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
    });
    this.repository = await this.repositoryService.getRepository(this.id!);
    this.tasks = await this.taskService.GetTasksForRepository(this.id!);
    this.user = await firstValueFrom(this.accountService.currentUser$);
    this.isLoading.next(false);
  }

  public async onUpload(event: any, taskId: number) {
    this.isLoading.next(true);
    const input: AddSolution = new AddSolution();
    input.file = event.files[0];
    input.taskId = taskId;
    input.studentId = this.user.id;

    await this.solutionService.UploadFile(input);

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: 'Teacher will know that you submitted your solution.',
    });
    this.isLoading.next(false);
  }

  public async openCreateTaskDialog() {
    const ref = this.dialogService.open(CreateTaskComponent, {
      header: 'Create task',
      width: '50%',
      height: '70%',
      data: {
        repositoryId: this.id,
      },
    });

    ref.onClose.subscribe(() => {
      this.isLoading.next(true);
      window.location.reload();
      this.isLoading.next(false);
    });
  }

  public async removeTask(id: number) {
    const dialog = this.dialogService.open(ConfirmDialogComponent, {
      header: 'Remove task',
      width: '50%',
      data: { id: id, toBeRemoved: RemoveEntity.TASK },
    });

    dialog.onClose.subscribe(() => {
      this.isLoading.next(true);
      window.location.reload();
      this.isLoading.next(false);
    });
  }

  public async openSolutions(taskId: number) {
    this.dialogService.open(SolutionsListComponent, {
      header: 'List of students',
      width: '50%',
      data: { repositoryId: this.id, taskId: taskId },
    });
  }
}
