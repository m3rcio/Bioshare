import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { error } from 'node:console';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

userName= new FormControl<string>('');
password= new FormControl<string>('');
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

onLogin(): void {
  this.authService.login(this.userName.value, this.password.value).subscribe({
    next: (response) => {
      if (response.success) {
        this.router.navigate(['/myprofile']);
      }
    },
    error: (error) => {
      console.error('Erro durante o login:', error);
      alert(error.message || 'Falha no login!');
    }
  });
}

// onSubmit() {
//   const formData= this.reqData();
//   this.http.post('http://localhost:3000/api/login', formData)
//     .subscribe(res => {
//       console.log('Login successful', res);
//     }, error=> {
//       console.error('Erro durante login', error);
//     });
// }


}
