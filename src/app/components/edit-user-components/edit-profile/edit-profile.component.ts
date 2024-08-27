import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { UserData } from '../../../models/user-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../services/notification/notification.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { InputComponent } from '../../input/input.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { formInput } from '../../../models/form-input';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule, NzTypographyModule, InputComponent, NzIconModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnChanges, OnInit {
  @Input() userData!: UserData;
  protected userForm!: FormGroup;
  protected isSubmitted = false;
  protected isUpdatingProfile = false;

  protected formControls = [
    { name: 'firstName', type: 'text', placeholder: 'Name', minLength: 1, prefixIcon: 'user' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name', minLength: 1, prefixIcon: 'team' },
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1, prefixIcon: 'mail' },
    { name: 'username', type: 'text', placeholder: 'User Name', minLength: 1, prefixIcon: 'idcard' },
  ];

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();

    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams() {
    this.activeRoute.queryParams.subscribe(async (params) => {
      this.isUpdatingProfile = params['id'] ? false : true;
    });
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      firstName: [this.userData ? this.userData.firstName : '', [Validators.required, Validators.minLength(1)]],
      lastName: [this.userData ? this.userData.lastName : '', [Validators.required, Validators.minLength(1)]],
      email: [
        this.userData ? this.userData.email : '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      username: [this.userData ? this.userData.username : '', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      if (this.isUpdatingProfile) {
        this.handleUpdateProfile();
      } else {
        this.handleUpdateUser();
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  private handleUpdateProfile() {
    this.userService.updateUser(null, this.userForm, this.isUpdatingProfile).subscribe({
      next: (response) => {
        const successMessage = 'Success';
        this.notificationService.createNotification('success', successMessage, response.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    });
  }

  private handleUpdateUser() {
    this.userService.updateUser(this.userData.id, this.userForm, this.isUpdatingProfile).subscribe({
      next: (response) => {
        const successMessage = 'Success';
        this.notificationService.createNotification('success', successMessage, response.message);

        this.userService.userData$.subscribe((data) => {
          if (data.id === this.userData.id) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
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
    });
  }

  protected getErrorTip(control: formInput): string {
    const formControl = this.userForm.get(control.name);

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
}
