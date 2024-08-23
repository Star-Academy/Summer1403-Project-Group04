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
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formControl } from '../../../models/form-control';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule, FormsModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent implements OnInit {
  protected passwordForm!: FormGroup;
  protected isSubmitted = false;
  protected isUpdatingProfile = false;
  private userID = 0;
  protected formControls: formControl[] = [
    { name: 'oldpassword', type: 'password', placeholder: 'Current Password', minLength: 4 },
    { name: 'newpassword', type: 'password', placeholder: 'New Password', minLength: 4 },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm New Password', minLength: 4 },
  ];

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
      oldpassword: ['', [Validators.required, Validators.minLength(4)]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), this.matchPassword('newpassword')]],
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

  onSubmit() {
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
}
