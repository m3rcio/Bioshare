import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

userName=new FormControl<string | null>('');
password=new FormControl('');
spanAlerta:boolean=false;

constructor(private router:Router){}
  verificarLogin(userName: string | null,password: string | null){
    if(userName == 'mercio' && password== '1234' ){
      
   this.router.navigate(['/myprofile']);
  }else{
   this.spanAlerta=true
    
  }
}
}
