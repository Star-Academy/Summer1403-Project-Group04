import { Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgIf } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-upload-edge',
  standalone: true,
  imports: [NzStepsModule, NzDividerModule, NzInputModule, NzTypographyModule, NzButtonModule , NzSelectModule , NzUploadModule , NzIconModule , NzToolTipModule],
  providers: [NgIf],
  templateUrl: './upload-edge.component.html',
  styleUrl: './upload-edge.component.scss'
})
export class UploadEdgeComponent {
  constructor(private msg: NzMessageService) {}

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
    if(this.current !==1){
      this.current++;
    }
    
  }
  
  back(){
    this.current--;
  }
}
