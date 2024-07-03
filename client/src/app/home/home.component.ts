import { Component } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateRepositoryComponent } from '../create-repository/create-repository.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected users: User[] = [];
  protected title: string = 'Teach&Submit';

  constructor(
    protected accountService: AccountService,
    private dialogService: DialogService
  ) {}

  public async openCreationDialog() {
    const ref = this.dialogService.open(CreateRepositoryComponent, {
      header: 'Create Repository',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe(() => {
      window.location.reload();
    });
  }
}
