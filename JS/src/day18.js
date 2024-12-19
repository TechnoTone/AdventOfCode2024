module.exports.part1 = (input, gridSize, count) => {
  return bfs(gridSize, new Set(input.slice(0, count)));
};

module.exports.part2 = (input, gridSize) => {
  let low = 0;
  let high = input.length;

  while (low < high - 1) {
    const mid = Math.floor((low + high) / 2);
    if (mid === low || mid === high) {
      break;
    }
    if (bfs(gridSize, new Set(input.slice(0, mid + 1)))) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return input[high];
};

const getLocationKey = (x, y) => `${x},${y}`;

const bfs = (gridSize, blocked) => {
  const queue = [{ x: 0, y: 0, steps: 0 }];
  const visited = new Set([getLocationKey(0, 0)]);

  const testAndAddToQueue = (x, y, steps) => {
    if (x < 0 || x > gridSize || y < 0 || y > gridSize) return;
    const key = getLocationKey(x, y);
    if (visited.has(key) || blocked.has(key)) return;
    visited.add(key);
    queue.push({ x, y, steps });
  };

  while (queue.length) {
    const { x, y, steps } = queue.shift();
    if (x === gridSize && y === gridSize) return steps;
    testAndAddToQueue(x + 1, y, steps + 1);
    testAndAddToQueue(x - 1, y, steps + 1);
    testAndAddToQueue(x, y + 1, steps + 1);
    testAndAddToQueue(x, y - 1, steps + 1);
  }
};
