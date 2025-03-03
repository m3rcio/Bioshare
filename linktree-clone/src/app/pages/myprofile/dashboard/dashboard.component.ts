import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { SocialLinks } from '../../../models/sociallinks.model';
@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule,CommonModule,RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @Input() sidebarOpen = false;

  sociallinkDivShowing:boolean=false;

  socialLinks: SocialLinks[]=[];

  adicionarSocialLink(){
    this.sociallinkDivShowing=true;
  }
}