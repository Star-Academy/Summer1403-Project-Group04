import { AfterViewInit, Component } from '@angular/core';
import Graph from 'graphology';
import Sigma from 'sigma';
import { nodes, edges } from './data'; // Adjust path if needed
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { GraphData } from '../../../../models/graph-data';
import { circular } from 'graphology-layout';
import { animateNodes } from 'sigma/utils';
import { EdgeDisplayData, NodeDisplayData, PlainObject } from 'sigma/types';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

interface State {
  hoveredNode?: string;
  searchQuery: string;

  // State derived from query:
  selectedNode?: string;
  suggestions?: Set<string>;

  // State derived from hovered node:
  hoveredNeighbors?: Set<string>;
}

@Component({
  selector: 'app-sigma',
  standalone: true,
  imports: [NzIconModule, NzToolTipModule],
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
  state: State = { searchQuery: '' };
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
        age: node.age,
        job: node.job,
        bio: node.bio,
      });
    });

    // Add edges
    edges.forEach((edge) => {
      this.graph.addEdge(edge.source, edge.target, {
        label: edge.label,
      });
    });

    this.sigmaService.circularLayoutTrigger$.subscribe(() => {
      this.circularLayout();
    });

    this.sigmaService.randomLayoutTrigger$.subscribe(() => {
      this.randomLayout();
    });

    // Initialize Sigma.js
    this.sigmaInstance = new Sigma(this.graph, document.getElementById('sigma-container') as HTMLDivElement);
    this.sigmaInstance.refresh();

    this.sigmaInstance.on('clickNode', async (event) => {
      const nodeId = event.node;
      const nodeAttributes = this.graph.getNodeAttributes(nodeId);

      this.sigmaService.changeSelectedNode(
        nodeAttributes as {
          age: number;
          bio: string;
          color: string;
          job: string;
          label: string;
          size: number;
          x: number;
          y: number;
        }
      );
      console.log(nodeAttributes);
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
      if (!this.sigmaInstance.getCustomBBox()) this.sigmaInstance.setCustomBBox(this.sigmaInstance.getBBox());
    });

    this.sigmaInstance.on('enterNode', ({ node }) => {
      this.setHoveredNode(node);
    });
 

    this.sigmaInstance.on("leaveNode", () => {
      this.setHoveredNode(undefined);
    });

    this.sigmaInstance.setSetting("nodeReducer", (node, data) => {
      const res: Partial<NodeDisplayData> = { ...data };
  
      if (this.state.hoveredNeighbors && !this.state.hoveredNeighbors.has(node) && this.state.hoveredNode !== node) {
        res.label = "";
        res.color = "#f6f6f6";
      }
  
      if (this.state.selectedNode === node) {
        res.highlighted = true;
      } else if (this.state.suggestions) {
        if (this.state.suggestions.has(node)) {
          res.forceLabel = true;
        } else {
          res.label = "";
          res.color = "#f6f6f6";
        }
      }
  
      return res;
    });

    this.sigmaInstance.setSetting("edgeReducer", (edge, data) => {
      const res: Partial<EdgeDisplayData> = { ...data };
  
      if (this.state.hoveredNode && !this.graph.hasExtremity(edge, this.state.hoveredNode)) {
        res.hidden = true;
      }
  
      if (
        this.state.suggestions &&
        (!this.state.suggestions.has(this.graph.source(edge)) || !this.state.suggestions.has(this.graph.target(edge)))
      ) {
        res.hidden = true;
      }
  
      return res;
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

  randomLayout() {
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

  setHoveredNode(node?: string) {
    if (node) {
      this.state.hoveredNode = node;
      this.state.hoveredNeighbors = new Set(this.graph.neighbors(node));
    }

    // Compute the partial that we need to re-render to optimize the refresh
    const nodes = this.graph.filterNodes((n) => n !== this.state.hoveredNode && !this.state.hoveredNeighbors?.has(n));
    const nodesIndex = new Set(nodes);
    const edges = this.graph.filterEdges((e) => this.graph.extremities(e).some((n) => nodesIndex.has(n)));

    if (!node) {
      this.state.hoveredNode = undefined;
      this.state.hoveredNeighbors = undefined;
    }

    // Refresh rendering
    this.sigmaInstance.refresh({
      partialGraph: {
        nodes,
        edges,
      },
      // We don't touch the graph data so we can skip its reindexation
      skipIndexation: true,
    });
  }
}
