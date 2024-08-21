import { faker } from '@faker-js/faker';

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

// Generate nodes with random attributes using Faker
export const nodes = Array.from({ length: 20 }, (_, i) => ({
  id: `node${i}`,
  label: faker.person.fullName(), // Random name
  x: Math.random() * 100, // Random x position
  y: Math.random() * 100, // Random y position
  size: 10, // Random size between 1 and 11
  color: getRandomColor(), // Random color
  age: faker.number.int({ min: 18, max: 65 }), // Random age between 18 and 65
  job: faker.person.jobTitle(), // Random job title
  bio: faker.person.bio(), // Random favorite food
}));

// Generate edges with random connections and labels
export const edges = (() => {
  const edgesArray: { source: string; target: string; label: string }[] = [];
  while (edgesArray.length < 30) {
    const source = `node${Math.floor(Math.random() * 20)}`;
    const target = `node${Math.floor(Math.random() * 20)}`;
    const label = getRandomLabel(edgesArray.length); // Generate a label for the edge

    // Check for unique connections
    if (
      source !== target &&
      !edgesArray.some(
        (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
      )
    ) {
      edgesArray.push({ source, target, label });
    }
  }
  return edgesArray;
})();
