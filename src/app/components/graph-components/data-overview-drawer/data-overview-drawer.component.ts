import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule, NgFor } from '@angular/common';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { nodeData } from '../../../models/node-data';
import { edgeData } from '../../../models/edge-data';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GraphService } from '../../../services/graph/graph.service';
import { SigmaService } from '../../../services/sigma/sigma.service';
import { graphCategory } from '../../../models/graph-category';
import { FormsModule } from '@angular/forms';
import { searchGraphNode } from '../../../models/search-graph-node';

@Component({
  selector: 'app-data-overview-drawer',
  standalone: true,
  imports: [
    NzDrawerModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    CommonModule,
    NgFor,
    NzBadgeComponent,
    NzIconModule,
    NzDropdownMenuComponent,
    NzDropDownModule,
    FormsModule,
  ],
  templateUrl: './data-overview-drawer.component.html',
  styleUrl: './data-overview-drawer.component.scss',
})
export class DataOverviewDrawerComponent implements AfterViewInit {
  protected searchTerm: string = '';
  private selectedCategories!: graphCategory;

  @Input() visible = false;
  @Input() selectedNode: nodeData | null = null;
  @Input() selectedEdge: edgeData | null = null;
  @Input() selectedNodeId!: string;
  @Input() selectedEdgeId!: string;

  @Output() closeDrawer = new EventEmitter<void>();

  constructor(private graphService: GraphService, private sigmaService: SigmaService) {}

  ngAfterViewInit(): void {
    this.subsctibeToServices();
  }

  close(): void {
    this.closeDrawer.emit();
  }

  search(): void {
    console.log(this.selectedCategories)
    const data: searchGraphNode = {
      sourceCategoryName: this.selectedCategories.sourceCategoryName,
      targetCategoryName: this.selectedCategories.targetCategoryName,
      edgeCategoryName: this.selectedCategories.edgeCategoryName,
      sourceCategoryClauses: {
        AccountID: this.searchTerm,
      },
      targetCategoryClauses: {
        AccountID: this.searchTerm,
      },
      edgeCategoryClauses: {},
    };

    this.graphService.searchNode(data);
  }
  
  expand(): void {
    // Logic for expanding the node
    console.log('Expand clicked for node:', this.selectedNodeId);
  }

  delete(): void {
    // Logic for deleting the node
    console.log('Delete clicked for node:', this.selectedNodeId);
  }

  subsctibeToServices() {
    this.sigmaService.selectedGraphCategories$.subscribe({
      next: (data) => {
        this.selectedCategories.sourceCategoryName = data.sourceCategoryName;
      },
    });
  }
}
