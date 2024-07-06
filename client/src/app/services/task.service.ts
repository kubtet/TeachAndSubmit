import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { CreateTask } from '../models/createtask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  protected baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public async GetTasksForRepository(id: number): Promise<Task[]> {
    const tasks: Task[] = await firstValueFrom(
      this.http.get<Task[]>(this.baseUrl + 'tasks/repository/' + id)
    );

    return tasks;
  }

  public async GetNumberOfTasksForRepository(id: number) {
    const tasks: Task[] = await firstValueFrom(
      this.http.get<Task[]>(this.baseUrl + 'tasks/repository/' + id)
    );

    return tasks.length;
  }

  public async CreateTask(input: CreateTask) {
    const task = await firstValueFrom(
      this.http.post<Task>(environment.apiUrl + 'tasks/create', input)
    );

    return task;
  }

  public async RemoveTask(id: number) {
    await firstValueFrom(
      this.http.delete(environment.apiUrl + 'tasks/delete/' + id)
    );
  }
}
