import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GraphData } from '../../../../models/graph-data';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [NzIconModule, NzToolTipModule, NzFlexModule, NzDividerModule , NzSelectModule, NzTypographyModule, ReactiveFormsModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent implements OnInit {
  data!: GraphData;
  selectedNode!: {
    age: number;
    bio: string;
    color: string;
    job: string;
    label: string;
    size: number;
    x: number;
    y: number;
  };
  listOfOption: {id: string , label: string}[] = [];
  searchedNode = new FormControl();


  constructor(private sigmaService: SigmaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sigmaService.currentData.subscribe((data) => {
      this.data = data;
      this.cdr.detectChanges();
    });

    this.sigmaService.nodeData.subscribe((data) => {

      if(data){
 
        this.selectedNode = data;
        this.cdr.detectChanges();
      }
     
    });

    this.sigmaService.allNodesData$.subscribe((nodes)=>{
      this.listOfOption = nodes;
    })
  }

  onNodeChange(value: any): void {
    this.sigmaService.updateSearchedNode(value);
  }
}
