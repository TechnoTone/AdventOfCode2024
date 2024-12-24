const { bronKerbosch } = require("./utils");

module.exports.part1 = (input) => {
  const connections = getDirectedConnections(input);

  const queue = [];
  for (const [head, children] of connections) {
    for (const child of children) {
      queue.push({ head, chain: [child] });
    }
  }

  const triplets = [];

  while (queue.length) {
    const { head, chain } = queue.shift();
    if (chain.length > 2) continue;

    if (chain.length === 2 && connections.get(head).has(chain[1])) {
      triplets.push([head, ...chain]);
    }

    const next = connections.get(chain[chain.length - 1]);
    if (chain.length < 2 && next) {
      for (const n of next) {
        queue.push({ head, chain: [...chain, n] });
      }
    }
  }

  return triplets.filter((t) => t.some((s) => s.startsWith("t"))).length;
};

module.exports.part2 = (input) => {
  const edges = input.map((line) => line.split("-"));

  const graph = new Map();
  for (let edge of edges) {
    let [u, v] = edge;
    graph.set(u, (graph.get(u) || new Set()).add(v));
    graph.set(v, (graph.get(v) || new Set()).add(u));
  }

  const vertices = new Set(graph.keys());

  const allCliques = bronKerbosch(new Set(), vertices, new Set(), graph);

  const biggestClique = [...allCliques].reduce((acc, clique) => {
    if (acc.size < clique.size) return clique;
    return acc;
  }, new Set());

  return [...biggestClique].toSorted().join(",");
};

const getDirectedConnections = (input) => {
  const connections = new Map();

  input.forEach((line) => {
    const [a, b] = line.split("-");
    if (a < b) {
      if (!connections.has(a)) connections.set(a, new Set());
      connections.get(a).add(b);
    } else {
      if (!connections.has(b)) connections.set(b, new Set());
      connections.get(b).add(a);
    }
  });

  return connections;
};
