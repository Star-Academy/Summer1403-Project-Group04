import { AfterViewInit, Component } from '@angular/core';
import Graph from 'graphology';
import Sigma from 'sigma';
import { nodes, edges } from './data'; // Adjust path if needed
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { GraphData } from '../../../../models/graph-data';
import { circular } from 'graphology-layout';
import { animateNodes } from 'sigma/utils';
import { PlainObject } from 'sigma/types';



@Component({
  selector: 'app-sigma',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './sigma.component.html',
  styleUrl: './sigma.component.scss',
})
export class SigmaComponent implements AfterViewInit {
  initialCameraState: { x: number; y: number; ratio: number } | null = null;
  sigmaInstance!: Sigma;
  nodes = 0;
  draggedNode: string | null = null;
  isDragging = false;
  graph!: Graph;
  cancelCurrentAnimation: (() => void) | null = null;

  constructor(private sigmaService: SigmaService) {}

  ngAfterViewInit() {
    // Create a new graph instance
    this.graph = new Graph();

    // Add nodes
    nodes.forEach((node) => {
      this.graph.addNode(node.id, {
        label: node.label,
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
      });
    });

    // Add edges
    edges.forEach((edge) => {
      this.graph.addEdge(edge.source, edge.target , {
        label: edge.label
      });
    });

    this.sigmaService.circularLayoutTrigger$.subscribe(() => {
      console.log('Layout trigger received');
      this.circularLayout();
    });

    this.sigmaService.randomLayoutTrigger$.subscribe(() => {
      console.log('Layout trigger received');
      this.randomLayout();
    });

    // Initialize Sigma.js
    this.sigmaInstance = new Sigma(
      this.graph,
      document.getElementById('sigma-container') as HTMLDivElement,
      
    );
    this.sigmaInstance.refresh();

    this.sigmaInstance.on('clickNode', (event) => {
      const nodeKey = event.node;
      this.sigmaService.changeSelectedNode(nodeKey);
    });

    const data: GraphData = {
      numberOfNodes: this.graph.order, 
      numberOfEdges: this.graph.size, 
    };
    this.sigmaService.changeData(data);
    

    const camera = this.sigmaInstance.getCamera();
    this.initialCameraState = {
      x: camera.x,
      y: camera.y,
      ratio: camera.ratio,
    };

    this.sigmaInstance.on('downNode', (e) => {
      this.isDragging = true;
      this.draggedNode = e.node;
      console.log(e.node);

      this.graph.setNodeAttribute(this.draggedNode, 'highlighted', true);
    });

    this.sigmaInstance.getMouseCaptor().on('mousemovebody', (e) => {
      if (!this.isDragging || !this.draggedNode) return;
      console.log(e);
      const pos = this.sigmaInstance.viewportToGraph(e);

      this.graph.setNodeAttribute(this.draggedNode, 'x', pos.x);
      this.graph.setNodeAttribute(this.draggedNode, 'y', pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    this.sigmaInstance.getMouseCaptor().on('mouseup', () => {
      if (this.draggedNode) {
        this.graph.removeNodeAttribute(this.draggedNode, 'highlighted');
      }
      this.isDragging = false;
      this.draggedNode = null;
    });

    this.sigmaInstance.getMouseCaptor().on('mousedown', () => {
      if (!this.sigmaInstance.getCustomBBox())
        this.sigmaInstance.setCustomBBox(this.sigmaInstance.getBBox());
    });
  }

  resetCamera() {
    if (this.initialCameraState) {
      const camera = this.sigmaInstance.getCamera();
      camera.setState({
        x: this.initialCameraState.x,
        y: this.initialCameraState.y,
        ratio: this.initialCameraState.ratio,
      });
    }
  }

  zoomIn() {
    const camera = this.sigmaInstance.getCamera();
    console.log(camera.ratio);
    camera.ratio = camera.ratio * 0.9;
    this.sigmaInstance.refresh();
  }

  zoomOut() {
    const camera = this.sigmaInstance.getCamera();
    camera.ratio = camera.ratio * 1.1;
    this.sigmaInstance.refresh();
  }

  circularLayout() {
    const circularPositions = circular(this.graph, { scale: 100 });

    this.cancelCurrentAnimation = animateNodes(this.graph, circularPositions, {
      duration: 2000,
      easing: 'linear',
    });
  }

  randomLayout(){
    console.log('random layout method');
    
    if (this.cancelCurrentAnimation) this.cancelCurrentAnimation();

    const xExtents = { min: 0, max: 0 };
    const yExtents = { min: 0, max: 0 };

    this.graph.forEachNode((node, attributes) => {
      xExtents.min = Math.min(attributes['x'], xExtents.min);
      xExtents.max = Math.max(attributes['x'], xExtents.max);
      yExtents.min = Math.min(attributes['y'], yExtents.min);
      yExtents.max = Math.max(attributes['y'], yExtents.max);
    });

    const randomPositions: PlainObject<PlainObject<number>> = {};

    this.graph.forEachNode((node) => {
      // create random positions respecting position extents
      randomPositions[node] = {
        x: Math.random() * (xExtents.max - xExtents.min),
        y: Math.random() * (yExtents.max - yExtents.min),
      };
    });

    this.cancelCurrentAnimation = animateNodes(this.graph, randomPositions, { duration: 2000 });
  }
}
