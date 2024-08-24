import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '../../input/input.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { formInput } from '../../../models/form-input';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzModalModule,
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
  ],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent implements OnInit {
  protected passwordForm!: FormGroup;
  protected isSubmitted = false;
  protected isUpdatingProfile = false;
  private userID = 0;
  protected formControls = [
    { name: 'oldpassword', type: 'password', placeholder: 'Current Password', minLength: 4, prefixIcon: 'lock' },
    { name: 'newpassword', type: 'password', placeholder: 'New Password', minLength: 1, prefixIcon: 'key' },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm New Password',
      minLength: 1,
      prefixIcon: 'check-circle',
    },
  ];

  protected passwordValidationMessages = {
    hasDigit: 'Must contain at least one digit (1-9)',
    hasLowercase: 'Must contain at least one lowercase letter (a-z)',
    hasUppercase: 'Must contain at least one uppercase letter (A-Z)',
    hasSpecialChar: 'Must contain at least one special character (!@#$%^&*)',
    hasNoSpaces: 'Must not contain spaces',
    hasValidLength: 'Must be 8-16 characters long',
  };

  protected passwordValidation = {
    hasDigit: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecialChar: false,
    hasNoSpaces: false,
    hasValidLength: false,
  };

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializePasswordForm();
    this.setupFormValueChangeHandlers();
    this.subscribeToQueryParams();
  }

  private initializePasswordForm(): void {
    this.passwordForm = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newpassword: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?!.*\s).{8,16}$/)],
      ],
      confirmPassword: ['', [Validators.required, this.matchPassword('newpassword')]],
    });

    this.passwordForm.get('newpassword')?.valueChanges.subscribe((password) => {
      this.updatePasswordValidation(password);
    });
  }

  private setupFormValueChangeHandlers(): void {
    this.passwordForm.get('newpassword')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  private subscribeToQueryParams(): void {
    this.activeRoute.queryParams.subscribe(async (params) => {
      this.userID = params['id'];
      this.isUpdatingProfile = this.userID ? false : true;
    });
  }

  protected onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      if (this.isUpdatingProfile) {
        this.handleUpdateProfilePassword();
      } else {
        this.handleUpdateUserPassword();
      }
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  private handleUpdateProfilePassword() {
    this.userService.updatePassword(null, this.passwordForm, this.isUpdatingProfile).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          const successMessage = 'Success';
          this.notificationService.createNotification('success', successMessage, response.message);
        } else {
          const errorMessage = 'Error Updating Profile';
          this.notificationService.createNotification('error', errorMessage, response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Old password is wrong!';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  private handleUpdateUserPassword() {
    this.userService.updatePassword(this.userID, this.passwordForm, this.isUpdatingProfile).subscribe({
      next: (response) => {
        if (response.message === 'User updated successfully!') {
          const successMessage = 'Success';
          this.notificationService.createNotification('success', successMessage, response.message);
        } else {
          const errorMessage = 'Error Updating User';
          this.notificationService.createNotification('error', errorMessage, response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Old password is wrong!';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });
  }

  private matchPassword(matchTo: string): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        return control.value === control.parent.get(matchTo)?.value ? null : { mismatch: true };
      }
      return null;
    };
  }

  protected getErrorTip(control: formInput): string {
    const formControl = this.passwordForm.get(control.name);

    if (control.name === 'newpassword') {
      return '';
    }

    if (formControl?.touched && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return '*required';
      }
      if (formControl.hasError('minlength')) {
        return `*at least ${control.minLength} characters`;
      }
      if (formControl.hasError('maxlength')) {
        return `*at most ${control.minLength} characters`;
      }
      if (formControl.hasError('mismatch')) {
        return '*passwords do not match';
      }
    }

    return '';
  }

  protected updatePasswordValidation(password: string) {
    this.passwordValidation = this.getPasswordValidationStatus(password);
  }

  protected getPasswordValidationStatus(password: string) {
    return {
      hasDigit: /\d/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNoSpaces: !/\s/.test(password),
      hasValidLength: password.length >= 8 && password.length <= 16,
    };
  }

  protected isPasswordValid() {
    const passwordControl = this.passwordForm.get('newpassword');
    return passwordControl?.valid && passwordControl?.touched;
  }
}
