import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  protected notifications: Notification[] = [];
  protected user: User;

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  public async ngOnInit() {
    this.user = await firstValueFrom(this.accountService.currentUser$);
    this.notifications =
      await this.notificationService.getNotificationsForTeacher(this.user.id);

    console.log(this.notifications);
  }
}
