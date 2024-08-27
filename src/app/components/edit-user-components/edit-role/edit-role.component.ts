import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { UserData } from '../../../models/user-data';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { userRoles } from '../../../models/role-select';
import { InputComponent } from '../../input/input.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { formInput } from '../../../models/form-input';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [CommonModule, NzIconModule, NgIf, NgFor, NgClass, ReactiveFormsModule, FormsModule, InputComponent],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss',
})
export class EditRoleComponent implements OnChanges {
  @Input({ required: true }) userData: UserData | undefined;

  protected roleForm!: FormGroup;
  protected isSubmitted = false;
  protected listOfTagOptions: string[] = [];
  protected listOfOption: userRoles[] = [];
  protected formControls = [
    {
      name: 'roles',
      type: 'select',
      placeholder: 'Role',
      options: this.listOfOption,
      prefixIcon: 'usergroup-add',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.roleForm = this.fb.group({
      roles: ['', [Validators.required, Validators.minLength(1)]],
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

  ngOnChanges() {
    if (this.userData) {
      this.roleForm = this.fb.group({
        roles: [this.userData.roles, [Validators.required]],
      });
      this.listOfTagOptions = this.userData.roles;
    }
  }

  protected onSubmit() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      this.userService.updateRole(this.roleForm.value.roles, this.userData ? this.userData.id : 0).subscribe({
        next: (response) => {
          this.notificationService.createNotification('success', 'Success', response.message);
          this.userService.userData$.subscribe((data) => {
            if (data.id === this.userData?.id) {
              this.logout();
            }
          });
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

  protected getErrorTip(control: formInput): string {
    const formControl = this.roleForm.get(control.name);

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

  protected onTagChange(value: string[]): void {
    this.roleForm.get('roles')?.setValue(value);
  }

  private logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.notificationService.createNotification('info', 'Logged Out', 'You have been logged out successfully.');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error logging out', error);
      },
    });
  }
}
