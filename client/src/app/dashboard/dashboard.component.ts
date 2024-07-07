import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { Repository } from '../models/repository';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SystemRole } from '../models/systemrole';
import { TaskService } from '../services/task.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { MessageService } from 'primeng/api';
import { AddNotification } from '../models/addnotification';
import { Teacher } from '../models/teacher';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected repositories: Repository[] = [];
  protected user: User | undefined;

  constructor(
    protected accountService: AccountService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private repositoryService: RepositoryService
  ) {}

  public async ngOnInit() {
    this.isLoading.next(true);
    this.user = await firstValueFrom(this.accountService.currentUser$);
    this.repositories = await this.repositoryService.getRepositoriesNotFromUser(this.user.id);
    if (this.repositories !== null) {
      await this.repositoryService.prepareRepos(this.repositories);
    }
    this.isLoading.next(false);
  }

  public async JoinCourse(repoId: number, teachers: Teacher[]) {
    this.messageService.add({
      severity: 'info',
      summary: 'Notification sent',
      detail: 'The teacher of this repository will consider your request',
    });

    this.isLoading.next(true);
    teachers.forEach((t) => {
      const input: AddNotification = {
        teacherId: t.id,
        studentId: this.user.id,
        repositoryId: repoId,
      };

      this.notificationService.addNotificationToJoinTheCourse(input);
    });
    this.isLoading.next(false);
  }
}
