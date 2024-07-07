import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyRepositoriesComponent } from './my-repositories-all/my-repositories/my-repositories.component';
import { RepositoryViewComponent } from './repository-view/repository-view.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'myrepos',
    component: MyRepositoriesComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'repository/:id',
    component: RepositoryViewComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
