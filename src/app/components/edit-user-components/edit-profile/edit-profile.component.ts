import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { UserData } from '../../../models/user-data';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

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
  protected userForm!: FormGroup;
  protected isSubmitted = false;
  protected isUpdatingProfile = false;

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

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private userService: UserService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();

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
      this.isUpdatingProfile ? this.handleUpdateProfile() : this.handleUpdateUser();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  private handleUpdateProfile() {
    this.userService.updateUser(null, this.userForm, this.isUpdatingProfile).add(() => {
      
    });
  }
  
  private handleUpdateUser() {
    this.userService.updateUser(this.userData.id, this.userForm, this.isUpdatingProfile).add(() => {
    });
  }
}
