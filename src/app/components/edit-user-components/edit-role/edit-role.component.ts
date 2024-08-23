import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../../services/user/user.service';
import { UserData } from '../../../models/user-data';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, NzSelectModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss',
})
export class EditRoleComponent implements OnChanges, OnInit {
  @Input({ required: true }) userData: UserData | undefined;

  protected roleForm!: FormGroup;
  protected formControls = [{ name: 'role', type: 'text', placeholder: 'Role', minLength: 1 }];
  protected listOfTagOptions: string[] = [];
  protected isSubmitted = false;
  protected listOfOption = [
    { label: 'System Administrator', value: 'Admin' },
    { label: 'Data Admin', value: 'DataAdmin' },
    { label: 'Data Analyst', value: 'DataAnalyst' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.roleForm = this.fb.group({
      role: ['', [Validators.required]],
    });
  }

  ngOnChanges() {
    if (this.userData) {
      this.roleForm = this.fb.group({
        role: [this.userData.roles, [Validators.required]],
      });
      this.listOfTagOptions = this.userData.roles;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      this.userService.updateRole(this.roleForm.value.role, this.userData ? this.userData.id : 0).subscribe({
        next: (response) => {
          if (response.message === 'User roles updated successfuly!') {
            this.notificationService.createNotification('success', 'Success', response.message);
          } else {
            this.notificationService.createNotification('error', 'Error Updating Role', response.message);
          }
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage = 'An unexpected error occurred';
          if (error.status === 401) {
            errorMessage = 'Unauthorized: Invalid username or password';
          } else if (error.status === 400) {
            errorMessage = 'Bad Request: Please check your input';
          }

          this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
        },
      });
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}
