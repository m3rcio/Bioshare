import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-myprofile',
  imports: [RouterModule, SidebarComponent, DashboardComponent],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit{

  ngOnInit(): void {
  
  }

  isSidebarOpen = false;
  
  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

}
