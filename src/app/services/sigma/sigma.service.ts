import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GraphData } from '../../models/graph-data';
import { graphCategory } from '../../models/graph-category';

@Injectable({
  providedIn: 'root',
})
export class SigmaService {
  private graphData = new BehaviorSubject<GraphData>({
    numberOfNodes: 0,
    numberOfEdges: 0,
  });
  currentData = this.graphData.asObservable();

  private selectedNodeData = new BehaviorSubject<{
    age: number;
    bio: string;
    color: string;
    job: string;
    label: string;
    size: number;
    x: number;
    y: number;
  }>({
    age: 0,
    bio: 'string',
    color: 'string',
    job: 'string',
    label: 'string',
    size: 0,
    x: 0,
    y: 0,
  });
  nodeData$ = this.selectedNodeData.asObservable();

  private circularLayoutTrigger = new Subject<void>();
  circularLayoutTrigger$ = this.circularLayoutTrigger.asObservable();

  private randomLayoutTrigger = new Subject<void>();
  randomLayoutTrigger$ = this.randomLayoutTrigger.asObservable();

  private allNodes = new BehaviorSubject<{ id: string; label: string }[]>([]);
  allNodesData$ = this.allNodes.asObservable();

  private searchedNode = new BehaviorSubject<string>('');
  searchedNodeOb$ = this.searchedNode.asObservable();

  private getGraph = new BehaviorSubject<{nodes: {id:string , label:string}[] , edges: {id:string , source:string , target: string}[]}>({nodes : [], edges : []});
  getGraph$ = this.getGraph.asObservable();

  private selectedGraphCategories = new BehaviorSubject<graphCategory>( {
    SourceNodeCategoryName: '',
    TargetNodeCategoryName: '',
    EdgeCategoryName: '',
  });
  selectedGraphCategories$ = this.selectedGraphCategories.asObservable();

  private sourceNodeProp = new BehaviorSubject(['']);
  sourceNodeProp$ = this.sourceNodeProp.asObservable();

  private targetNodeProp = new BehaviorSubject(['']);
  targetNodeProp$ = this.targetNodeProp.asObservable();

  private edgeProp = new BehaviorSubject(['']);
  edgeProp$ = this.edgeProp.asObservable();

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

  updateNodesList(data: { id: string; label: string }[]) {
    this.allNodes.next(data);
  }

  updateSearchedNode(node: string) {
    this.searchedNode.next(node);
  }

  setGetGraph(data: {nodes: {id:string , label:string}[] , edges: {id:string , source:string , target: string}[]}) {
    this.getGraph.next(data);
  }

  setSelectedCategories(data:graphCategory){
    this.selectedGraphCategories.next(data);
  }

  setSourceNodeProperties(data: string[]) {
    this.sourceNodeProp.next(data)
  }

  setTargetNodeProperties(data: string[]) {
    this.targetNodeProp.next(data)
  }

  setEdgeProperties(data: string[]) {
    this.edgeProp.next(data)
  }
}