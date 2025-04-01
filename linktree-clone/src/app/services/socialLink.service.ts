import { SocialLinks } from "../models/sociallinks.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SocialLinkService {
    private apiBaseUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient) { }
  
    criarSocialLink(socialLink: SocialLinks,user_id:number): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${user_id}`;
      return this.http.post<SocialLinks>(apiUrl, socialLink);
    }
   
    atualizarSocialLink(SocialLinks: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${SocialLinks.socialLink_id}`;
      return this.http.put<SocialLinks>(apiUrl, SocialLinks);
    }
  
    excluirSocialLink(idSocialLink: number): Observable<void> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${idSocialLink}`;
      return this.http.delete<void>(apiUrl);
    }
  
    getSocialLinks(): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/social-links`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  
    getSocialLinksById(idSocialLinks: number): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${idSocialLinks}`;
      return this.http.get<SocialLinks>(apiUrl);
    }
  
    getSocialLinksByUserId(user_id: number): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/social-links/user/${user_id}`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  }