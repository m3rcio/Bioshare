import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';

export const routes: Routes = [
{
    component: LoginComponent, path:'',
    
},
{
    component: MyprofileComponent, path:'myprofile'
}
    
];
