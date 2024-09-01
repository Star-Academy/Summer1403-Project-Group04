import { Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadGraphService } from '../../../../../../services/upload-graph/upload-graph.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-upload-node',
  standalone: true,
  imports: [
    NzStepsModule,
    NzDividerModule,
    NzInputModule,
    NzTypographyModule,
    NzButtonModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NzSpinModule
    
  ],
  providers: [FormControl],
  templateUrl: './upload-node.component.html',
  styleUrl: './upload-node.component.scss',
})
export class UploadNodeComponent {
  uploadForm: FormGroup;
  nodecategory = '';
  nodeCategoryList!: string[];
  current = 0;
  selectedFile: NzUploadFile | null = null;
  isPending = false;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private uploadGraphService: UploadGraphService,
    private notificationService: NotificationService
  ) {
    this.uploadForm = this.fb.group({
      NodeCategoryName: ['', Validators.required],
      UniqueKeyHeaderName: ['', Validators.required],
      File: [null, Validators.required],
    });
  }

  next() {
    if (this.current !== 1) {
      this.current++;
      this.getNodeCategory();
    }
  }

  back() {
    this.current--;
  }

  addNodeCategory() {
    this.uploadGraphService.addNodeCategory(this.nodecategory).subscribe({
      next: (response) => {
        const successMessage = 'Success';
        this.notificationService.createNotification('success', successMessage, response.message);
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Invalid username or password';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request: input cannot be empty!';
        }

        this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
      },
    });

    this.nodecategory = '';
  }

  getNodeCategory() {
    this.uploadGraphService.getNodeCategories().subscribe({
      next: (response) => {
        this.nodeCategoryList = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.selectedFile = file;
    this.uploadForm.patchValue({ 'File': file });
    this.uploadForm.get('File')?.updateValueAndValidity();
    this.msg.success(`${file.name} file selected successfully`);

    return false;
  };

  submit() {
    if (this.uploadForm.valid) {
      this.isPending = true;
      const formData = new FormData();
      formData.append('NodeCategoryName', this.uploadForm.value.NodeCategoryName);
      formData.append('UniqueKeyHeaderName', this.uploadForm.value.UniqueKeyHeaderName);
      formData.append('File', this.uploadForm.get('File')?.value as File);
      
      
      this.uploadGraphService.uploadNodeData(formData).subscribe({
        next: (response) => {
          this.notificationService.createNotification('success', 'Success', response.message);
          this.isPending = false;
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage = 'An unexpected error occurred';
          if (error.status === 401) {
            errorMessage = 'Unauthorized: Invalid username or password';
          } else if (error.status === 400) {
            errorMessage = error.error.message;
          }
  
          this.notificationService.createNotification('error', 'Unexpected Error', errorMessage);
        },
      });
    }
  }
}
