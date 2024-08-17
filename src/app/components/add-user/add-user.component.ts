import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NzModalModule, NgIf, NgFor, NgClass, ReactiveFormsModule, NzSelectModule, FormsModule],
  providers: [FormBuilder, Validators],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})

export class AddUserComponent {
  userForm: FormGroup;
  isSubmitted = false;
  listOfOption: { label: string; value: string }[] = [
    { label: 'System Administrator', value: 'System Administrator' },
    { label: 'Data Manager', value: 'Data Manager' },
    { label: 'Analyst', value: 'Analyst' }
  ];
  listOfTagOptions = [];
  formControls: {
    name: string;
    type: string;
    placeholder: string;
    minLength: number;
  }[] = [
    { name: 'name', type: 'text', placeholder: 'Name', minLength: 1 },
    {
      name: 'familyname',
      type: 'text',
      placeholder: 'Family name',
      minLength: 1,
    },
    { name: 'email', type: 'email', placeholder: 'Email', minLength: 1 },
    { name: 'username', type: 'text', placeholder: 'User-name', minLength: 3 },
    { name: 'role', type: 'text', placeholder: 'Role', minLength: 1 },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      minLength: 4,
    },
  ];
  @Input() isVisible = false;

  @Output() handleCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleOk: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isVisibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      familyname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      role: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  protected afterCloseModal(): void {
    this.isVisibleChange.emit(false);
  }

  protected handleCancelModal(): void {
    this.handleCancel.emit(true);
  }

  protected handleOkModal(): void {
    if (this.userForm.invalid) {
      this.isSubmitted = true;
      this.userForm.markAllAsTouched();
      return;
    }
    console.log(this.userForm.value);
    this.handleOk.emit(true);
  }
}
