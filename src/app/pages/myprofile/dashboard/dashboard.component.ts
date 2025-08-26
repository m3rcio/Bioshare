import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SocialLinks } from '../../../models/sociallinks.model';
import { SocialLinkService } from '../../../services/socialLink.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../../auth.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';
import Sortable from 'sortablejs';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { JanelaIconsComponent } from '../../../components/icons/janelaIcons.component';
import { PreviewWindowComponent } from '../../../components/previewWindow/previewWindow.component';
import { ProfilePictureComponent } from "../../../components/profilepicture/profilePicture.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatSlideToggleModule, PreviewWindowComponent, ProfilePictureComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @Input() sidebarOpen = false;

  constructor(private socialLinkService:SocialLinkService,
    private userService:UserService,
    private authService:AuthService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.loadLoggedUserData();
    this.carregarSocialLinks();
  }



  ngAfterViewInit() {
    // este código permite que cada link possa ser reorganizado de acordo a como foi arrastado 
  const el = document.getElementById('links-sociais');
  if (el) {
    new Sortable(el, {
      animation: 150,
      handle: '.drag-btn',
      ghostClass: 'dragging',
      onEnd: (event: any) => {
        // Índices antigo e novo
        const oldIndex = event.oldIndex;
        const newIndex = event.newIndex;

        if (oldIndex !== newIndex && oldIndex != null && newIndex != null) {
          // remove o item da posição antiga
          const movedItem = this.socialLinks.splice(oldIndex, 1)[0];
          // insere na nova posição
          this.socialLinks.splice(newIndex, 0, movedItem);
        }
      }
    });
  }
}

  link_icon:string="fas fa-image";
  link_color="#292929ff";
  sociallinkDivShowing:boolean=true;
  socialLinks: SocialLinks[]=[];
  users: User[]=[];
  usuarioLogado: any;
  publicUrlIsavailable!:boolean
  socialLink: SocialLinks = {
    title: ' ',
    Url: ' ',
    isActive: false,
    icon: 'fas fa-image',
    user_id: '',
    icon_color:'#1b1a1aff'
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

  abrirJanelaIcons(id:string | undefined): void {
    let dialogRef = this.dialog.open(JanelaIconsComponent, {
      width: '250px',
      data: { iconeAtual: this.link_icon, corAtual:this.link_color}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.link_icon = result.classe;
        this.link_color = result.cor;
        this.socialLinkService.atualizarSocialLinkIconAndColor(id,this.link_icon,this.link_color).subscribe({
          next:()=>{ this.carregarSocialLinks(); },error: (err) => {
             console.error('Erro ao atualizar ícone:', err);
           }
        })
      }
    });
  }


  onBioChange(usuario: User) {
  const id = this.authService.getUserId()

  // Limpa o timer anterior se ainda estiver rodando
  if (this.debounceTimers[id]) {
    clearTimeout(this.debounceTimers[id]);
  }

  // Define um novo timer de 3 segundos
  this.debounceTimers[id] = setTimeout(() => {
    this.userService.atualizarUser(id, usuario)
      .subscribe({
        next: () => console.log('Bio atualizada!'),
        error: err => console.error('Erro ao salvar bio:', err)
      });
  }, 3000);
}


  mostrarJanelaExclusao:boolean=false;
  debounceTimers: { [key: string]: any } = {};
// função para atualizar o texto do link depois de 3 segundos
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
      this.publicUrlIsavailable=this.socialLinks.some(link => link.isActive)
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


trocarEstadoLink(id:string | undefined, novoValor: boolean) {
  
  this.socialLinkService.atualizarSocialLinkisActive(id,novoValor )
  .subscribe({
      next: () => console.log("valor do link é: "+novoValor),
      error: err => console.error('Erro ao salvar:', err)
    });
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
          user_id: '',
          icon_color:'#1b1a1aff'
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