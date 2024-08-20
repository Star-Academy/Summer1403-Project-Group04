import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass } from '@angular/common';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LayoutsComponent } from '../toolbar-components/layouts/layouts.component';
import { UploadComponentsComponent } from "../toolbar-components/upload-component/upload-components.component";
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-graph-tool-bar',
  standalone: true,
  imports: [NzIconModule, NgClass, NzToolTipModule, NzFlexModule, NzButtonModule, NzPopoverModule, LayoutsComponent, UploadComponentsComponent , NzSwitchModule],
  providers: [],
  templateUrl: './graph-tool-bar.component.html',
  styleUrl: './graph-tool-bar.component.scss',
})
export class GraphToolBarComponent {
  constructor(private sigmaService: SigmaService) {}
  activeButton: number | null = null;

  setActiveButton(index: number) {
    this.activeButton = index;
  }
}
