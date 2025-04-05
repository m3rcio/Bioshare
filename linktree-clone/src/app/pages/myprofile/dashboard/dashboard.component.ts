import { FormControl } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SocialLinks } from '../../../models/sociallinks.model';
import { SocialLinkService } from '../../../services/socialLink.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
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
    Url: '',
    isActive: false,
    icon: '',
    user_id: 0
  };

  carregarSocialLinks(){
  }
  criarSocialLink() {
    this.socialLinkService.criarSocialLink(this.socialLink,this.socialLink.user_id).subscribe(
      () => {
        // Limpa os campos do formulário após o sucesso
        this.socialLink = {
          title: '',
          Url: '',
          isActive: false,
          icon: '',
          user_id: 0
        };
        
      },
      (error) => {
        let errorMessage = 'Ocorreu um erro ao tentar gravar o funcionário. Por favor, tente novamente mais tarde.';

        if (error.status === 400) {
          errorMessage = 'Verifique os campos do formulário e tente novamente.';
        }
        console.error(error);
      }
    );
  }
  
}