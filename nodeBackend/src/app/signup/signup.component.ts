
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button'; 
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatHint } from '@angular/material/form-field';
import { MatCardTitle } from '@angular/material/card';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AplicallService } from '../shared/aplicall.service';
//import { Router } from 'express';
import { request } from 'http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { routes } from '../app.routes';
import { InjectionToken } from '@angular/core';

export const APICALL_SERVICE_TOKEN =new InjectionToken<any>('aplicallService');


@Component({
  selector: 'app-signup',
  standalone: true,
  providers:[provideNativeDateAdapter(),HttpClientModule,HttpClient],
  imports: [RouterLink,ReactiveFormsModule,MatInput,MatCard,MatFormField,MatLabel,MatOption,MatButton,MatSelect,MatRadioModule,MatButtonModule,MatDatepickerModule,MatHint,MatCardTitle],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})



export class SignupComponent {
  @ViewChild('confirmedPassword', { static: false }) confirmedPassword: ElementRef | any;
  UserRegistrationForm: FormGroup;

  constructor(public apicallService: AplicallService, public router: Router) {
    this.UserRegistrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  OnSubmit() {
    if (this.UserRegistrationForm.value && this.UserRegistrationForm.value.password === this.confirmedPassword.nativeElement.value) {
      this.apicallService.registerUser(this.UserRegistrationForm.value).subscribe(
        (res: any) => {
          if (res && res.status === 'success' && res.data && res.data._id) {
            this.router.navigate(['/login']);
          }
        },
        (err: any) => {
          console.error('Error during registration:', err);
        }
      );
    }
  }
}

