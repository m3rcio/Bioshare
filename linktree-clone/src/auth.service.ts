import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './environments/environment';
import { OnInit } from '@angular/core';
import {jwtDecode} from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  
private apiUrl='http://localhost:3000/api';
 private token=<string>('');

   http= inject(HttpClient)
   router=inject(Router);
   private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  tokenkey:string='auth-token';
  constructor() {
   }
   ngOnInit() {
  }
 
  login(userName: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { userName, password }).subscribe(
      (res) => {
        if (res.token) {
          localStorage.setItem(this.tokenkey, res.token);
          this.router.navigate(['/myprofile']);
        } else {
          console.error('Token não recebido na resposta');
        }
      },
      (err) => {
        console.error('Erro no login:', err);
        alert('Credenciais inválidas'); 
      }
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenkey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenkey);
    this.router.navigate(['/login']);
  }
  


  // private storeJwtToken(jwt: string) {
  //   localStorage.setItem(this.tokenkey, jwt);
  // }

 



  // getCurrentAuthUser() {
  //   return this.http.get('http://www.example.com/api/auth/profile');
  // }



  // isTokenExpired() {
  //   const tokens = localStorage.getItem(this.tokenkey);
  //   if (!tokens) return true;
  //   const token = JSON.parse(tokens).access_token;
  //   const decoded = jwtDecode(token);
  //   if (!decoded.exp) return true;
  //   const expirationDate = decoded.exp * 1000;
  //   const now = new Date().getTime();

  //   return expirationDate < now;
  // }

  // refreshToken() {
  //   let tokens: any = localStorage.getItem(this.tokenkey);
  //   if (!tokens) return;
  //   tokens = JSON.parse(tokens);
  //   let refreshToken = tokens.refresh_token;
  //   return this.http
  //     .post<any>('https://www.example.com/api/auth/refresh-token', {
  //       refreshToken,
  //     })
  //     .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  // }

}
