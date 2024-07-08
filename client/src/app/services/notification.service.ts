import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNotification } from '../models/addnotification';
import { HandleNotification } from '../models/handlenotification';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  public async getNotificationsForTeacher(id: number) {
    const notifications = await firstValueFrom(
      this.http.get<Notification[]>(
        environment.apiUrl + 'notifications/teacher/' + id
      )
    );
    return notifications;
  }

  public async addNotificationToJoinTheCourse(input: AddNotification) {
    await firstValueFrom(
      this.http.post<Notification>(
        environment.apiUrl + 'notifications/add',
        input
      )
    );
  }

  public async handleNotification(input: HandleNotification) {
    await firstValueFrom(
      this.http.post(environment.apiUrl + 'notifications/handle', input)
    );
  }
}
