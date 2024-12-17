module.exports.part1 = (input) => {
  const parsed = parse(input);
  return findBestScore(parsed);
};

module.exports.part2 = (input) => {
  const parsed = parse(input);
  const bestScore = findBestScore(parsed);
  return findBestLocationCount(parsed, bestScore);
};

const parse = (input) => {
  const width = input[0].length;
  const height = input.length;

  let start = [];
  let end = [];
  const paths = new Set();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === "S") {
        start = { x, y };
      } else if (input[y][x] === "E") {
        end = { x, y };
        paths.add(toLocation(end));
      } else if (input[y][x] === ".") {
        paths.add(toLocation({ x, y }));
      }
    }
  }

  return { start, end, paths };
};

const findBestScore = ({ start, end, paths }) => {
  const bestScores = new Map();
  bestScores.set(key("E", toLocation(start)), 0);

  const queue = [
    {
      position: start,
      visited: new Set([toLocation(start)]),
      direction: "E",
      score: 0,
      route: "",
    },
  ];

  while (queue.length) {
    const current = queue.shift();
    queue.push(...getNextSteps(current, paths, bestScores));
  }

  return ["N", "E", "S", "W"]
    .map((d) => bestScores.get(key(d, toLocation(end))))
    .reduce((a, b) => Math.min(a || Infinity, b || Infinity), Infinity);
};

const findBestLocationCount = ({ start, end, paths }, bestScore) => {
  const bestScores = new Map();
  bestScores.set(key("E", toLocation(start)), 0);

  const queue = [
    {
      position: start,
      visited: new Set([toLocation(start)]),
      direction: "E",
      score: 0,
      route: "",
    },
  ];

  const tilesOnBestRoutes = new Set();

  while (queue.length) {
    const current = queue.shift();

    if (current.score > bestScore) continue;
    if (
      current.position.x === end.x &&
      current.position.y === end.y &&
      current.score === bestScore
    ) {
      current.visited.forEach((l) => tilesOnBestRoutes.add(l));
    }

    queue.push(...getNextSteps(current, paths, bestScores));
  }

  return tilesOnBestRoutes.size;
};

const toLocation = ({ x, y }) => `${x},${y}`;
const key = (direction, location) => `${direction}:${location}`;

const turnCW = { N: "E", E: "S", S: "W", W: "N" };
const turnCCW = { N: "W", W: "S", S: "E", E: "N" };

const step = (d, position) => {
  switch (d) {
    case "N":
      return { x: position.x, y: position.y - 1 };
    case "E":
      return { x: position.x + 1, y: position.y };
    case "S":
      return { x: position.x, y: position.y + 1 };
    case "W":
      return { x: position.x - 1, y: position.y };
  }
};

const getNextSteps = (current, paths, bestScores) => {
  const result = [];

  const isValid = (direction, location, score) =>
    paths.has(location) &&
    !current.visited.has(location) &&
    (bestScores.get(key(direction, location)) || Infinity) >= score;

  let next = step(current.direction, current.position);
  let nextLocation = toLocation(next);
  if (isValid(current.direction, nextLocation, current.score + 1)) {
    result.push({
      position: next,
      direction: current.direction,
      visited: new Set([...current.visited, nextLocation]),
      score: current.score + 1,
      route: current.route + current.direction,
    });
    bestScores.set(key(current.direction, nextLocation), current.score + 1);
  }

  next = step(turnCCW[current.direction], current.position);
  nextLocation = toLocation(next);
  if (isValid(turnCCW[current.direction], nextLocation, current.score + 1001)) {
    result.push({
      position: next,
      direction: turnCCW[current.direction],
      visited: new Set([...current.visited, nextLocation]),
      score: current.score + 1001,
      route: current.route + turnCCW[current.direction],
    });
    bestScores.set(
      key(turnCCW[current.direction], nextLocation),
      current.score + 1001
    );
  }

  next = step(turnCW[current.direction], current.position);
  nextLocation = toLocation(next);
  if (isValid(turnCW[current.direction], nextLocation, current.score + 1001)) {
    result.push({
      position: next,
      direction: turnCW[current.direction],
      visited: new Set([...current.visited, nextLocation]),
      score: current.score + 1001,
      route: current.route + turnCW[current.direction],
    });
    bestScores.set(
      key(turnCW[current.direction], nextLocation),
      current.score + 1001
    );
  }

  return result;
};
