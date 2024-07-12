import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSolution } from '../models/addsolution';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { GetSolution } from '../models/getsolution';
import { Solution } from '../models/solution';
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

  public async DownloadFile(filePath: string) {
    const params = new HttpParams().set('filePath', filePath);

    this.http
      .get(environment.apiUrl + 'solutions/download', {
        params,
        responseType: 'blob',
      })
      .subscribe(
        (blob) => {
          const fileName = filePath.split('\\').pop();
          saveAs(blob, fileName);
        },
        (error) => {
          console.error('Download error', error);
        }
      );
  }

  public async GetStudentSolutionForTask(input: GetSolution) {
    const params = new HttpParams();
    params.set('studentId', input.studentId);
    params.set('taskId', input.taskId);

    const solution = await firstValueFrom(
      this.http.get<Solution>(environment.apiUrl + 'solutions/student', {
        params,
      })
    );

    return solution;
  }
}
