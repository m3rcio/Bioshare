import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

userName=new FormControl('');
password=new FormControl('');

constructor(private router:Router){}
  verificarLogin(userName: string,password: string){
    if(userName == 'mercio' && password== '1234' ){
   this.router.navigate(['/myprofile']);
  }else{
    document.addEventListener('DOMContentLoaded',()=>{
      // document.getElementById('alert').style.display='block';
    })
    
  }
}
}
