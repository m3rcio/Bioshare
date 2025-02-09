import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
@Component({
  selector: 'app-myprofile',
  imports: [RouterModule, SidebarComponent, DashboardComponent],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {
  isSidebarOpen = false;
  
  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
