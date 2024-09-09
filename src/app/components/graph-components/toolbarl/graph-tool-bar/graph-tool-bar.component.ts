import { Component, EventEmitter, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass } from '@angular/common';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LayoutsComponent } from '../toolbar-components/layouts/layouts.component';
import { UploadComponentsComponent } from '../toolbar-components/upload-component/upload-layout/upload-components.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { RouterLink } from '@angular/router';
import { GetGraphComponent } from '../toolbar-components/get-graph/get-graph.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-graph-tool-bar',
  standalone: true,
  imports: [
    RouterLink,
    NzIconModule,
    NgClass,
    NzToolTipModule,
    NzFlexModule,
    NzButtonModule,
    NzPopoverModule,
    LayoutsComponent,
    UploadComponentsComponent,
    NzSwitchModule,
    GetGraphComponent,
    FormsModule,
  ],
  providers: [],
  templateUrl: './graph-tool-bar.component.html',
  styleUrl: './graph-tool-bar.component.scss',
})
export class GraphToolBarComponent {
  protected isSwitchChecked = true;
  protected hoverToggle = false;

  constructor(private sigmaService: SigmaService) {}
  activeButton: number | null = null;
  @Output() openDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  setActiveButton(index: number) {
    this.activeButton = index;
  }

  openMenu() {
    this.setActiveButton(4);
    this.openDrawer.emit(true);
  }

  toggleRenderEdgeLabel() {
    this.sigmaService.toggleRenderEdgeLabel();
  }

  toggleNodeHover(){
    this.sigmaService.toggleNodeHover();
  }
}
