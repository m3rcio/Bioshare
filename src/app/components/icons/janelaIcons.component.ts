import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgFor } from '@angular/common';
@Component({
  standalone:true,
  selector: 'app-janela-icons-dialog',
  imports:[MatDialogModule, MatFormFieldModule,NgFor],
  templateUrl: 'janela-icons.component.html'
})
export class JanelaIconsComponent {

  constructor(
    public dialogRef: MatDialogRef<JanelaIconsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  icones_sociais = [
  { nome: 'Facebook', classe: 'fa-brands fa-facebook', cor: '#1877F2' },
  { nome: 'Twitter', classe: 'fa-brands fa-twitter', cor: '#1DA1F2' },
  { nome: 'Instagram', classe: 'fa-brands fa-instagram', cor: '#E4405F' },
  { nome: 'LinkedIn', classe: 'fa-brands fa-linkedin', cor: '#0A66C2' },
  { nome: 'YouTube', classe: 'fa-brands fa-youtube', cor: '#FF0000' },
  { nome: 'TikTok', classe: 'fa-brands fa-tiktok', cor: '#000000' },
  { nome: 'WhatsApp', classe: 'fa-brands fa-whatsapp', cor: '#25D366' },
  { nome: 'Telegram', classe: 'fa-brands fa-telegram', cor: '#0088CC' },
  { nome: 'Reddit', classe: 'fa-brands fa-reddit', cor: '#FF4500' },
  { nome: 'Pinterest', classe: 'fa-brands fa-pinterest', cor: '#BD081C' },
  { nome: 'Snapchat', classe: 'fa-brands fa-snapchat', cor: '#FFFC00' },
  { nome: 'Spotify', classe: 'fa-brands fa-spotify', cor: '#1DB954' },
  { nome: 'Twitch', classe: 'fa-brands fa-twitch', cor: '#9146FF' },
  { nome: 'GitHub', classe: 'fa-brands fa-github', cor: '#181717' },
  { nome: 'GitLab', classe: 'fa-brands fa-gitlab', cor: '#FC6D26' },
  { nome: 'Stack Overflow', classe: 'fa-brands fa-stack-overflow', cor: '#F48024' },
  { nome: 'Slack', classe: 'fa-brands fa-slack', cor: '#4A154B' },
  { nome: 'Discord', classe: 'fa-brands fa-discord', cor: '#5865F2' },
  { nome: 'Dribbble', classe: 'fa-brands fa-dribbble', cor: '#EA4C89' },
  { nome: 'Behance', classe: 'fa-brands fa-behance', cor: '#1769FF' },
  { nome: 'Medium', classe: 'fa-brands fa-medium', cor: '#12100E' },
  { nome: 'WordPress', classe: 'fa-brands fa-wordpress', cor: '#21759B' },
  { nome: 'Apple', classe: 'fa-brands fa-apple', cor: '#A2AAAD' },
  { nome: 'Microsoft', classe: 'fa-brands fa-microsoft', cor: '#2259f2ff' },
  { nome: 'Amazon', classe: 'fa-brands fa-amazon', cor: '#FF9900' },
  { nome: 'PayPal', classe: 'fa-brands fa-paypal', cor: '#00457C' },
  { nome: 'Shopify', classe: 'fa-brands fa-shopify', cor: '#32b312ff' },
];
}