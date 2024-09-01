import { Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadGraphService } from '../../../../../../services/upload-graph/upload-graph.service';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-edge',
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
    NzToolTipModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FormControl],
  templateUrl: './upload-edge.component.html',
  styleUrl: './upload-edge.component.scss',
})
export class UploadEdgeComponent {
  edgeCategory = '';
  edgeCategoryList: string[] = [];
  nodeCategoryList!: string[];
  uploadForm: FormGroup;
  selectedFile: NzUploadFile | null = null;
  isPending = false;
  sourceNodeCategory = ''
  targetNodeCategory = ''

  constructor(
    private msg: NzMessageService,
    private uploadGraphService: UploadGraphService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      EdgeCategoryName: ['', Validators.required],
      UniqueKeyHeaderName: ['', Validators.required],
      File: [null, Validators.required],
      SourceNodeCategoryName: ['', Validators.required],
      TargetNodeCategoryName: ['', Validators.required],
      SourceNodeHeaderName: ['', Validators.required],
      TargetNodeHeaderName: ['', Validators.required],
    });
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      //
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
  current = 0;

  next() {
    if (this.current !== 1) {
      this.current++;
    }
    this.getEdgeCategory();
    this.getNodeCategory();
  }

  back() {
    this.current--;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.selectedFile = file;
    this.uploadForm.patchValue({ 'File': file });
    this.uploadForm.get('File')?.updateValueAndValidity();
    this.msg.success(`${file.name} file selected successfully`);

    return false;
  };

  addEdgeCategory() {
    this.uploadGraphService.addEdgeCategory(this.edgeCategory).subscribe({
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

    this.edgeCategory = '';
  }

  getEdgeCategory() {
    this.uploadGraphService.getEdgeCategories().subscribe({
      next: (response) => {
        this.edgeCategoryList = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
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

  submit(){
    
    if(this.uploadForm.valid){
      
      this.isPending = true;
      const formData = new FormData();
      formData.append('EdgeCategoryName', this.uploadForm.value.EdgeCategoryName);
      formData.append('UniqueKeyHeaderName', this.uploadForm.value.UniqueKeyHeaderName);
      formData.append('SourceNodeCategoryName', this.uploadForm.value.SourceNodeCategoryName);
      formData.append('TargetNodeCategoryName', this.uploadForm.value.TargetNodeCategoryName);
      formData.append('SourceNodeHeaderName', this.uploadForm.value.SourceNodeHeaderName);
      formData.append('TargetNodeHeaderName', this.uploadForm.value.TargetNodeHeaderName);
      formData.append('File', this.uploadForm.get('File')?.value as File);
     
      this.uploadGraphService.uploadEdgeData(formData).subscribe(({
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
      }))
    }
  }
}
