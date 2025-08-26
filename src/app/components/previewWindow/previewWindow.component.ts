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
  
  
  currentPicture!: string;
  
  constructor(private socialLinkService:SocialLinkService,
    private userService:UserService,
    private authService:AuthService,public dialog: MatDialog){}
    

    ngOnInit(): void {
      this.carregarSocialLinks();
      this.carregarUsuarios();
        let usuarioLogadoId=this.authService.getUserId();
this.userService.getProfilePicture(usuarioLogadoId).subscribe(res => {
  this.currentPicture = `${res.profile_picture}`; 
});

  this.loadLoggedUserData();
    }
    
    users: User[]=[];
    socialLinks: SocialLinks[] = [];

  
  usuarioLogado: User = {
  _id: '',
  nome: '',
  password: '',
  email: '',
  profile_picture: '',
  bio: ''
};

loadLoggedUserData(){
    const user_id=this.authService.getUserId()
    this.userService.getUsersById(user_id).subscribe({
      next:(user: User)=>{
        this.usuarioLogado=user;
      },error:(err)=>{
        console.error(err);
      }
    })
  }

  carregarSocialLinks(){
    let usuarioLogadoId=this.authService.getUserId();
    this.socialLinkService.getSocialLinksByUserId(usuarioLogadoId).subscribe({ next: (res) => {
         this.socialLinks = res.filter(link => link.isActive);
       },error: (err) => {
         const msg = err.error?.message || 'Erro ao carregar links sociais.';
         console.log(msg);
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