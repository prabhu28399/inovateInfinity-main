import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { validateHeaderValue } from 'http';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { AplicallService } from '../shared/aplicall.service';
import { Router } from '@angular/router';
import { request, response } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  providers:[HttpClientModule,HttpClient],
  imports: [RouterLink,ReactiveFormsModule,MatCard,MatFormField,MatCardContent,MatCardTitle,MatButton,MatInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
// export class LoginComponent {
//   email =new FormControl("",[
//     Validators.required,
//     Validators.email
//   ])
//   password = new FormControl("",[
//     Validators.required,
//     Validators.minLength(6)
//   ])

//   loginForm = new FormGroup({
//     email:this.email,
//     password:this.password
//   })
//   login(){
//     console.log(this.loginForm.value)
//   }
// }
export class LoginComponent {
  loginUserForm :FormGroup;

  constructor(public aplicallService :AplicallService ,public router :Router) {
    this.loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
    ngOnInit():void{
    }
    OnSubmit() {
      if (this.loginUserForm.valid) {
        this.aplicallService.login(this.loginUserForm.value).subscribe(
          (res: any) => {
            if (res && res['status'] === 'ok' && res['data']['response'] && res['data']['authToken']) {
              localStorage.setItem('token', res['data']['authToken']);
              this.router.navigate(['/dashboard']);
            }
          },
          (error: any) => {
            // Handle the error if needed
            console.error('Login error:', error);
          }
        );
      }
      console.log(this.loginUserForm.value);
    }}    