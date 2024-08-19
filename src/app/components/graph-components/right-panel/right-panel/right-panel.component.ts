import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GraphData } from '../../../../models/graph-data';


@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [NzIconModule , NzToolTipModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent implements OnInit {
  data!: GraphData;
  selectedNode!: string;

  constructor(private sigmaService: SigmaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sigmaService.currentData.subscribe((data) => {
      this.data = data;
      this.cdr.detectChanges();
    });

    this.sigmaService.nodeData.subscribe((data) => {
      this.selectedNode = data;
      this.cdr.detectChanges();
    });
  }
}
