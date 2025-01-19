import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
{
    component: LoginComponent, path:'',
    
},
{
    component: LoginComponent, path:'login',
    
},
{
    component: MyprofileComponent, path:'myprofile', canActivate: [authGuard],
  
},
{
     component: SignupComponent,path:'signup'
}
    
];
