import { Edge } from '../edge';
import { FloydWarshall } from '../';

test('floyd-undirected', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 0, weight: 7 },
    { from: 0, to: 3, weight: 16 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 10 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall(edges, false);

  const path = graph.getShortestPath(0, 3);
  expect(path).toEqual([0, 2, 4, 3]);
});

test('floyd-undirected with explicit nodes empty', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 0, weight: 7 },
    { from: 0, to: 3, weight: 16 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 10 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall([], edges, false);

  const path = graph.getShortestPath(0, 3);
  expect(path).toEqual([0, 2, 4, 3]);
});
test('floyd-undirected-inverse-is-equal', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 0, weight: 7 },
    { from: 0, to: 3, weight: 16 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 10 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall(edges, false);

  const path = graph.getShortestPath(3, 0);
  expect(path).toEqual([3, 4, 2, 0]);
});

test('floyd-directed with nodes empty', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 0, weight: 7 },
    { from: 0, to: 3, weight: 16 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 10 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall([], edges);

  const path = graph.getShortestPath(0, 3);
  expect(path).toEqual([0, 1, 3]);
});
test('floyd-directed', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 0, weight: 7 },
    { from: 0, to: 3, weight: 16 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 10 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall(edges);

  const path = graph.getShortestPath(0, 3);
  expect(path).toEqual([0, 1, 3]);
});
test('not connected', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];
  const graph = new FloydWarshall(edges, false);

  const path = graph.getShortestPath(0, 3);

  expect(path).toEqual([]);
});

test('node not connected', () => {
  const nodes = [0, 1, 2, 3];
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 1, to: 2, weight: 7 },
  ];
  const graph = new FloydWarshall(nodes, edges, false);

  const path = graph.getShortestPath(0, 3);

  expect(path).toEqual([]);
});

test('numberListToNodeList throws error with unknown node', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];
  const graph = new FloydWarshall(edges, false);

  expect(() => {
    // testing private method
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    graph.numberListToNodeList([0, 4]);
  }).toThrow();
});

test('getShortestPath throws error with unknown node', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];
  const graph = new FloydWarshall(edges, false);

  expect(() => {
    graph.getShortestPath(0, 4);
  }).toThrow();
});

test('constructor throws error with unknown from node', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];

  expect(() => {
    new FloydWarshall([0, 1, 3], edges, false);
  }).toThrow();
});

test('constructor throws error with unknown to node', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];

  expect(() => {
    new FloydWarshall([0, 1, 2], edges, false);
  }).toThrow();
});

test('floydArray', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 7 },
    { from: 0, to: 3, weight: 14 },
    { from: 1, to: 2, weight: 5 },
    { from: 1, to: 3, weight: 11 },
    { from: 2, to: 3, weight: 6 },
    { from: 2, to: 4, weight: 1 },
    { from: 4, to: 3, weight: 4 },
  ];
  const graph = new FloydWarshall(edges, false);

  const path = graph.getShortestVisitingPath([0, 3, 1]);

  expect(path).toEqual([0, 1, 2, 4, 3]);
});

test('not connected array', () => {
  const edges: Edge<number>[] = [
    { from: 0, to: 1, weight: 4 },
    { from: 2, to: 3, weight: 7 },
  ];
  const graph = new FloydWarshall(edges);

  const path = graph.getShortestVisitingPath([0, 3, 1]);

  expect(path).toEqual([]);
});

test('shortest path visiting all ', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'A', to: 'D', weight: 6 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 6 },
  ];
  const graph = new FloydWarshall(edges, false);

  const solution = graph.getShortestVisitingPath(['A', 'B', 'C', 'D', 'E']);
  expect(solution).toEqual(['A', 'B', 'C', 'D', 'E']);
});

test('shortest path visiting all 2', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'C', weight: 5 },
    { from: 'B', to: 'D', weight: 10 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'E', to: 'D', weight: 4 },
    { from: 'D', to: 'F', weight: 11 },
  ];
  const graph = new FloydWarshall(edges, false);

  const solution = graph.getShortestVisitingPath(['A', 'B', 'F']);
  console.log(solution);
  // expect(solution).toEqual(['B', 'A', 'C', 'E', 'D', 'F']);
  expect(solution).toEqual(['F', 'D', 'E', 'C', 'A', 'B']);
});

test('shortest visiting path with unknown node ', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 6 },
  ];
  const graph = new FloydWarshall(edges);

  expect(() => {
    graph.getShortestVisitingPath(['A', 'B', 'C', 'F', 'E']);
  }).toThrow();
});

test('getDistance ', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 6 },
  ];
  const graph = new FloydWarshall(edges);

  expect(graph.getShortestDistance('A', 'B')).toBe(1);
});

test('getDistance Infinity if not connected', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 6 },
  ];
  const graph = new FloydWarshall(edges);

  expect(graph.getShortestDistance('B', 'A')).toBe(Infinity);
});

test('getDistance ', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'C', to: 'D', weight: 4 },
    { from: 'C', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 6 },
  ];
  const graph = new FloydWarshall(edges);

  expect(graph.getShortestDistance('A', 'A')).toBe(0);
});

test('getDistance not adjacent', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 2 },
  ];
  const graph = new FloydWarshall(edges, false);

  expect(graph.getShortestDistance('A', 'C')).toBe(2);
  expect(graph.getShortestDistance('C', 'A')).toBe(2);
});

test('getDistance unknown node', () => {
  const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 1 },
    { from: 'B', to: 'C', weight: 2 },
    { from: 'A', to: 'C', weight: 2 },
  ];
  const graph = new FloydWarshall(edges, false);

  expect(() => {
    graph.getShortestDistance('C', 'D');
  }).toThrow();
});

test('isDirected ', () => {
  const edges: Edge<string>[] = [];
  const graph = new FloydWarshall(edges);

  expect(graph.isDirected()).toBe(true);
});

test('isDirected false', () => {
  const edges: Edge<string>[] = [];
  const graph = new FloydWarshall(edges, false);

  expect(graph.isDirected()).toBe(false);
});
