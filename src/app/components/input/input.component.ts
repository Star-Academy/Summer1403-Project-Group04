import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() prefixIcon: string = '';
  @Input() errorTip: string = '';
  @Input() options: userRoles[] = [];
  @Input() listOfTagOptions = [];

  @Output() tagChange: EventEmitter<any> = new EventEmitter<any>();

  protected value: string = '';
  protected isDisabled = false;
  protected control: FormControl = new FormControl();
  protected passwordVisible = false;

  constructor(private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.ngControl) {
      this.control = this.ngControl.control as FormControl;
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
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
