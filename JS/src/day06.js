const NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3;

module.exports.part1 = (input) => {
  const [map, width, height, startPosition] = parseInput(input);
  const visited = walk(map, width, height, startPosition, NORTH);

  return visited.size;
};

module.exports.part2 = (input) => {
  const [map, width, height, startPosition] = parseInput(input);
  let loopCount = 0;

  const onPath = walk(map, width, height, startPosition, NORTH);

  for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
      const location = toLocation(x, y);
      if (map.has(location)) continue; // Skip existing obstacles
      if (!onPath.has(location)) continue; // Skip locations not on the guards path
      map.add(location);
      if (isLoop(map, width, height, startPosition, NORTH)) loopCount++;
      map.delete(location);
    }
  }
  return loopCount;
};

parseInput = (input) => {
  const width = input[0].length;
  const height = input.length;
  const map = new Set();
  let startPosition = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const location = toLocation(x + 1, y + 1);
      const char = input[y][x];

      if (char === "^") {
        startPosition = location;
      }
      if (char === "#") map.add(location);
    }
  }

  return [map, width, height, startPosition];
};

walk = (map, width, height, location, direction) => {
  const visited = new Set();
  while (inBounds(location, width, height)) {
    visited.add(location);
    let nextLocation = step(location, direction);
    while (map.has(nextLocation)) {
      direction = turn(direction);
      nextLocation = step(location, direction);
    }
    location = nextLocation;
  }
  return visited;
};

isLoop = (map, width, height, location, direction) => {
  const visited = new Set();
  while (inBounds(location, width, height)) {
    if (visited.has(location * 10 + direction)) {
      return true;
    }
    visited.add(location * 10 + direction);
    let nextLocation = step(location, direction);
    while (map.has(nextLocation)) {
      direction = turn(direction);
      nextLocation = step(location, direction);
    }
    location = nextLocation;
  }
  return false;
};

toLocation = (x, y) => x * 1000 + y;
toXY = (location) => [Math.trunc(location / 1000), location % 1000];
toX = (location) => Math.trunc(location / 1000);
toY = (location) => location % 1000;
turn = (direction) => (direction + 1) % 4;
step = (location, direction) => {
  switch (direction) {
    case NORTH:
      return location - 1;
    case EAST:
      return location + 1000;
    case SOUTH:
      return location + 1;
    case WEST:
      return location - 1000;
  }
};
inBounds = (location, width, height) => {
  const [x, y] = toXY(location);
  return x >= 1 && x <= width && y >= 1 && y <= height;
};
