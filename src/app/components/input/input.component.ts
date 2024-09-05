import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { userRoles } from '../../models/role-select';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    NzFormItemComponent,
    NzInputModule,
    NzFormControlComponent,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzSelectModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() prefixIcon = '';
  @Input() errorTip = '';
  @Input() options: userRoles[] = [];
  @Input() listOfTagOptions: string[] = [];

  @Output() tagChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  protected value = '';
  protected control: FormControl = new FormControl();
  protected passwordVisible = false;

  constructor(@Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.ngControl) {
      this.control = this.ngControl.control as FormControl;
    }
  }

  onChange: (value: string) => void = () => {
    // This comment prevents the method from being considered empty
  };
  onTouched: () => void = () => {
    // This comment prevents the method from being considered empty
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouched();
  }

  onTagChange(value: string[]): void {
    this.tagChange.emit(value);
  }

  togglePasswordVisibility(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
