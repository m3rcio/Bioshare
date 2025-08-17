import { Component, OnInit } from '@angular/core';
import { SocialLinkService } from '../../services/socialLink.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SocialLinks } from '../../models/sociallinks.model';
import { AuthService } from '../../../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-preview-window',
  templateUrl: './previewWindow.component.html',
  styleUrls: ['./previewWindow.component.css'],
  imports: [NgFor]
})
export class PreviewWindowComponent implements OnInit {

  
  
  constructor(private socialLinkService:SocialLinkService,
    private userService:UserService,
    private authService:AuthService,public dialog: MatDialog){}
    
    ngOnInit(): void {
      this.carregarSocialLinks();
      this.carregarUsuarios();
    }
    
    users: User[]=[];
    socialLinks: SocialLinks[] = [];

  usuario: User=
{
    user_id:'',
    nome:'',
    password:'',
    email: '',
    profile_picture:''
}

  carregarSocialLinks(){
    let usuarioLogadoId=this.authService.getUserId();
    this.socialLinkService.getSocialLinksByUserId(usuarioLogadoId).subscribe({ next: (res) => {
         this.socialLinks = res.filter(link => link.isActive);
       },error: (err) => {
         console.error('Erro ao carregar links sociais:', err);
       }
    });
  }

  carregarUsuarios(){
    this.userService.getUsers().subscribe((value)=>{
      this.users=value;
    },(error)=>{
      console.log('Erro ao carregar os Links: '+error)
    })
  }

  abrirLink(url: string): void {
    window.open(`https://${url}`, '_blank');
  }
}