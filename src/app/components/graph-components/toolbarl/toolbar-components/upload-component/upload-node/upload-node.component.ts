import { Component, OnInit } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadGraphService } from '../../../../../../services/upload-graph/upload-graph.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

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
  ],
  providers: [NgIf],
  templateUrl: './upload-node.component.html',
  styleUrl: './upload-node.component.scss',
})
export class UploadNodeComponent {
  nodecategory = '';
  nodeCategoryList!: string[];
  current = 0;
  selectedFile: NzUploadFile | null = null;

  constructor(
    private msg: NzMessageService,
    private uploadGraphService: UploadGraphService,
    private notificationService: NotificationService
  ) {}

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
          errorMessage = 'Bad Request: Old password is wrong!';
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
      error: (error: HttpErrorResponse) => {},
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.selectedFile = file;
    this.msg.success(`${file.name} file uploaded successfully`);
    return false; // Prevent automatic upload
  };

  submit() {
    if (this.selectedFile) {
      this.uploadGraphService.uploadNodeData(this.selectedFile).subscribe({
        next: (response) => {},
        error: (error: HttpErrorResponse) => {},
      });
    }
  }
}
