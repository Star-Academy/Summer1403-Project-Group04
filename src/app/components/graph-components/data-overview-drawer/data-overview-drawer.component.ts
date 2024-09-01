import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    NzDropDownModule
  ],
  templateUrl: './data-overview-drawer.component.html',
  styleUrl: './data-overview-drawer.component.scss'
})
export class DataOverviewDrawerComponent {
  @Input() visible = false;
  @Input() selectedNode: nodeData | null = null;
  @Input() selectedEdge: edgeData | null = null;
  @Input() selectedNodeId!: string;
  @Input() selectedEdgeId!: string;

  @Output() closeDrawer = new EventEmitter<void>();

  close(): void {
    this.closeDrawer.emit();
  }

  expand(): void {
    // Logic for expanding the node
    console.log('Expand clicked for node:', this.selectedNodeId);
  }

  delete(): void {
    // Logic for deleting the node
    console.log('Delete clicked for node:', this.selectedNodeId);
  }
}
