import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

userName:string='';
password:string='';
spanAlerta:boolean=false;

 reqData(){
    const requestData={
      userName:this.userName,
      password: this.password
    }
    return requestData;
  }
 http= inject(HttpClient)

constructor(private router:Router,private authService: AuthService){}

onLogin():void{
  this.authService.login(this.userName,this.password).subscribe({
    next: (res)=>{
      if(res.token){
        console.log('Login feito com sucesso!');
        this.router.navigate(['/myprofile']);
      }
    },
    error:(err)=>{
      console.error('Erro no Login:', err);
      alert('credenciais inválidas!');
    }
  })
}

onSubmit() {
  const formData= this.reqData();
  this.http.post('http://localhost:3000/api/login', formData)
    .subscribe(res => {
      console.log('Login successful', res);
    }, error=> {
      console.error('Erro durante login', error);
    });
}


}
