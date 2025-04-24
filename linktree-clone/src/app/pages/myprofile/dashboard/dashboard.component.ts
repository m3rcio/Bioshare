import { FormControl } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SocialLinks } from '../../../models/sociallinks.model';
import { SocialLinkService } from '../../../services/socialLink.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../../auth.service';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @Input() sidebarOpen = false;
  constructor(private socialLinkService:SocialLinkService,private userService:UserService,private authService:AuthService){}
  ngOnInit(): void {
    this.carregarSocialLinks();
    this.carregarUsuarios();
    // this.saveSubject.pipe(
    //   debounceTime(1000), 
    //   distinctUntilChanged()
    // ).subscribe(() => {
    //   this.carregarSocialLinks();
    // });
  }
  sociallinkDivShowing:boolean=true;

  socialLinks: SocialLinks[]=[];
  users: User[]=[];
  socialLink: SocialLinks = {
    title: '',
    Url: '',
    isActive: false,
    icon: '',
    user_id: ''
  };

  debounceTimers: { [key: string]: any } = {};

  onFieldChange(socialLink:any,field:string) {
    const id=socialLink.socialLink_id;

    // Limpa o timer anterior se ainda estiver rodando
  if (this.debounceTimers[id]) {
    clearTimeout(this.debounceTimers[id]);
  }

   // Define um novo timer de 3 segundos
   this.debounceTimers[id] = setTimeout(() => {
    this.socialLinkService.atualizarSocialLink(id, socialLink)
      .subscribe({
        next: () => console.log(`Atualizado: ${field} do link ${id}`),
        error: err => console.error('Erro ao salvar:', err)
      });
  }, 3000);

  }



  carregarSocialLinks(){
    let usuarioLogadoId=this.authService.getUserId();
    this.socialLinkService.getSocialLinksByUserId(usuarioLogadoId).subscribe((value)=>{
      this.socialLinks=value;
    },(error)=>{
      console.log('Erro ao carregar os Links: '+error)
    })
  }

  carregarUsuarios(){
    this.userService.getUsers().subscribe((value)=>{
      this.users=value;
    },(error)=>{
      console.log('Erro ao carregar os Links: '+error)
    })
  }

  salvarSocialLink(socialLink: SocialLinks) {
    if (socialLink.socialLink_id) { 
      this.socialLinkService.atualizarSocialLink(socialLink.socialLink_id,socialLink).subscribe(
        () => console.log('SocialLink atualizado com sucesso'),
        (error) => console.error('Erro ao atualizar', error)
      );
    } else {
      }
  }

  criarSocialLink() {
    this.socialLink.user_id=this.authService.getUserId();
    this.socialLinkService.criarSocialLink(this.socialLink,this.socialLink.user_id).subscribe(
      () => {
        // Limpa os campos do formulário após o sucesso
        this.socialLink = {
          title: '',
          Url: '',
          isActive: false,
          icon: '',
          user_id: ''
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
  teste(){

  }
}