import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { error } from 'node:console';
import { environment } from '../../../environments/environment';
import { HeaderComponent } from '../../layout/header/header.component';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,HeaderComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

userName= new FormControl<string>('');
password= new FormControl<string>('');
spanAlerta:boolean=false;
errorMessage: string='';
tokenkey='';

 reqData(){
    const requestData={
      userName:this.userName,
      password: this.password
    }
    return requestData;
  }
 http= inject(HttpClient)

constructor(private router:Router,private authService: AuthService){
    this.tokenkey=environment.tokenkey;
}

onLogin() {
  this.authService.login(this.userName.value || '', this.password.value || '')
}

}
