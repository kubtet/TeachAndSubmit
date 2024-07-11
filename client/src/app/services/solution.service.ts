import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSolution } from '../models/addsolution';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  public async UploadFile(input: AddSolution) {
    const formData: FormData = new FormData();
    formData.append('studentId', input.studentId.toString());
    formData.append('taskId', input.taskId.toString());
    formData.append('file', input.file);

    await firstValueFrom(
      this.http.post(environment.apiUrl + 'solutions/upload', formData)
    );
  }
}
