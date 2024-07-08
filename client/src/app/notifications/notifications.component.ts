import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HandleNotification } from '../models/handlenotification';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  protected isLoading = new BehaviorSubject(false);
  protected notifications: Notification[] = [];
  protected user: User;

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.user = await firstValueFrom(this.accountService.currentUser$);
    await this.getNotifications();
    this.isLoading.next(false);
  }

  public async getNotifications() {
    this.notifications =
      await this.notificationService.getNotificationsForTeacher(this.user.id);
  }

  public async approve(notification: Notification, accepted: boolean) {
    this.isLoading.next(true);
    const input: HandleNotification = {
      notificationId: notification.id,
      repositoryId: notification.repositoryId,
      studentId: notification.studentId,
      accepted: accepted,
    };

    await this.notificationService.handleNotification(input);
    await this.getNotifications();
    this.isLoading.next(false);
  }
}
