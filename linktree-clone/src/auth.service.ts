import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        console.log('Resposta do servidor:', response); 
        return response; 
      }), 
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro desconhecido';
        if (error.status === 404) {
          errorMessage = 'Usuário não encontrado!';
        } else if (error.status === 401) {
          errorMessage = 'Senha incorreta!';
        } else if (error.status === 500) {
          errorMessage = 'Erro no servidor!';
        }
        console.error('Erro no login:', errorMessage);
        return throwError(() => new Error(errorMessage));
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
