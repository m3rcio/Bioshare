import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = false;
  authService=inject(AuthService);
  @Output() toggleSidebar = new EventEmitter<boolean>();

  toggle() {
    this.isOpen = !this.isOpen;
    this.toggleSidebar.emit(this.isOpen);
  }
sair(){
  this.authService.logout();
}

}
