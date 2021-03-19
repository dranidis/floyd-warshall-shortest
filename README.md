[![npm version](https://badge.fury.io/js/floyd-warshall-shortest.svg)](https://badge.fury.io/js/floyd-warshall-shortest)
[![Build Status](https://travis-ci.com/dranidis/floyd-warshall-shortest.svg?branch=main)](https://travis-ci.com/dranidis/floyd-warshall-shortest)
[![Coverage Status](https://coveralls.io/repos/github/dranidis/floyd-warshall-shortest/badge.svg)](https://coveralls.io/github/dranidis/floyd-warshall-shortest)
[![Dependencies Status](https://status.david-dm.org/gh/dranidis/floyd-warshall-shortest.svg)](https://status.david-dm.org/gh/dranidis/floyd-warshall-shortest)

# floyd-warshall-shortest

The Floyd–Warshall algorithm finds the shortest paths (and distances) in a directed weighted graph with positive or negative edge weights.
For more information read: https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm

The package implements three functions returning

- the shortestPath between two nodes
- the shortestPath visiting all nodes in a list (in any order)
- the shortest distance between two nodes

Undirected graphs are supported by passing false as the second parameter to the constructor. In this case, for each edge passed to the constructor its symmetric edge is also added to the graph.

## Install

```
npm i floyd-warshall-shortest
```

## Usage

The following graph is used in the examples below:

[![graph](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Shortest_path_with_direct_weights.svg/250px-Shortest_path_with_direct_weights.svg.png)](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Shortest_path_with_direct_weights.svg/250px-Shortest_path_with_direct_weights.svg.png)

### Javascript

```javascript
fw = require('floyd-warshall-shortest');

edges = [
  { from: 'A', to: 'B', weight: 4 },
  { from: 'A', to: 'C', weight: 2 },
  { from: 'B', to: 'C', weight: 5 },
  { from: 'B', to: 'D', weight: 10 },
  { from: 'C', to: 'E', weight: 3 },
  { from: 'E', to: 'D', weight: 4 },
  { from: 'D', to: 'F', weight: 11 },
];

graph = new fw.FloydWarshall(edges);

path = graph.getShortestPath('A', 'F');
// [ 'A', 'C', 'E', 'D', 'F' ]
distance = graph.getShortestDistance('A', 'F');
// 20
path = graph.getShortestVisitingPath(['A', 'B', 'F']);
// [ 'A', 'B', 'D', 'F' ]
```

### Typescript

```typescript
import { FloydWarshall, Edge } from 'floyd-warshall-shortest';

const edges: Edge<string>[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'C', weight: 5 },
    { from: 'B', to: 'D', weight: 10 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'E', to: 'D', weight: 4 },
    { from: 'D', to: 'F', weight: 11 },
  ];
  const graph = new FloydWarshall(edges, false); // undirected edges!!!

  const path = graph.getShortestVisitingPath(['A', 'B', 'F']);
  // ['B', 'A', 'C', 'E', 'D', 'F']

  ....
```

## Available constructors

```typescript
const nodes = ['a', 'b', 'c'];
const edges = [{ from: 'a', to: 'c', weight: 1 }];

/**
 * FloydWarshall<T>(nodes: T[], edges: Edge<T>[], directed = true)
 *
 * nodes are explicitly specified.
 *
 */

// creates a directed graph with the explicit set of nodes and edges.
const g2 = new FloydWarshall(nodes, edges);

// creates an undirected graph with the explicit set of nodes and edges.
const g1 = new FloydWarshall(nodes, edges, false);

/**
 * FloydWarshall<T>(edges: Edge<T>[], directed = true)
 *
 * nodes are implicitly defined from edges
 *
 */

// creates a directed graph with the imllicit set of nodes: {'a', 'c'}
const g3 = new FloydWarshall(edges);

// creates an undirected graph with the implicit set of nodes: {'a', 'c'}
const g3 = new FloydWarshall(edges, false);
```
