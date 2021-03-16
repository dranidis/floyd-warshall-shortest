import { permutator } from './permute';
import { Edge } from './edge';

export { Edge } from './edge';

/**
 * class implementing the Floyd-Warshall algorithm for finding shortest paths.
 *
 */
export class FloydWarshall<T> {
  private directed: boolean;
  private numNodes = 0;

  private distance: number[][] = [];
  private next: number[][] = [];

  private nodeIndex: Map<T, number> = new Map();
  private node: Map<number, T> = new Map();

  /**
   * In a undirected graph provide only one of the symmetric edges. The other will be generated.
   *
   * @param edges a list of edge objects. Each edge is an object with from, to, and weight values.
   * @param directed True for directed graphs (default). False for undirected graphs.
   */
  constructor(edges: Edge<T>[], directed = true) {
    this.directed = directed;
    const connections: Map<T, Map<T, number>> = new Map();
    const numericalEdges: Edge<number>[] = [];
    edges.forEach((d) => {
      if (!connections.has(d.from)) {
        connections.set(d.from, new Map());
        this.nodeIndex.set(d.from, this.numNodes);
        this.node.set(this.numNodes, d.from);
        this.numNodes++;
      }
      const fromMap = connections.get(d.from);
      fromMap?.set(d.to, d.weight);

      if (!connections.has(d.to)) {
        connections.set(d.to, new Map());
        this.nodeIndex.set(d.to, this.numNodes);
        this.node.set(this.numNodes, d.to);
        this.numNodes++;
      }
      const toMap = connections.get(d.to);
      toMap?.set(d.from, d.weight);

      numericalEdges.push({
        from: this.nodeIndex.get(d.from) || 0,
        to: this.nodeIndex.get(d.to) || 0,
        weight: d.weight,
      });
    });

    this.initDistanceMatrix(numericalEdges);
    this.floydWarshall();
  }

  private initDistanceMatrix(edges: Edge<number>[]): void {
    for (let i = 0; i < this.numNodes; i++) {
      this.distance.push([]);
      this.next.push([]);
      for (let j = 0; j < this.numNodes; j++) {
        if (i == j) {
          this.distance[i].push(0);
          this.next[i].push(i);
        } else {
          this.distance[i].push(Infinity);
          this.next[i].push(Infinity); // null
        }
      }
    }
    edges.forEach((e) => {
      this.distance[e.from][e.to] = e.weight;
      this.next[e.from][e.to] = e.to;

      if (!this.directed) {
        this.distance[e.to][e.from] = e.weight;
        this.next[e.to][e.from] = e.from;
      }
    });
  }

  /**
   * Caculates the V x V matrix of shortest distances between all nodes V.
   */
  private floydWarshall(): void {
    for (let k = 0; k < this.numNodes; k++) {
      for (let i = 0; i < this.numNodes; i++) {
        for (let j = 0; j < this.numNodes; j++) {
          if (this.distance[i][j] > this.distance[i][k] + this.distance[k][j]) {
            this.distance[i][j] = this.distance[i][k] + this.distance[k][j];
            this.next[i][j] = this.next[i][k];
          }
        }
      }
    }
  }

  private shortestPath(u: number, v: number): number[] {
    if (this.next[u][v] == Infinity) {
      return [];
    }
    const path: number[] = [u];
    while (u != v) {
      u = this.next[u][v];
      path.push(u);
    }
    return path;
  }

  /**
   * Returns the shortest path (list of nodes) between the two parameters.
   *
   * @param from node
   * @param to node
   * @returns a list of nodes
   */
  getShortestPath(from: T, to: T): T[] {
    const fromNode = this.nodeIndex.get(from);
    const toNode = this.nodeIndex.get(to);
    if (fromNode !== undefined && toNode !== undefined) {
      const path = this.shortestPath(fromNode, toNode);
      const nodes: T[] = [];
      path.forEach((p) => {
        const node = this.node.get(p);
        if (node !== undefined) nodes.push(node);
      });
      return nodes;
    } else {
      throw new Error('Unknown node');
    }
  }

  private shortestVisitingPath(nodeArray: number[]): number[] {
    const permutations = permutator(nodeArray);
    let bestPermutation: number[] = [];
    let bestDistance = Infinity;
    permutations.forEach((permutation) => {
      let permutationDistance = 0;
      for (let i = 0; i < permutation.length - 1; i++) {
        permutationDistance += this.distance[permutation[i]][permutation[i + 1]];
      }
      if (permutationDistance < bestDistance) {
        bestDistance = permutationDistance;
        bestPermutation = permutation;
      }
    });
    let path: number[] = [];
    if (bestPermutation.length > 0) {
      path.push(bestPermutation[0]);
    }
    for (let i = 0; i < bestPermutation.length - 1; i++) {
      path = path.concat(this.shortestPath(bestPermutation[i], bestPermutation[i + 1]).slice(1));
    }

    return path;
  }

  /**
   * Returns the shortest path (list of nodes) visiting all the nodes in the parameter list.
   *
   * @param visiting an array of nodes that have to be visited by the path
   * @returns a list of nodes (the shortest path)
   */
  getShortestVisitingPath(visiting: T[]): T[] {
    const visitingNum: number[] = [];
    for (let i = 0; i < visiting.length; i++) {
      const num = this.nodeIndex.get(visiting[i]);
      if (num === undefined) throw new Error('Unknown node');
      visitingNum.push(num);
    }

    const path = this.shortestVisitingPath(visitingNum);
    const nodes: T[] = [];
    for (let i = 0; i < path.length; i++) {
      const node = this.node.get(path[i]);
      if (node !== undefined) nodes.push(node);
    }

    return nodes;
  }

  isDirected(): boolean {
    return this.directed;
  }

  /**
   * Shortest distance uses the internal distance table calculated by the
   * Floyd-Warshall algorithm to return the shortest distance between two nodes.
   *
   * @param from node
   * @param to node
   * @returns shortest distance or Infinity if the nodes are not connected
   */
  getShortestDistance(from: T, to: T): number {
    const fromNode = this.nodeIndex.get(from);
    const toNode = this.nodeIndex.get(to);
    if (fromNode !== undefined && toNode !== undefined) {
      return this.distance[fromNode][toNode];
    } else {
      throw new Error('Unknown node');
    }
  }
}
