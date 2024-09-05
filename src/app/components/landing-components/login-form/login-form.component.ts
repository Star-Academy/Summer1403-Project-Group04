import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule, NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgIf } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';
import { APIResponse } from '../../../models/api-response';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzFormControlComponent,
    NzInputModule,
    NgIf,
    NzIconModule,
    NzSpinModule,
    InputComponent,
  ],
  providers: [FormBuilder, Validators],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  protected loginForm: FormGroup;
  protected onWait = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.onWait = true;
      const { username, password } = this.loginForm.value;

      this.loginService
        .login(username, password)
        .subscribe({
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
        })
        .add(() => {
          this.onWait = false;
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
