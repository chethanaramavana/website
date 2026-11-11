// Permanent issue numbers: append new stories; never renumber an existing link.
export const natureStories = [{
  number: 1,
  date: '2026-11-10',
  title: 'A spoonful of honey hides a maths story',
  description: 'Triangles and squares fit too. Discover why regular pentagons leave gaps and why hexagons save wall material.',
  href: '/maths-around-us/1',
  poster: '/maths-around-us/1-honeycomb-poster.png',
}, {
  number: 2,
  date: '2026-11-11',
  title: 'One big pizza or two small ones?',
  description: 'Compare the two orders. Which gives you more pizza?',
  href: '/maths-around-us/2',
  poster: '/maths-around-us/2-pizza-poster.png',
}] as const;

export const cellShapes = [
  { sides: 3, name: 'Triangle', angle: 60, count: 6, tiles: true },
  { sides: 4, name: 'Square', angle: 90, count: 4, tiles: true },
  { sides: 5, name: 'Regular pentagon', angle: 108, count: 3, tiles: false },
  { sides: 6, name: 'Hexagon', angle: 120, count: 3, tiles: true },
] as const;

export function cellPerimeter(sides: number, area: number) {
  return Math.sqrt(4 * sides * area * Math.tan(Math.PI / sides));
}

// Put one vertex at the origin with its interior angle between 0 and alpha.
export function cornerPolygon(sides: number, side: number) {
  let x = 0, y = 0;
  const points: [number, number][] = [[x, y]];
  for (let edge = 0; edge < sides - 1; edge++) {
    x += side * Math.cos(edge * 2 * Math.PI / sides);
    y += side * Math.sin(edge * 2 * Math.PI / sides);
    points.push([x, y]);
  }
  return points.map(p => p.map(v => +v.toFixed(4)).join(',')).join(' ');
}
