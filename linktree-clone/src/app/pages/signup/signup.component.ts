import { Component,inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [RouterLink ]
})
export class SignupComponent {
  userName=new FormControl<string | null>('');
  password=new FormControl('');
  spanAlerta:boolean=false;

  reqData(){
    const requestData={
      userName:this.userName.value,
      password: this.password.value
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

  goToLoginPage(){
    this.router.navigate(['/login'])
  }

}
