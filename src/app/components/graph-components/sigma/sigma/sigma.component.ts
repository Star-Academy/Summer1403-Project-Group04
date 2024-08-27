import { AfterViewInit, Component } from '@angular/core';
import { MultiGraph } from 'graphology';
import Sigma from 'sigma';
import { nodes, edges } from './data';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SigmaService } from '../../../../services/sigma/sigma.service';
import { GraphData } from '../../../../models/graph-data';
import { circular } from 'graphology-layout';
import { animateNodes } from 'sigma/utils';
import { Coordinates, EdgeDisplayData, NodeDisplayData, PlainObject } from 'sigma/types';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EdgeArrowProgram } from 'sigma/rendering';
import { EdgeCurvedArrowProgram } from '@sigma/edge-curve';
import { MockBackService } from '../../../../services/mock-back/mock-back.service';
import { State } from '../../../../models/graph-state';

// ********** This component can be a bit confusing so I have to use comments to ease the understanding (Sorry if the comments are a bit informal ^.^) **********

@Component({
  selector: 'app-sigma',
  standalone: true,
  imports: [NzIconModule, NzToolTipModule],
  templateUrl: './sigma.component.html',
  styleUrl: './sigma.component.scss',
})
export class SigmaComponent implements AfterViewInit {
  private initialCameraState: { x: number; y: number; ratio: number } | null = null;
  private sigmaInstance!: Sigma;
  private nodes = 0;
  private draggedNode: string | null = null;
  private isDragging = false;
  private graph!: MultiGraph;
  private state: State = { searchQuery: '' };
  private cancelCurrentAnimation: (() => void) | null = null;

  constructor(private sigmaService: SigmaService, private mockBack: MockBackService) {}

  ngAfterViewInit() {
    this.graph = new MultiGraph();

    document.getElementById('sigma-container')?.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.initializeGraph();

    this.graph.addNode(this.mockBack.addSingleNode('0')?.id, {
      label: this.mockBack.addSingleNode('0')?.label,
      x: this.mockBack.addSingleNode('0')?.x,
      y: this.mockBack.addSingleNode('0')?.y,
      size: this.mockBack.addSingleNode('0')?.size,
      color: this.mockBack.addSingleNode('0')?.color,
    });

    this.subscribeToServices();

    this.updateNodesList(
      this.graph.nodes().map((node) => ({
        id: node,
        label: this.graph.getNodeAttribute(node, 'label'),
      }))
    );

    this.nodeClickHandler();

    this.doubleClickHandler();

    this.sendGraphData();

    this.initializeCameraState();

    this.addDragNodeFuntionality();

    this.sigmaInstance.getMouseCaptor().on('mousedown', () => {
      if (!this.sigmaInstance.getCustomBBox()) this.sigmaInstance.setCustomBBox(this.sigmaInstance.getBBox());
    });

    this.handleLeaveNode();

    this.nodeSetting();

    this.setReducerSetting();
  }

  protected resetCamera() {
    if (this.initialCameraState) {
      const camera = this.sigmaInstance.getCamera();
      camera.setState({
        x: this.initialCameraState.x,
        y: this.initialCameraState.y,
        ratio: this.initialCameraState.ratio,
      });
    }
  }

  protected zoomIn() {
    const camera = this.sigmaInstance.getCamera();
    camera.ratio = camera.ratio * 0.9;
    this.sigmaInstance.refresh();
  }

  protected zoomOut() {
    const camera = this.sigmaInstance.getCamera();
    camera.ratio = camera.ratio * 1.1;
    this.sigmaInstance.refresh();
  }

  protected circularLayout() {
    const circularPositions = circular(this.graph, { scale: 1 });
    console.log(circularPositions);

    this.cancelCurrentAnimation = animateNodes(this.graph, circularPositions, {
      duration: 2000,
      easing: 'linear',
    });
  }

  protected randomLayout() {
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
    console.log(randomPositions);

    this.cancelCurrentAnimation = animateNodes(this.graph, randomPositions, { duration: 2000 });
  }

