import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InputComponent } from '../../input/input.component';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { userRoles } from '../../../models/role-select';

@Component({
  selector: 'app-add-user',
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
    NzBadgeComponent,
  ],
  providers: [FormBuilder, Validators],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  @Input() isVisible = false;

  @Output() handleCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleOk: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  userForm: FormGroup;
  isSubmitted = false;

  protected listOfTagOptions: string[] = [];
  protected listOfOption: userRoles[] = [];

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

  protected formControls = [
    { name: 'firstName', type: 'text', placeholder: 'Name', minLength: 1, prefixIcon: 'user' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name', minLength: 1, prefixIcon: 'team' },
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1, prefixIcon: 'mail' },
    {
      name: 'roles',
      type: 'select',
      placeholder: 'Role',
      options: this.listOfOption,
      prefixIcon: 'usergroup-add',
    },
    { name: 'username', type: 'text', placeholder: 'User Name', minLength: 1, prefixIcon: 'idcard' },
    { name: 'password', type: 'password', placeholder: 'Password', minLength: 4, prefixIcon: 'lock' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      roles: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?!.*\s).{8,16}$/)],
      ],
    });

    this.userForm.get('password')?.valueChanges.subscribe((password) => {
      this.updatePasswordValidation(password);
    });

    this.userService.getRoles().subscribe({
      next: (response) => {
        const temp: userRoles[] = [];

        response.map((role) => {
          temp.push({ label: role, value: role });
        });
        
        this.formControls.forEach((control) => {
          if (control.name === 'roles') {
            control.options = temp;
          }
        });
      },
    });
  }

  protected onAfterCloseModal(): void {
    this.isVisibleChange.emit(false);
    this.resetForm();
  }

  protected onCancelModal(): void {
    this.handleCancel.emit(true);
    this.isVisibleChange.emit(false);
    this.resetForm();
  }

  protected onSubmitModal(): void {
    if (this.userForm.invalid) {
      console.log(this.userForm.value);
      this.isSubmitted = true;
      this.userForm.markAllAsTouched();
      return;
    }
    this.userService.addUser(this.userForm).subscribe({
      next: (response) => {
        if (response.message === 'User Created Successfuly!') {
          this.notificationService.createNotification('success', 'User Created Successfully', response.message);
        } else {
          this.notificationService.createNotification('error', 'Error Creating User', response.message);
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: Please check your inputs';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
      complete: () => {
        this.handleOk.emit(true);
      },
    });
  }

  private resetForm(): void {
    this.userForm.reset();
    this.isSubmitted = false;
  }

  protected getErrorTip(control: any): string {
    const formControl = this.userForm.get(control.name);

    if (control.name === 'password') {
      return '';
    }

    if (formControl?.touched && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return '*required';
      }
      if (formControl.hasError('minlength')) {
        return `*at least ${control.minLength} characters`;
      }
      if (formControl.hasError('email')) {
        return '*invalid email';
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
    const passwordControl = this.userForm.get('password');
    return passwordControl?.valid && passwordControl?.touched;
  }

  protected onTagChange(value: string[]): void {
    this.userForm.get('roles')?.setValue(value);
  }
}
