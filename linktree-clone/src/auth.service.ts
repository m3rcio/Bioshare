import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './environments/environment';
import { OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  
private apiUrl='http://localhost:3000/api';
 private token=<string | null>('');

   http= inject(HttpClient)
   router=inject(Router);
  constructor() {
   }
   ngOnInit() {
    this.checkTokenExpiration();
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
        localStorage.setItem('token', this.token ?? '');
        this.router.navigate(['/myprofile']);
        console.log(this.token);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  checkTokenExpiration() {
    const token = this.getToken();
    if (!token) return;
  
    try {
      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
  
      if (expirationTime > currentTime) {
        setTimeout(() => {
          this.logout();
        }, expirationTime - currentTime);
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Erro ao verificar expiração do token:', error);
      this.logout();
    }
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
    if (typeof window !== 'undefined') {
      return this.token || localStorage.getItem('token');
    }else{

      return null;
    }
  }
}
