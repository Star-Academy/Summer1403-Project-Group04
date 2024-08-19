import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass } from '@angular/common';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-graph-tool-bar',
  standalone: true,
  imports: [NzIconModule , NgClass , NzToolTipModule],
  providers: [],
  templateUrl: './graph-tool-bar.component.html',
  styleUrl: './graph-tool-bar.component.scss'
})
export class GraphToolBarComponent {

  constructor(private sigmaService: SigmaService){}
  activeButton: number | null = null;

  setActiveButton(index: number) {
    this.activeButton = index;
  }

  onCircularLayoutButtonClick() {
    this.sigmaService.triggerCircularLayout(); 
    this.setActiveButton(1)
  }

  onRandomLayoutButtonClick(){
    this.sigmaService.triggerRandomLayout();
    this.setActiveButton(2);
  }

}
