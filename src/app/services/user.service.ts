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
       
        atualizarUser(User_id:string,Users: User): Observable<User> {
          const apiUrl = `${this.apiBaseUrl}/user/${User_id}`;
          return this.http.put<User>(apiUrl, Users);
        }
      
        excluirUser(idUser: string): Observable<void> {
          const apiUrl = `${this.apiBaseUrl}/user/${idUser}`;
          return this.http.delete<void>(apiUrl);
        }
      
        getUsers(): Observable<User[]> {
          const apiUrl = `${this.apiBaseUrl}/users`;
          return this.http.get<User[]>(apiUrl);
        }
      
        getUsersById(user_id: string): Observable<User> {
          const apiUrl = `${this.apiBaseUrl}/user/${user_id}`;
          return this.http.get<User>(apiUrl);
        }

         uploadProfilePicture(user_id: string, file: File) {
         const formData = new FormData();
         formData.append('profile_picture', file);
         return this.http.put<any>(`${this.apiBaseUrl}/user/${user_id}/profile-picture`, formData);
  }

        getProfilePicture(user_id: string) {
          return this.http.get<{ profile_picture: string }>(`${this.apiBaseUrl}/user/${user_id}/profile-picture`);
        }

        getUserByNome(nome:string){
          const apiUrl = `${this.apiBaseUrl}/user/nome/${nome}`;
          return this.http.get<User>(apiUrl);
        }
  }