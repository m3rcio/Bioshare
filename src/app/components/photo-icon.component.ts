// import { Component } from '@angular/core';
// import { Camera, Facebook, Instagram, Twitter } from 'lucide-angular';
// import { LucideIcons } from 'lucide-angular';

// @Component({
//   selector: 'app-photo-icon',
//   template: `
//     <lucide-angular [img]="currentIcon" (click)="openPicker()" class="clickable"></lucide-angular>
//     <div *ngIf="pickerOpen" class="icon-picker">
//       <button *ngFor="let opt of options" (click)="selectIcon(opt.icon)">
//         <lucide-icons [img]="opt.icon" size="24"></lucide-icons>
//       </button>
//     </div>
//   `,
//   styleUrls: ['./photo-icon.component.scss']
// })
// export class PhotoIconComponent {
//   currentIcon: LucideIcon = Camera;
//   pickerOpen = false;

//   options = [
//     { label: 'Facebook', icon: Facebook },
//     { label: 'Instagram', icon: Instagram },
//     { label: 'Twitter', icon: Twitter },
//     { label: 'WhatsApp', icon: Whatsapp },
//   ];

//   openPicker() {
//     this.pickerOpen = true;
//   }

//   selectIcon(icon: LucideIcon) {
//     this.currentIcon = icon;
//     this.pickerOpen = false;
//   }
// }