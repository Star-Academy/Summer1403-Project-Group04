import { Component } from '@angular/core';
import { GraphToolBarComponent } from "../../../components/graph-components/toolbarl/graph-tool-bar/graph-tool-bar.component";
import { RightPanelComponent } from "../../../components/graph-components/right-panel/right-panel/right-panel.component";
import { SigmaComponent } from "../../../components/graph-components/sigma/sigma/sigma.component";

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [GraphToolBarComponent, RightPanelComponent, SigmaComponent],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {

}