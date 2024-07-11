import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CreateTask } from '../models/createtask';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  protected formGroup: FormGroup;
  protected minDate: Date = new Date();

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private taskService: TaskService
  ) {}

  public async ngOnInit() {
    const today = new Date(Date.now());
    this.minDate.setDate(today.getDate());

    this.formGroup = new FormGroup({
      name: new FormControl<string>(undefined, [Validators.required]),
      description: new FormControl<string>(undefined),
      deadlineDate: new FormControl<Date>(undefined, [Validators.required]),
    });
  }

  public async createTask() {
    const control = this.formGroup.controls;
    const input: CreateTask = new CreateTask();
    input.name = control['name'].value;
    input.deadlineDate = control['deadlineDate'].value;
    input.description = control['description'].value;
    input.repositoryId = this.config.data.repositoryId;

    await this.taskService.CreateTask(input);

    this.ref.close();
  }
}
