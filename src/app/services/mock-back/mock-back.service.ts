import { Injectable } from '@angular/core';
import { MultiGraph } from 'graphology';
import Sigma from 'sigma';
import { GraphData } from '../../models/graph-data';
import { graphRecords } from '../../models/graph-records';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockBackService {
  graph!: MultiGraph;
  sigmaInstance!: Sigma;
  graphRecords!: graphRecords;

  private neighbourNodesSubject = new BehaviorSubject<{ id: string; label: string }[]>([]);

  constructor() {
    this.graph = new MultiGraph();
  }

  addNodes() {
    this.graphRecords.nodes.forEach((node) => {
      this.graph.addNode(node.id, {
        label: node.label,
      });
    });
  }

  addEdges() {
    this.graphRecords.edges.forEach((edge) => {
      this.graph.addEdge(edge.source, edge.target);
    });
  }

  setGraphData(data: graphRecords) {
    this.graphRecords = data;
    this.addNodes();
    this.addEdges();
  }

  getNeighbourById(id: string) {
    const neighboursId = this.graph.neighbors(id);

    const neighbourNodes = neighboursId.map((neighbourId) => {
      const label = this.graph.getNodeAttribute(neighbourId, 'label');
      return { id: neighbourId, label };
    });

    this.neighbourNodesSubject.next(neighbourNodes); 

    return this.neighbourNodesSubject.asObservable();
  }
}
