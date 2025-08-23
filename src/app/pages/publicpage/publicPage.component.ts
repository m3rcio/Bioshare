import { Component,inject } from '@angular/core';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
    
  selector: 'app-publicpage',
  imports: [RouterModule],
  templateUrl: './publicPage.component.html',
  styleUrl: './publicPage.component.css',
  providers: [RouterLink ]
})
export class PublicPageComponent {
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  
  user: User = {
    user_id: '',
    nome: '',
    password: '',
    email: '',
    profile_picture: '',
    bio: ''
  };

  nome!:string;

    ngOnInit(): void {
    this.nome = this.route.snapshot.paramMap.get('nome') || '';

    if (this.nome.startsWith('@')) {
      this.nome = this.nome.substring(1); // tira o @
    }

    this.loadUserData(this.nome);
  }

  loadUserData(nome: string) {
    this.userService.getUserByNome(nome).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
      }
    });
  }
}