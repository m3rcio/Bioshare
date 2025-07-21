import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule]
  })

export class AppRoutingModule { }