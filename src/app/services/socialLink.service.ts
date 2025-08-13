import { SocialLinks } from "../models/sociallinks.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../../auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class SocialLinkService {
    private apiBaseUrl = 'http://localhost:3000/api';
  
    constructor(private http: HttpClient, private authService: AuthService) { }
  
    criarSocialLink(socialLink: SocialLinks,user_id:string): Observable<SocialLinks> {
      user_id= this.authService.getUserId();
      const apiUrl = `${this.apiBaseUrl}/social-links/${user_id}`;
      return this.http.post<SocialLinks>(apiUrl, { socialLink, user_id: user_id });
    }
   
    atualizarSocialLink(SocialLink_id:string | undefined,SocialLinks: SocialLinks): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${SocialLink_id}`;
      return this.http.put<SocialLinks>(apiUrl, SocialLinks);
    }

    atualizarSocialLinkisActive(id: string | undefined, novoValor:boolean): Observable<any> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${id}/toggle`;
      return this.http.patch(apiUrl,{isActive:novoValor});
    }
 
    atualizarSocialLinkIconAndColor(id: string | undefined, novoValor:string,novaCor:string): Observable<any> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${id}/icon`;
      return this.http.patch(apiUrl,{icon:novoValor,icon_color:novaCor});
    }
  
    excluirSocialLink(idSocialLink: string | undefined): Observable<void> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${idSocialLink}`;
      return this.http.delete<void>(apiUrl);
    }
  
    getSocialLinks(): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/social-links`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  
    getSocialLinksById(idSocialLinks: string| undefined): Observable<SocialLinks> {
      const apiUrl = `${this.apiBaseUrl}/social-links/${idSocialLinks}`;
      return this.http.get<SocialLinks>(apiUrl);
    }
  
    getSocialLinksByUserId(user_id: string): Observable<SocialLinks[]> {
      const apiUrl = `${this.apiBaseUrl}/social-links/user/${user_id}`;
      return this.http.get<SocialLinks[]>(apiUrl);
    }
  }