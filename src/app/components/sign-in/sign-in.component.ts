import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf , NgClass, NgFor],
  providers: [FormBuilder, Validators],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;
  formControls: { name: string, type: string, placeholder: string, minLength: number }[] = [
    { name: 'username', type: 'text', placeholder: 'User-name', minLength: 3 },
    { name: 'password', type: 'password', placeholder: 'Password', minLength: 8 },
  ];

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
    }
  }
}
