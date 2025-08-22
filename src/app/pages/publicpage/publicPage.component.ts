import { Component,inject } from '@angular/core';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
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




}