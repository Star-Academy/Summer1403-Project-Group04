// Function to generate a random hex color
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a random label
const getRandomLabel = (index: number): string => `Label ${index}`;

// Generate nodes with random colors
export const nodes = Array.from({ length: 184 }, (_, i) => ({
  id: `node${i}`,
  label: `Node ${i}`,
  x: Math.random() * 100, // Random x position
  y: Math.random() * 100, // Random y position
  size: Math.random() * 10 + 1, // Random size between 1 and 11
  color: getRandomColor() // Random color
}));

// Generate edges with random connections and labels
export const edges = (() => {
  const edgesArray: { source: string; target: string; label: string }[] = [];
  while (edgesArray.length < 303) {
    const source = `node${Math.floor(Math.random() * 100)}`;
    const target = `node${Math.floor(Math.random() * 100)}`;
    const label = getRandomLabel(edgesArray.length); // Generate a label for the edge

    // Check for unique connections
    if (source !== target && !edgesArray.some(e => (e.source === source && e.target === target) || (e.source === target && e.target === source))) {
      edgesArray.push({ source, target, label });
    }
  }
  return edgesArray;
})();
