import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profilePicture.component.html',
  styleUrls: ['./profilePicture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  userId = 'ID_DO_USUARIO'; // pegar do login
  currentPicture!: string;
  selectedFile!: File;
  previewUrl: any = null;

  constructor(private userService: UserService, private sanitizer: DomSanitizer,private authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    let usuarioLogadoId=this.authService.getUserId();
    this.userService.getUsersById(usuarioLogadoId).subscribe(user => {
      this.currentPicture = `http://localhost:3000${user.profile_picture}`;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    reader.readAsDataURL(this.selectedFile);
  }

  upload() {
    if (!this.selectedFile) return;
    this.userService.uploadProfilePicture(this.userId, this.selectedFile)
      .subscribe(res => {
        this.currentPicture = `http://localhost:3000${res.profile_picture}`;
        this.previewUrl = null; 
      });
  }
}