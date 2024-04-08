import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  ngOnInit():void{
    this.setForm();
  }
constructor(
  private _register:RegisterService
){

}
  setForm(){
    this.registerForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      // lasttName: new FormControl(''),
      contact: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),

    });
  }


  register() {
    console.log(this.registerForm.value)
    console.log(this.registerForm.valid)
    
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      this._register.registerUser(this.registerForm.value).subscribe((data: any) => {
      console.log(data)
      this.registerForm.reset();
      alert(data.msg);
      })
    }else{
      alert("Please Fill Valid Details...!")
    }

}
}

