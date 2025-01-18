import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

 reqData(){
    const requestData={
      userName:this.userName.value,
      password: this.password.value
    }
    return requestData;
  }
 http= inject(HttpClient)

// constructor(private router:Router){}
//   verificarLogin(userName: string | null,password: string | null){
//     if(userName == 'mercio' && password== '1234' ){
      
//    this.router.navigate(['/myprofile']);
//   }else{
//    this.spanAlerta=true
    
//   }
// }

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
