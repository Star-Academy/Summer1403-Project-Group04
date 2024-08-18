import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, NzSelectModule],
  providers: [FormBuilder, Validators],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss',
})
export class EditRoleComponent implements OnInit {
  roleForm: FormGroup;
  formControls = [
    { name: 'role', type: 'text', placeholder: 'Role', minLength: 1 },
  ];
  listOfOption: { label: string; value: string }[] = [
    { label: 'System Administrator', value: 'Admin' },
    { label: 'Data Admin', value: 'DataAdmin' },
    { label: 'Data Analyst', value: 'DataAnalyst' },
  ];
  listOfTagOptions = [];
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSelectionChange(value: any): void {
    this.roleForm.setValue(value);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.roleForm.valid) {
      console.log('Form Submitted!', this.roleForm.value);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}
