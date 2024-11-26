import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

// userName:new FormControl<string>('')
// password:new FormControl<string>('')

  verificarLogin(userName: string,password: string){
    if(userName == 'mercio' && password== '1234' ){
      
    }else{
      alert('credenciais iválidas!');
    }
  }
}
