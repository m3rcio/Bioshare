import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profilePicture.component.html',
  styleUrls: ['./profilePicture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  currentPicture!: string;
  selectedFile: File | null=null;
  previewUrl: any = null;

  constructor(private userService: UserService, private sanitizer: DomSanitizer,private authService: AuthService) {}


  ngOnInit() {
    let usuarioLogadoId=this.authService.getUserId();
this.userService.getProfilePicture(usuarioLogadoId).subscribe(res => {
  this.currentPicture = `${res.profile_picture}`; 
});

}


  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  if (!this.selectedFile) return;

  const reader = new FileReader();
  reader.onload = e => {
    this.previewUrl = reader.result as string;

    // Abre SweetAlert para confirmar
    Swal.fire({
      title: 'Usar esta foto de perfil?',
      imageUrl: this.previewUrl,
      imageAlt: 'Preview da foto',
      showCancelButton: true,
      imageWidth: 200,
      customClass: {
      image: 'swal2-profile-img'},
      confirmButtonText: 'Sim, salvar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.upload(); 
      } else {
        this.selectedFile = null;
        this.previewUrl = null;
      }
    });
  };

  reader.readAsDataURL(this.selectedFile);
}


  upload() {
  if (!this.selectedFile) return;
  let usuarioLogadoId = this.authService.getUserId();

  this.userService.uploadProfilePicture(usuarioLogadoId, this.selectedFile)
    .subscribe(res => {
      this.currentPicture = `http://localhost:3000${res.profile_picture}`;
      this.previewUrl = null;
      this.selectedFile = null;

      Swal.fire({
        icon: 'success',
        title: 'Foto de perfil atualizada!',
        timer: 2000,
        showConfirmButton: false
      });
    });
}
}