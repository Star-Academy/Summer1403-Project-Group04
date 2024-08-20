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

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule, FormsModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.scss',
})
export class EditPasswordComponent implements OnInit {
  protected passwordForm: FormGroup;
  protected isSubmitted = false;
  private userID = 0;
  protected formControls: {
    name: string;
    type: string;
    placeholder: string;
    minLength: number;
  }[] = [
    { name: 'oldpassword', type: 'password', placeholder: 'Current Password', minLength: 4 },
    { name: 'newpassword', type: 'password', placeholder: 'New Password', minLength: 4 },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm New Password', minLength: 4 },
  ];
  protected isUpdatingProfile = false;

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private userService: UserService) {
    this.passwordForm = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(4)]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), this.matchPassword('newpassword')]],
    });

    this.passwordForm.get('newpassword')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(async (params) => {
      this.userID = params['id'];
      this.isUpdatingProfile = this.userID ? false : true;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.passwordForm.valid) {
      this.isUpdatingProfile ? this.handleUpdateProfilePassword() : this.handleUpdateUserPassword();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  private handleUpdateProfilePassword() {
    this.userService.updatePassword(null, this.passwordForm, this.isUpdatingProfile).add(() => {
      this.userService.logout();
    });
  }

  private handleUpdateUserPassword() {
    this.userService.updatePassword(this.userID, this.passwordForm, this.isUpdatingProfile).add(() => {});
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
