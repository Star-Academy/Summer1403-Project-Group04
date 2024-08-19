import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() userData!: UserData;
  userForm!: FormGroup;
  isSubmitted = false;

  formControls = [
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name',
      minLength: 1,
    },
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name',
      minLength: 1,
    },
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1 },
    { name: 'username', type: 'text', placeholder: 'User Name', minLength: 3 },
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm()
  }
  
  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      firstName: [
        this.userData ? this.userData.firstName: '',
        [Validators.required, Validators.minLength(1)],
      ],
      lastName: [
        this.userData ? this.userData.lastName: '',
        [Validators.required, Validators.minLength(1)],
      ],
      email: [
        this.userData ? this.userData.email: '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      username: [
        this.userData ? this.userData.username: '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
