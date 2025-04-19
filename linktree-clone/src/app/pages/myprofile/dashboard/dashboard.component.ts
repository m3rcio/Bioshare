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

    this.saveSubject.pipe(
      debounceTime(1000), 
      distinctUntilChanged()
    ).subscribe(() => {
      this.carregarSocialLinks();
    });
  }
  sociallinkDivShowing:boolean=true;

  socialLinks: SocialLinks[]=[];
  private saveSubject = new Subject<void>();
  socialLink: SocialLinks = {
    title: '',
    Url: '',
    isActive: false,
    icon: '',
    user_id: ''
  };

  onFieldChange() {
    this.saveSubject.next();
  }

  carregarSocialLinks(){
    this.socialLinkService.getSocialLinks().subscribe((value)=>{
      this.socialLinks=value;
      (error: any)=>console.log('⚠ erro ao carregar Links!'+error)
    });
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
    return this.authService.getUserId();
  }
}