import { Component,inject } from '@angular/core';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { SocialLinkService } from '../../services/socialLink.service';
import { SocialLinks } from '../../models/sociallinks.model';
import { AuthService } from '../../../auth.service';
@Component({
    
  selector: 'app-publicpage',
  imports: [RouterModule,NgFor],
  templateUrl: './publicPage.component.html',
  styleUrl: './publicPage.component.css',
  providers: [RouterLink ]
})
export class PublicPageComponent {
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,private socialLinkService: SocialLinkService,private authService:AuthService
  ) {}
  
  user: User = {
    _id: '',
    nome: '',
    password: '',
    email: '',
    profile_picture: '',
    bio: ''
  };
  currentPicture!: string;
  nome!:string;
  socialLinks: SocialLinks[] = [];
  userDaRotaId:string='';
    ngOnInit(): void {
      
  this.route.paramMap.subscribe(params => {
    this.nome = params.get('nome') || '';
    if (this.nome.startsWith('@')) {
      this.nome = this.nome.substring(1);
    }

     if (!this.nome) return; 

  this.userService.getUserByNome(this.nome).subscribe({
  next: (user) => {this.user=user
    this.userDaRotaId=user._id
    this.carregarSocialLinks();
  },
  error: (err) => {
    console.error('Erro ao carregar links sociais:', err);
  }
});
  });
  let usuarioLogadoId=this.authService.getUserId();
  if (!usuarioLogadoId) {
  console.error("UserId está vazio, não posso buscar a foto de perfil!");
  return;
}
this.userService.getProfilePicture(usuarioLogadoId).subscribe(res => {
  this.currentPicture = `${res.profile_picture}`; 
});
}

   carregarSocialLinks() {
    if (!this.userDaRotaId) return;
  this.socialLinkService.getSocialLinksByUserId(this.userDaRotaId).subscribe({
    next: (res) => {
      this.socialLinks = res.filter((link) => link.isActive);
    },
    error: (err) => {
      console.error('Erro ao carregar links sociais:', err);
    }
  });
}

abrirLink(url: string): void {
    window.open(`https://${url}`, '_blank');
  }
}