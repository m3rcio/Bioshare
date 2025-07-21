import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, inject, Injectable,PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import {jwtDecode} from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private isBrowser!: boolean;
private apiUrl='http://localhost:3000/api';
  timeoutId:any=null;
   http= inject(HttpClient)
   router=inject(Router);
  tokenkey:string='auth-token';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
   }
   ngOnInit() {
  }
 
  login(nome: string, password: string) {
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, { nome, password }).subscribe(
      (res) => {
        if (res && res.token) {
          localStorage.setItem('auth-token', res.token);
          this.router.navigate(['/myprofile']);
          this.startTokenExpirationCheck();
        } else {
          console.error('Token não recebido na resposta');
        }
      },
      (err) => {
        console.error('Erro no login:', err);
        alert('Credenciais inválidas ou erro no servidor');
      }
    );
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('auth-token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if(this.isBrowser){
      const token=this.getToken();
      if(token){
        const decodedToken: any = jwtDecode(token);
        const currentTime= Date.now() / 1000;
        return decodedToken.exp > currentTime;
      }
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth-token');
      this.router.navigate(['/login']);
    }
  }
  
  private startTokenExpirationCheck(): void {
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; 
        const currentTime = Date.now();

        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration > 0) {
          this.clearTokenExpirationCheck();

          this.timeoutId = setTimeout(() => {
            this.logout(); 
            alert('Sua sessão expirou. Por favor, faça login novamente.');
          }, timeUntilExpiration);
        } else {
          this.logout(); 
        }
      }
    }
  }

  private clearTokenExpirationCheck(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); 
      this.timeoutId = null; 
    }
  }

  getUserId(): string {
    const token = this.getToken();
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken._id;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return '';
      }
    }
  
    return '';
  }


}
