import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import {} from '@angular/core';

import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class AuthModule {}
