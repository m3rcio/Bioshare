import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiBaseUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient) { }

        criarUser(User: User): Observable<User> {
          const apiUrl = `${this.apiBaseUrl}/signup`;
          return this.http.post<User>(apiUrl, { User});
        }
       
        atualizarUser(User_id:number,Users: User): Observable<User> {
          const apiUrl = `${this.apiBaseUrl}/user/${User_id}`;
          return this.http.put<User>(apiUrl, Users);
        }
      
        excluirUser(idUser: number): Observable<void> {
          const apiUrl = `${this.apiBaseUrl}/user/${idUser}`;
          return this.http.delete<void>(apiUrl);
        }
      
        getUsers(): Observable<User[]> {
          const apiUrl = `${this.apiBaseUrl}/users`;
          return this.http.get<User[]>(apiUrl);
        }
      
        getUsersById(idUsers: number): Observable<User> {
          const apiUrl = `${this.apiBaseUrl}/user/${idUsers}`;
          return this.http.get<User>(apiUrl);
        }

  }