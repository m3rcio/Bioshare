import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl='http://localhost:3000/api';
 private tokenkey=''

   http= inject(HttpClient)
  constructor() {
    this.tokenkey=environment.tokenkey;
   }

   login(userName: any, password: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, password }).pipe(
      map((response: any) => {
        if (response.success) {
          return alert('success!');
        } else {
          throw new Error(response.error || 'Falha de autenticação');
        }
      }),
      catchError((error) => {
        if (error instanceof SyntaxError) {
          console.error('Response is not valid JSON:', error.message);
        } else {
          console.error('Erro de login:', error);
        }
        return throwError(() => error);
      })
    );
  }

  logout():void{
    localStorage.removeItem(this.tokenkey)
  }

  // isLoggedIn():boolean{
  //   return !!localStorage.getItem(this.tokenkey);
  // }

  getToken():string | null {
    return localStorage.getItem(this.tokenkey);
  }
}
