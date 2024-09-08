import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { da, th } from '@faker-js/faker';

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
  ],
  templateUrl: './data-overview-drawer.component.html',
  styleUrl: './data-overview-drawer.component.scss',
})
export class DataOverviewDrawerComponent implements OnInit {
  constructor(private graphService: GraphService, private sigmaService: SigmaService) {}

  ngOnInit(): void {
   this.subscribeToServices();
  }

  @Input() visible = false;
  @Input() selectedNode: nodeData | null = null;
  @Input() selectedEdge: edgeData | null = null;
  @Input() selectedNodeId!: string;
  @Input() selectedEdgeId!: string;

  @Output() closeDrawer = new EventEmitter<void>();

  private sourceNodeProp!: string[]; 
  private targetNodeProp!: string[];
  private edgeProp!: string[]; 
  private selectedCategories! : graphCategory; //Ino niaz nadarim chon tooye get-graph component line 68 be bad ok kardim

  close(): void {
    this.closeDrawer.emit();
  }
  
  search(): void {
    // Logic for searching the node
    const searchParam = {
      sourceCategoryName: this.selectedCategories.sourceCategoryName,
      targetCategoryName: this.selectedCategories.targetCategoryName,
      sourceCategoryClauses: this.sourceNodeProp,
      targetCategoryClauses: this.targetNodeProp,
      edgeCategoryClauses: this.edgeProp
    }//I have no idea if this the right format

    this.graphService.searchNode(searchParam)
  }

  expand(): void {
    // Logic for expanding the node
    console.log('Expand clicked for node:', this.selectedNodeId);
  }

  delete(): void {
    // Logic for deleting the node
    console.log('Delete clicked for node:', this.selectedNodeId);
  }

  subscribeToServices(){
    // this.sigmaService.selectedGraphCategories$.subscribe({
    //   next: (data)=>{
    //     this.selectedCategories = data
    //   }
    // }) va hamintor in
    this.sigmaService.sourceNodeProp$.subscribe({
      next: (data)=>{
        this.sourceNodeProp = data
      }
    })
    this.sigmaService.targetNodeProp$.subscribe({
      next: (data)=>{
        this.targetNodeProp = data
      }
    })
    this.sigmaService.edgeProp$.subscribe({
      next: (data)=>{
        this.edgeProp = data
      }
    })
    
  }
}
