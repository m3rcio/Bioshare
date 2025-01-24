import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);  
  const router=inject( Router); 

  // if(authService.isLoggedIn()){
  //   return true;
  // }else{
  //   router.navigate(['/login']);
  //   return false;
  // }
  
  return true;
};
