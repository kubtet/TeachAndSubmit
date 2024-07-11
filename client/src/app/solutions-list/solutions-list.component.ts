import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { RepositoryService } from '../services/repository.service';
import { BehaviorSubject } from 'rxjs';
import { GetStudents } from '../models/getstudents';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-solutions-list',
  templateUrl: './solutions-list.component.html',
  styleUrls: ['./solutions-list.component.scss'],
})
export class SolutionsListComponent implements OnInit {
  protected loading = new BehaviorSubject(false);
  protected students: Student[] = [];

  constructor(
    private config: DynamicDialogConfig,
    private repositoryService: RepositoryService,
    private solutionService: SolutionService
  ) {}

  public async ngOnInit() {
    await this.getStudents();
  }

  public async getStudents() {
    this.loading.next(true);
    const input: GetStudents = new GetStudents();
    input.repositoryId = this.config?.data?.repositoryId;
    input.taskId = this.config?.data?.taskId;
    this.students = await this.repositoryService.getRepositoryStudents(input);
    this.loading.next(false);
  }

  public async download(path: string) {
    this.loading.next(true);
    await this.solutionService.DownloadFile(path);
    this.loading.next(false);
  }
}
