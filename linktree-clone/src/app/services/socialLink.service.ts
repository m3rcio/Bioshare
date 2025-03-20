import { SocialLinks } from "../models/sociallinks.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProjetoService {
    private apiBaseUrl = 'http://localhost:3000';
  
    constructor(private http: HttpClient) { }
  
    criarSocialLink(socialLink: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks/register`;
      return this.http.post<SocialLinks>(apiUrl, socialLink);
    }
   
    atualizarSocialLink(SocialLinks: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks/${SocialLinks.socialLink_id}`;
      return this.http.put<SocialLinks>(apiUrl, SocialLinks);
    }
  
    excluirSocialLink(idSocialLink: number): Observable<void> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks/${idSocialLink}`;
      return this.http.delete<void>(apiUrl);
    }
  
    getSocialLinks(): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  
    getSocialLinksById(idSocialLinks: number): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks/${idSocialLinks}`;
      return this.http.get<SocialLinks>(apiUrl);
    }
  
    getSocialLinksByUserId(posicaoId: number): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/socialLinks/user/${posicaoId}`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  }