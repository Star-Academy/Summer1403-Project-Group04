import { Injectable, OnInit } from '@angular/core';
import { EdgeCurvedArrowProgram } from '@sigma/edge-curve';
import { MultiGraph } from 'graphology';
import Sigma from 'sigma';
import { EdgeArrowProgram } from 'sigma/rendering';

@Injectable({
  providedIn: 'root',
})
export class MockBackService implements OnInit {
  graph!: MultiGraph;
  sigmaInstance!: Sigma;

  nodes = [
    {
      id: '0',
      label: 'A',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '1',
      label: 'B',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '2',
      label: 'C',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '3',
      label: 'D',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '4',
      label: 'E',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '5',
      label: 'X',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '6',
      label: 'Y',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '7',
      label: 'expand me',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '8',
      label: 'F',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '9',
      label: 'G',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
    {
      id: '10',
      label: 'H',
      x: 0,
      y: 0,
      size: 20,
      color: '#000',
    },
  ];
  

  edges = [
    {
      source: '3',
      target: '0',
      attr: {
        label: 'Mamad',
        size: 10,
      },
    },
    {
      source: '1',
      target: '0',
      attr: {
        label: 'Mamad',
        size: 10,
      },
    },
    {
      source: '2',
      target: '0',
      attr: {
        label: 'Mamad',
        size: 10,
      },
    },
    {
      source: '0',
      target: '4',
      attr: {
        label: 'Mamad',
        size: 10,
        curvature: 0.1,
      },
    },
    {
      source: '0',
      target: '4',
      attr: {
        label: 'Mamad 2',
        size: 10,
        curvature: 1,
      },
    },
    {
      source: '4',
      target: '0',
      attr: {
        label: 'Mamad 2',
        size: 10,
        curvature: 0.8,
      },
    },
    {
      source: '4',
      target: '5',
      attr: {
        label: 'x 2',
        size: 10,
        curvature: 0.8,
      },
    },
    {
      source: '4',
      target: '6',
      attr: {
        label: 'x 2',
        size: 10,
        curvature: 0.8,
      },
    },
    {
      source: '4',
      target: '7', // Connect 'E' to 'expand me'
      attr: {
        label: 'connection to expand me',
        size: 10,
      },
    },
    {
      source: '7',
      target: '8', // Connect 'expand me' to 'F'
      attr: {
        label: 'expand me to F',
        size: 10,
      },
    },
    {
      source: '7',
      target: '9', // Connect 'expand me' to 'G'
      attr: {
        label: 'expand me to G',
        size: 10,
      },
    },
    {
      source: '7',
      target: '10', // Connect 'expand me' to 'H'
      attr: {
        label: 'expand me to H',
        size: 10,
      },
    },
  ];
  

  constructor() {
    this.graph = new MultiGraph();

    // this.sigmaInstance = new Sigma(this.graph, document.getElementById('sigma-container') as HTMLDivElement, {
    //   allowInvalidContainer: true,
    //   defaultEdgeType: 'curved',
    //   renderEdgeLabels: true,
    //   edgeProgramClasses: {
    //     straight: EdgeArrowProgram,
    //     curved: EdgeCurvedArrowProgram,
    //   },
    // });
    // this.sigmaInstance.refresh();
    this.addNodes();
    this.addEdges();
  }
  ngOnInit(): void {
    this.addNodes();
    this.addEdges();
  }

  addSingleNode(id: string) {
    return this.nodes.find((node) => node.id === id) || null;
  }

  addNodes() {
    this.nodes.forEach((node) => {
      this.graph.addNode(node.id, {
        label: node.label,
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
      });
    });
  }

  addEdges() {
    // Add edges
    this.edges.forEach((edge) => {
      this.graph.addEdge(edge.source, edge.target, edge.attr);
    });
    console.log(this.graph);
    
  }

  getNeighbours(id:string){
    const neighborIds = this.graph.neighbors(id);

    // Filter nodes that match the neighbor IDs
    const matchingNodes = this.nodes.filter((node) => neighborIds.includes(node.id));
  
    return matchingNodes;
  }

  getEdgesForNeighbors(id: string) {
    const neighborIds = this.graph.neighbors(id);

    // Include the original node ID to get edges connected to the node and its neighbors
    const relevantIds = [id, ...neighborIds];
  
    // Filter edges where both ends are in the relevant IDs (direct neighbors)
    const matchingEdges = this.edges.filter(
      (edge) => relevantIds.includes(edge.source) && relevantIds.includes(edge.target)
    );
  
    return matchingEdges;
  }
}
