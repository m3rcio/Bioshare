import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {user} from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiBaseUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient) { }
  }