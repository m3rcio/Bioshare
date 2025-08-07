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
import Swal from 'sweetalert2';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @Input() sidebarOpen = false;
  constructor(private socialLinkService:SocialLinkService,
    private userService:UserService,
    private authService:AuthService){}
  ngOnInit(): void {
    this.carregarSocialLinks();
    this.carregarUsuarios();
  }

  ngAfterViewInit() {
    const el = document.getElementById('links-sociais');
    if (el) {
      new Sortable(el, {
        animation: 150,
        handle: '.drag-btn',
        ghostClass: 'dragging'
      });
    }
  }
  sociallinkDivShowing:boolean=true;
  socialLinks: SocialLinks[]=[];
  users: User[]=[];
  socialLink: SocialLinks = {
    title: ' ',
    Url: ' ',
    isActive: true,
    icon: '',
    user_id: ''
  };
  mostrarJanelaExclusao:boolean=false;
  debounceTimers: { [key: string]: any } = {};

  onFieldChange(socialLink:any) {
    const id=socialLink.socialLink_id;

    // Limpa o timer anterior se ainda estiver rodando
  if (this.debounceTimers[id]) {
    clearTimeout(this.debounceTimers[id]);
  }

   // Define um novo timer de 3 segundos
   this.debounceTimers[id] = setTimeout(() => {
    this.socialLinkService.atualizarSocialLink(id, socialLink)
      .subscribe({
        next: () => console.log(`SocialLink Atualizado!`),
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

  copiarLink(url:string | null){
    if(!url){
      return;
    }else{
        navigator.clipboard.writeText(url).then(() => {
    Swal.fire({
      title: "Copiado!",
      text: "O Link foi Copiado com sucesso.",
      icon: "success"
    });
  }).catch(err => {
    console.error('Erro ao copiar o link:', err);
  });
    }
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

  confirmarExclusao(){
    this.mostrarJanelaExclusao=true;
  }

  apagarSocialLink(id:string | undefined){

    Swal.fire({
  title: "Tem a certeza que quer excluir este item?",
  text: "Não será possível reverter esta ação!",
  // icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText: "Cancelar",
  confirmButtonText: "Sim"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Excluído!",
      text: "O Link foi Excluído com sucesso.",
      icon: "success"
    });

    this.socialLinkService.excluirSocialLink(id).subscribe(()=>{
      console.log("SocialLink excluído com sucesso!")
      this.carregarSocialLinks();
    })
  }
});
      
   
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
        this.carregarSocialLinks();
      },
      (error) => {
        let errorMessage = 'Ocorreu um erro ao tentar gravar o funcionário. Por favor, tente novamente mais tarde.';
        console.log(errorMessage);
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