import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AppDropdownComponent } from './shared/app-dropdown/app-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AppInputTextComponent } from './shared/app-input-text/app-input-text.component';
import { FormsModule } from '@angular/forms';
import { AppButtonComponent } from './shared/app-button/app-button.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AppDropdownComponent,
    LoginPageComponent,
    AppInputTextComponent,
    AppButtonComponent,
    RegisterPageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
