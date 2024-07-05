import { Component, OnInit } from '@angular/core';
import { Repository } from '../models/repository';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-repository-view',
  templateUrl: './repository-view.component.html',
  styleUrls: ['./repository-view.component.scss'],
})
export class RepositoryViewComponent implements OnInit {
  protected id: number | undefined;
  protected isLoading = new BehaviorSubject(false);
  protected repository: Repository | undefined;
  protected tasks: Task[] = [];
  protected uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private repositoryService: RepositoryService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
    });
    this.repository = await this.repositoryService.getRepository(this.id!);
    this.tasks = await this.taskService.GetTasksForRepository(this.id!);
    this.isLoading.next(false);
    console.log(this.tasks);
  }

  public async onUpload(event: any, task: Task) {
    for (let file of event.files) {
      console.log(file);
      task.fileName = file.name;
      task.filePath = file.objectURL;
      task.file = file;
    }

    console.log(task);
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
    });
  }
}
