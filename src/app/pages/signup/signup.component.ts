import { Component,inject } from '@angular/core';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,NgIf,HeaderComponent,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [RouterLink ]
})
export class SignupComponent {
  userName=new FormControl<string | null>('');
  email=new FormControl<string | null>('');
  password=new FormControl('');
  spanAlerta:boolean=false;
  spanText='';

  reqData(){
    const requestData={
      userName:this.userName.value,
      password: this.password.value,
      email:this.email.value
    }
    return requestData;
  }
 http= inject(HttpClient)
 router=inject(Router)
constructor(){

}

onSubmit() {
  const formData= this.reqData();
  this.http.post('http://localhost:3000/api/signup', formData)
    .subscribe(res => {
      console.log('Signup successful', res);
      this.router.navigate(['/myprofile']);
    }, error=> {
      console.error('Erro durante o cadastro', error);
    });
}

cadastrar(){
  if(!this.userName.value || !this.password.value || !this.email.value){
    this.spanText='Preencha todos os campos antes de enviar'
    this.spanAlerta=true
  }else{
    this.spanAlerta=false
    this.onSubmit();
  }
}



  goToLoginPage(){
    this.router.navigate(['/login'])
  }

}
