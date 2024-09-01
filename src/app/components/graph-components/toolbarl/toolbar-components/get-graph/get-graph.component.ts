import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { UploadGraphService } from '../../../../../services/upload-graph/upload-graph.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { SigmaService } from '../../../../../services/sigma/sigma.service';
import { MockBackService } from '../../../../../services/mock-back/mock-back.service';

@Component({
  selector: 'app-get-graph',
  standalone: true,
  imports: [NzSelectModule, NzTypographyModule, ReactiveFormsModule, NzButtonComponent],
  templateUrl: './get-graph.component.html',
  styleUrl: './get-graph.component.scss',
})
export class GetGraphComponent implements OnInit {
  protected nodeCategoryList: string[] = [];
  protected edgeCategoryList: string[] = [];
  protected form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uploadGraphService: UploadGraphService,
    private sigmaService: SigmaService,
    private notificationService: NotificationService,
    private mockBackService : MockBackService
  ) {
    this.form = this.fb.group({
      SourceNodeCategoryName: ['', Validators.required],
      TargetNodeCategoryName: ['', Validators.required],
      EdgeCategoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.uploadGraphService.getNodeCategories().subscribe({
      next: (data) => {
        this.nodeCategoryList = data;
      },
      error: () => {
        return;
      },
    });

    this.uploadGraphService.getEdgeCategories().subscribe({
      next: (data) => {
        this.edgeCategoryList = data;
      },
      error: () => {
        return;
      },
    });
  }

  protected submit() {
    this.uploadGraphService.getGraph().subscribe({
      next: (data) => {
        this.sigmaService.setGetGraph(data);
        this.mockBackService.setGraphData(data);
        this.notificationService.createNotification('success', 'Success', 'Graph data loaded successfully!');
       
      },
    });
    this.sigmaService.setSelectedCategories(this.form.value)
  }
}
