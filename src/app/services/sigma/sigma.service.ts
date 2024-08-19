import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GraphData } from '../../models/graph-data';

@Injectable({
  providedIn: 'root',
})
export class SigmaService {
  private graphData = new BehaviorSubject<GraphData>({
    numberOfNodes: 0,
    numberOfEdges: 0,
  });
  currentData = this.graphData.asObservable();

  private selectedNodeData = new BehaviorSubject<string>('');
  nodeData = this.selectedNodeData.asObservable();

  private circularLayoutTrigger = new Subject<void>();
  circularLayoutTrigger$ = this.circularLayoutTrigger.asObservable();

  private randomLayoutTrigger = new Subject<void>();
  randomLayoutTrigger$ = this.randomLayoutTrigger.asObservable();

  changeData(data: any) {
    this.graphData.next(data);
  }

  changeSelectedNode(data: string) {
    this, this.selectedNodeData.next(data);
  }

  triggerCircularLayout() {
    this.circularLayoutTrigger.next(); 
  }

  triggerRandomLayout(){
    this.randomLayoutTrigger.next(); 
  }
}
