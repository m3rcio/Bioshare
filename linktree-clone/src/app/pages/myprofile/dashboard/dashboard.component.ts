import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SocialLinks } from '../../../models/sociallinks.model';
import { SocialLinkService } from '../../../services/socialLink.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Input() sidebarOpen = false;
  constructor(private socialLinkService:SocialLinkService){}

  sociallinkDivShowing:boolean=true;

  socialLinks: SocialLinks[]=[];

  socialLink: SocialLinks = {
    title: '',
    url: '',
    isActive: false,
    icon: '',
    user_id: 0
  };
  criarSocialLink() {
    this.socialLinkService.criarSocialLink(this.socialLink).subscribe(
      () => {
        // Remove a variável não utilizada
        // Limpa os campos do formulário após o sucesso
        this.socialLink = {
          title: '',
          url: '',
          isActive: false,
          icon: '',
          user_id: 0
        };

      },
      (error) => {
        // Em caso de erro, mostra um SweetAlert2 de erro
        let errorMessage = 'Ocorreu um erro ao tentar gravar o funcionário. Por favor, tente novamente mais tarde.';

        if (error.status === 400) {
          // Possível tratamento para erros específicos de validação do servidor.
          errorMessage = 'Verifique os campos do formulário e tente novamente.';
        }
        console.error(error);
      }
    );
  }
  
}