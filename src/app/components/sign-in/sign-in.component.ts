import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { APIResponse } from '../../models/api-response';
import { NotificationService } from '../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, NgClass, NgFor, NzSpinModule],
  providers: [FormBuilder, Validators],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: FormGroup;
  formControls = [
    { name: 'username', type: 'text', placeholder: 'User-name', minLength: 3 },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      minLength: 4,
    },
  ];

  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;

      this.loginService.login(username, password).subscribe({
        next: (response: APIResponse) => {
          this.notificationService.createNotification('success', 'Successful Login', response.message);
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage = 'An unexpected error occurred';
          if (error.status === 401) {
            errorMessage = 'Unauthorized: Invalid username or password';
          } else if (error.status === 400) {
            errorMessage = 'Bad Request: Please check your input';
          }

          this.notificationService.createNotification('error', 'Login Failed', errorMessage);
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
      this.triggerShakeAnimation();
    }
  }

  public triggerShakeAnimation(): void {
    this.inputFields.forEach((field) => {
      const element = field.nativeElement;
      const elementName = element.placeholder.toLowerCase().replace('-', '');

      if (this.signInForm.get(elementName)?.invalid) {
        element.classList.remove('shake');
        window.requestAnimationFrame(() => {
          element.classList.add('shake');
        });
      }
    });
  }
}
