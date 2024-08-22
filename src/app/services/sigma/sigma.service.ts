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

  private selectedNodeData = new BehaviorSubject< {
    age: number;
    bio: string;
    color: string;
    job: string;
    label: string;
    size: number;
    x: number;
    y: number;
  }>( {
    age: 0,
    bio: 'string',
    color: 'string',
    job: 'string',
    label: 'string',
    size: 0,
    x: 0,
    y: 0,
  });
  nodeData = this.selectedNodeData.asObservable();

  private circularLayoutTrigger = new Subject<void>();
  circularLayoutTrigger$ = this.circularLayoutTrigger.asObservable();

  private randomLayoutTrigger = new Subject<void>();
  randomLayoutTrigger$ = this.randomLayoutTrigger.asObservable();

  changeData(data: GraphData) {
    this.graphData.next(data);
  }

  changeSelectedNode(data: {
    age: number;
    bio: string;
    color: string;
    job: string;
    label: string;
    size: number;
    x: number;
    y: number;
  }) {
    this.selectedNodeData.next(data);
  }

  triggerCircularLayout() {
    this.circularLayoutTrigger.next();
  }

  triggerRandomLayout() {
    this.randomLayoutTrigger.next();
  }
}