  protected setHoveredNode(node?: string) {
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
      skipIndexation: true,
    });
  }

  private addNodes() {
    nodes.forEach((node) => {
      this.graph.addNode(node.id, {
        label: node.label,
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
      });
    });
  }

  private addEdges() {
    // Add edges
    edges.forEach((edge) => {
      this.graph.addEdge(edge.source, edge.target, edge.attr);
    });
  }

  private addDragNodeFuntionality() {
    this.sigmaInstance.on('downNode', (e) => {
      this.isDragging = true;
      this.draggedNode = e.node;

      this.graph.setNodeAttribute(this.draggedNode, 'highlighted', true);
    });

    // While dragging a node, update its position based on mouse movement.
    // Also, stop Sigma from moving the camera during the drag.
    this.sigmaInstance.getMouseCaptor().on('mousemovebody', (e) => {
      if (!this.isDragging || !this.draggedNode) return;
      const pos = this.sigmaInstance.viewportToGraph(e);

      this.graph.setNodeAttribute(this.draggedNode, 'x', pos.x);
      this.graph.setNodeAttribute(this.draggedNode, 'y', pos.y);

      // Prevent sigma to move camera:
      e.preventSigmaDefault();
      e.original.preventDefault();
      e.original.stopPropagation();
    });

    // When the mouse is released, stop dragging the node.
    // Remove the highlight from the node and reset dragging state.
    this.sigmaInstance.getMouseCaptor().on('mouseup', () => {
      if (this.draggedNode) {
        this.graph.removeNodeAttribute(this.draggedNode, 'highlighted');
      }
      this.isDragging = false;
      this.draggedNode = null;
    });
  }

  private updateNodesList(nodes: { id: string; label: string }[]) {
    this.sigmaService.updateNodesList(nodes);
  }

  private nodeSetting() {
    this.sigmaInstance.setSetting('nodeReducer', (node, data) => {
      const res: Partial<NodeDisplayData> = { ...data };
      if (this.state.selectedNode === node) {
        res.highlighted = true;
      }

      if (this.state.hoveredNeighbors && !this.state.hoveredNeighbors.has(node) && this.state.hoveredNode !== node) {
        res.label = '';
        res.color = '#f6f6f6';
      }

      if (this.state.selectedNode === node) {
        res.highlighted = true;
      } else if (this.state.suggestions) {
        if (this.state.suggestions.has(node)) {
          res.forceLabel = true;
        } else {
          res.label = '';
          res.color = '#f6f6f6';
        }
      }

      return res;
    });
  }

  private expandNode(id: string, neighbors: {id:string , label: string , x: number , y:number , size: number , color:string}[]) {
    console.log(neighbors);
    
    const centerX = this.graph.getNodeAttribute(id, 'x');
    const centerY = this.graph.getNodeAttribute(id, 'y');
    const newPositions: PlainObject<PlainObject<number>> = {};
    const hasOtherNeighbors = (nodeId: string, clickedNodeId: string) => {
      const allNeighbors = this.graph.neighbors(nodeId);
      return allNeighbors.some((neighborId: string) => neighborId !== clickedNodeId);
    };

    if (this.graph.getNodeAttribute(id, 'expanded') === true) {
      neighbors.forEach((node: {id:string , label: string , x: number , y:number , size: number , color:string}) => {
        if (!hasOtherNeighbors(node.id, id)) {
          newPositions[node.id] = {
            x: centerX,
            y: centerY,
          };
          setTimeout(() => {
            this.graph.dropNode(node.id);
          }, 300);
        }
      });
      this.graph.setNodeAttribute(id, 'expanded', false);
      animateNodes(this.graph, newPositions, { duration: 300 });
    } else {
      if (centerX !== undefined && centerY !== undefined) {
        neighbors.forEach((node: {id:string , label: string , x: number , y:number , size: number , color:string}, index: number) => {
          const angle = (index * (2 * Math.PI)) / neighbors.length;
          const radius = 0.2;

          const newX = centerX + radius * Math.cos(angle);
          const newY = centerY + radius * Math.sin(angle);

          if (!this.graph.hasNode(node.id)) {
            this.graph.addNode(node.id, {
              label: node.label,
              x: node.x,
              y: node.y,
              size: node.size,
              color: node.color,
            });
            this.graph.setNodeAttribute(node.id, 'x', centerX);
            this.graph.setNodeAttribute(node.id, 'y', centerY);
            newPositions[node.id] = {
              x: newX,
              y: newY,
            };
          }

          this.sigmaInstance.refresh();
          this.graph.setNodeAttribute(node.id, 'hidden', false);
        });
        this.mockBack.getEdgesForNeighbors(id).forEach((edge) => {
          this.graph.addEdge(edge.source, edge.target, edge.attr);
        });
        this.graph.setNodeAttribute(id, 'expanded', true);
        animateNodes(this.graph, newPositions, { duration: 300 });
      }
    }
  }

  private initializeGraph() {
    this.sigmaInstance = new Sigma(this.graph, document.getElementById('sigma-container') as HTMLDivElement, {
      allowInvalidContainer: true,
      defaultEdgeType: 'curved',
      renderEdgeLabels: true,
      edgeProgramClasses: {
        straight: EdgeArrowProgram,
        curved: EdgeCurvedArrowProgram,
      },
    });
    this.sigmaInstance.refresh();
  }

  private subscribeToServices() {
    this.sigmaService.circularLayoutTrigger$.subscribe(() => {
      this.circularLayout();
    });

    this.sigmaService.randomLayoutTrigger$.subscribe(() => {
      this.randomLayout();
    });

    this.sigmaService.searchedNodeOb$.subscribe((node) => {
      this.state.selectedNode = node;
      const nodePosition = this.sigmaInstance.getNodeDisplayData(node) as Coordinates;

      this.sigmaInstance.getCamera().animate(nodePosition, { duration: 500 });
      this.nodeSetting();
    });
  }

  private nodeClickHandler() {
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
    });
  }

  private doubleClickHandler() {
    this.sigmaInstance.on('doubleClickNode', (event) => {
      event.preventSigmaDefault();
      this.expandNode(event.node, this.mockBack.getNeighbours(event.node));
    });
    this.sigmaInstance.on('doubleClickStage', (e) => {
      e.preventSigmaDefault();
    });
  }

  private sendGraphData() {
    const data: GraphData = {
      numberOfNodes: this.graph.order,
      numberOfEdges: this.graph.size,
    };
    this.sigmaService.changeData(data);
  }

  private initializeCameraState() {
    const camera = this.sigmaInstance.getCamera();
    this.initialCameraState = {
      x: camera.x,
      y: camera.y,
      ratio: camera.ratio,
    };
  }

  private handleEnterNode() {
    this.sigmaInstance.on('enterNode', ({ node }) => {
      this.setHoveredNode(node);
    });
  }

  private handleLeaveNode() {
    this.sigmaInstance.on('leaveNode', () => {
      this.setHoveredNode(undefined);
    });
  }

  private setReducerSetting() {
    this.sigmaInstance.setSetting('edgeReducer', (edge, data) => {
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
}
