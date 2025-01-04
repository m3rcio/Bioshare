import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userName=new FormControl<string | null>('');
  password=new FormControl('');
  spanAlerta:boolean=false;

  reqData(){
    const requestData={
      userName:this.userName,
      password: this.password
    }
    return requestData;
  }
 
  
constructor( private http: HttpClient){

}


  onSubmit() {
    const formData= this.reqData();
    this.http.post('http://localhost:3000/api/signup', formData)
      .subscribe(res => {
        console.log('Signup successful', res);
      }, error => {
        console.error('Error during signup', error);
      });
  }

}
