import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { SanitizerService } from '../../services/sanitizer/sanitizer.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, NgClass, NgFor],
  providers: [FormBuilder, Validators, SanitizerService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;
  formControls: {
    name: string;
    type: string;
    placeholder: string;
    minLength: number;
  }[] = [
    { name: 'username', type: 'text', placeholder: 'User-name', minLength: 3 },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      minLength: 8,
    },
  ];
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sanitizationService: SanitizerService
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signInForm.valid) {
      const rawValues = this.signInForm.value;

      const sanitizedValues = {
        username: rawValues.username,
        password: rawValues.password,
      };
      console.log(sanitizedValues);
    } else {
      this.signInForm.markAllAsTouched();
      this.triggerShakeAnimation();
    }
  }

  private triggerShakeAnimation(): void {
    this.inputFields.forEach((field) => {
      const element = field.nativeElement;
      const elementName = element.placeholder.toLowerCase().replaceAll('-', '');

      if (this.signInForm.get(elementName)?.invalid) {
        element.classList.remove('shake');
        window.requestAnimationFrame(() => {
          element.classList.add('shake');
        });
      }
    });
  }
}
