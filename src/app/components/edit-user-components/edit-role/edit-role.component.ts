import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../../services/user/user.service';
import { UserData } from '../../../models/user-data';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, NzSelectModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss',
})
export class EditRoleComponent implements OnChanges {
  protected roleForm: FormGroup;
  protected formControls = [{ name: 'role', type: 'text', placeholder: 'Role', minLength: 1 }];
  protected listOfOption: { label: string; value: string }[] = [
    { label: 'System Administrator', value: 'Admin' },
    { label: 'Data Admin', value: 'DataAdmin' },
    { label: 'Data Analyst', value: 'DataAnalyst' },
  ];
  protected listOfTagOptions: string[] = [];
  protected isSubmitted = false;
  @Input({ required: true }) userData: UserData | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
      this.userService.updateRole(this.roleForm.value.role, this.userData ? this.userData.id : 0).add(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}
