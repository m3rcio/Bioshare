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
  
    criarProjeto(socialLink: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/projects/register`;
      return this.http.post<SocialLinks>(apiUrl, socialLink);
    }
   
    atualizarSocialLinks(SocialLinks: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/projects/${SocialLinks.socialLink_id}`;
      return this.http.put<SocialLinks>(apiUrl, SocialLinks);
    }
  
    excluirSocialLink(idSocialLink: number): Observable<void> {
      const apiUrl = `${this.apiBaseUrl}/projects/${idSocialLink}`;
      return this.http.delete<void>(apiUrl);
    }
  
    getSocialLinkss(): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/projects`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  
    getSocialLinksById(idSocialLinks: number): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/projects/${idSocialLinks}`;
      return this.http.get<SocialLinks>(apiUrl);
    }
  
    getSocialLinkssByPosicaoId(posicaoId: number): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/projects/posicao/${posicaoId}`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  }