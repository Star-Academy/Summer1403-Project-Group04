import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../../services/sigma/sigma.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [NzIconModule , NzDividerModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  constructor(private sigmaService: SigmaService){}
  onCircularLayoutButtonClick() {
    this.sigmaService.triggerCircularLayout();
  }

  onRandomLayoutButtonClick() {
    this.sigmaService.triggerRandomLayout();
  }
}
