import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    NzModalModule,
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
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

  listOfOption = [
    { label: 'System Administrator', value: 'Admin' },
    { label: 'Data Admin', value: 'DataAdmin' },
    { label: 'Data Analyst', value: 'DataAnalyst' },
  ];

  formControls = [
    { name: 'firstName', type: 'text', placeholder: 'Name', minLength: 1 },
    { name: 'lastName', type: 'text', placeholder: 'Family name', minLength: 1},
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1 },
    { name: 'username', type: 'text', placeholder: 'User-name', minLength: 3 },
    { name: 'roles', type: 'text', placeholder: 'Role', minLength: 1 },
    { name: 'password', type: 'password', placeholder: 'Password', minLength: 4 },
  ];

  listOfTagOptions = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      roles: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
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
      this.isSubmitted = true;
      this.userForm.markAllAsTouched();
      return;
    }
    this.userService.addUser(this.userForm).add(() => {
      this.handleOk.emit(true);
    });
  }

  private resetForm(): void {
    this.userForm.reset();
    this.isSubmitted = false;
  }
}
