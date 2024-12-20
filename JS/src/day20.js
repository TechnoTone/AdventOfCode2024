module.exports.EXACT = "EXACT";
module.exports.AT_LEAST = "AT_LEAST";

module.exports.part1 = (input, picosecondsSaved, comparison) => {
  const { shortestPath } = parse(input);
  return countShortcuts(shortestPath, 2, picosecondsSaved, comparison);
};

module.exports.part2 = (input, picosecondsSaved, comparison) => {
  const { shortestPath } = parse(input);
  return countShortcuts(shortestPath, 20, picosecondsSaved, comparison);
};

const parse = (input) => {
  const track = new Set();
  const walls = new Set();
  let start = null;
  let end = null;

  input.forEach((line, y) => {
    line.split("").forEach((c, x) => {
      if (c === "#") {
        walls.add(key(x, y));
      } else {
        track.add(key(x, y));
      }
      if (c === "S") start = { x, y };
      if (c === "E") end = { x, y };
    });
  });

  const isEnd = (x, y) => x === end.x && y === end.y;
  const isTrack = (x, y) => track.has(key(x, y));

  const getShortestPath = () => {
    const queue = [{ x: start.x, y: start.y, steps: [start] }];
    const visited = new Set();

    while (queue.length) {
      const { x, y, steps } = queue.shift();
      const locationKey = key(x, y);
      if (isEnd(x, y)) return steps;

      visited.add(locationKey);

      for (const [dx, dy] of [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        const newKey = key(nx, ny);
        if (!visited.has(newKey) && track.has(newKey)) {
          queue.push({ x: nx, y: ny, steps: steps.concat([{ x: nx, y: ny }]) });
        }
      }
    }

    return Infinity;
  };

  const shortestPath = getShortestPath();

  return { start, isEnd, isTrack, shortestPath };
};

const key = (x, y) => `${x},${y}`;
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const countShortcuts = (
  shortestPath,
  maxShortcutLength,
  picosecondsSaved,
  comparison
) => {
  let result = 0;

  const pathMap = new Map();
  shortestPath.forEach(({ x, y }, ix) => pathMap.set(key(x, y), ix));

  shortestPath.forEach(({ x, y }, startPos) => {
    for (let tx = x - maxShortcutLength; tx <= x + maxShortcutLength; tx++) {
      for (let ty = y - maxShortcutLength; ty <= y + maxShortcutLength; ty++) {
        const tk = key(tx, ty);
        if (pathMap.has(tk)) {
          const endPos = pathMap.get(tk);
          const dist = distance({ x, y }, { x: tx, y: ty });
          const saving = endPos - startPos - dist;
          if (dist <= maxShortcutLength) {
            switch (comparison) {
              case module.exports.EXACT:
                if (saving === picosecondsSaved) {
                  result++;
                }
                break;
              case module.exports.AT_LEAST:
                if (saving >= picosecondsSaved) {
                  result++;
                }
                break;
            }
          }
        }
      }
    }
  });

  return result;
};
