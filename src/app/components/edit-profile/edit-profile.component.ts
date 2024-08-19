import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  userForm: FormGroup;
  isSubmitted = false;

  formControls = [
    { name: 'name', type: 'text', placeholder: 'Name', minLength: 1 },
    { name: 'familyname', type: 'text', placeholder: 'Family name', minLength: 1 },
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1 },
    { name: 'username', type: 'text', placeholder: 'User Name', minLength: 3 },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      familyname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]]
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
