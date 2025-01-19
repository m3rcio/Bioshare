import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl='http://localhost:3000/api';
private tokenkey=''

   http= inject(HttpClient)
  constructor() { }

  login(userName:string, password:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, {userName,password}).pipe(
      tap((res:any)=>{
        if(res.token){
          localStorage.setItem(this.tokenkey, res.token)
        }
      })
    )
  }

  logout():void{
    localStorage.removeItem(this.tokenkey)
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem(this.tokenkey);
  }

  getToken():string | null {
    return localStorage.getItem(this.tokenkey);
  }
}
