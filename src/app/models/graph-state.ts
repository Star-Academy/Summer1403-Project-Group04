export interface State {
  hoveredNode?: string;
  searchQuery: string;

  selectedNode?: string;
  suggestions?: Set<string>;

  hoveredNeighbors?: Set<string>;
}
