import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './environments/environment';
import { OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl='http://localhost:3000/api';
 private tokenkey=''
 private token:string='';

   http= inject(HttpClient)
   router=inject(Router);
  constructor() {
    this.tokenkey=environment.tokenkey;
   }




  login(userName: any, password: any) {
    return this.http.post<{ token: any }>(`${this.apiUrl}/login`, { userName, password }).pipe(
      catchError(error => {
        console.error('Login error:', error);
  
  
        if (error.error instanceof ProgressEvent) {
          console.error('Erro de rede ou do servidor');
        } else if (error.status === 404) {
          console.error('Rota não encontrada (404)');
        } else if (error.status === 500) {
          console.error('Erro de servidor (500)');
        }
  
        return throwError(error);
      })
    ).subscribe(
      (response) => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/myprofile']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(){
    this.token=''; // verify later for issues
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

  getToken():string | null {
    return this.token || localStorage.getItem('token');
  }
}
