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
@Component({
    
  selector: 'app-publicpage',
  imports: [RouterModule,NgIf,NgFor],
  templateUrl: './publicPage.component.html',
  styleUrl: './publicPage.component.css',
  providers: [RouterLink ]
})
export class PublicPageComponent {
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,private socialLinkService: SocialLinkService
  ) {}
  
  user: User = {
    _id: '',
    nome: '',
    password: '',
    email: '',
    profile_picture: '',
    bio: ''
  };

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
    // this.socialLinks = links.filter(link => link.isActive);
  },
  error: (err) => {
    console.error('Erro ao carregar links sociais:', err);
  }
});
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

//   loadUserData(nome: string) {
//   if (!nome) return; 

//   this.userService.getUserByNome(nome).subscribe({
//     next: (res) => {
//       this.user = res;
//     },
//     error: (err) => {
//       console.error('Erro ao carregar usuário:', err);
//     }
//   });
// }
}