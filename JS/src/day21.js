const { sum, min, memoize } = require("./utils");

module.exports.part1 = (input) => {
  return input
    .map((code) => solve(numericMap, code, 2) * parseInt(code))
    .reduce(sum);
};

module.exports.part2 = (input) => {
  return input
    .map((code) => solve(numericMap, code, 25) * parseInt(code))
    .reduce(sum);
};

const solve = memoize((map, code, depth) => {
  let current = "A",
    length = 0;

  code.split("").forEach((nextPos) => {
    const paths = map.get(current + nextPos);
    if (depth == 0) {
      length += paths.map((path) => path.length).reduce(min);
    } else {
      length += paths
        .map((path) => solve(arrowMap, path, depth - 1))
        .reduce(min);
    }
    current = nextPos;
  });

  return length;
});

const buildMap = (keys) => {
  const keyLocations = new Map();
  const locations = new Set();
  keys.forEach((row, y) => {
    row.split("").forEach((key, x) => {
      if (key !== " ") {
        keyLocations.set(key, [x, y]);
        locations.add(`${x}${y}`);
      }
    });
  });

  const getPaths = (startKey, endKey) => {
    const paths = [];
    const [startX, startY] = keyLocations.get(startKey);
    if (startKey === endKey) {
      paths.push("");
    } else {
      output.set(startKey + endKey, []);
      const [endX, endY] = keyLocations.get(endKey);
      const queue = [[startX, startY, ""]];

      while (queue.length) {
        const [x, y, instructions] = queue.shift();
        if (x === endX && y === endY) {
          paths.push(instructions);
        } else {
          if (locations.has(`${x}${y}`)) {
            if (x < endX) queue.push([x + 1, y, instructions + ">"]);
            if (x > endX) queue.push([x - 1, y, instructions + "<"]);
            if (y < endY) queue.push([x, y + 1, instructions + "v"]);
            if (y > endY) queue.push([x, y - 1, instructions + "^"]);
          }
        }
      }
    }

    const isOptimal = (path) => {
      if (path.length <= 2) return true;
      let changes = 0;
      for (let i = 1; i < path.length; i++) {
        if (path[i - 1] !== path[i]) changes++;
      }
      return changes <= 1;
    };

    return paths.filter(isOptimal).map((path) => path + "A");
  };

  const output = new Map();
  for (let startKey of keyLocations.keys()) {
    for (let endKey of keyLocations.keys()) {
      if (startKey === " " || endKey === " ") continue;
      output.set(startKey + endKey, getPaths(startKey, endKey));
    }
  }

  return output;
};

const numbers = ["789", "456", "123", " 0A"];
const arrows = [" ^A", "<v>"];

const numericMap = buildMap(numbers);
const arrowMap = buildMap(arrows);
