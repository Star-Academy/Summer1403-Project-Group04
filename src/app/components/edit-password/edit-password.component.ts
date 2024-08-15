import { Component } from '@angular/core';
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

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [
    NzModalModule,
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent {
  protected passwordForm: FormGroup;
  protected isSubmitted: boolean = false;
  protected formControls: {
    name: string;
    type: string;
    placeholder: string;
    minLength: number;
  }[] = [
    {
      name: 'oldpassword',
      type: 'password',
      placeholder: 'Current Password',
      minLength: 4,
    },
    {
      name: 'newpassword',
      type: 'password',
      placeholder: 'New Password',
      minLength: 4,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm New Password',
      minLength: 4,
    },
  ];

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(4)]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), this.matchPassword('newpassword')]],
    });

    this.passwordForm.get('newpassword')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      console.log('Form Submitted!', this.passwordForm.value);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  private matchPassword(matchTo: string): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent) {
        return control.value === control.parent.get(matchTo)?.value 
          ? null 
          : { 'mismatch': true };
      }
      return null;
    };
  }
}
