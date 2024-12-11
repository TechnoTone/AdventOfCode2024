module.exports.part1 = (input) => {
  const { width, height, heightXY, getTrailHeads } = parseInput(input);
  const trailHeads = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // 9 is the end of a trail
      if (heightXY(x, y) === 9) {
        // using a set as we only care about unique
        // start & end points of trails, not the route
        const heads = new Set(getTrailHeads(x, y));
        heads.forEach((h) => {
          trailHeads[h] = (trailHeads[h] || 0) + 1;
        });
      }
    }
  }

  return Object.values(trailHeads).reduce((acc, count) => acc + count, 0);
};

module.exports.part2 = (input) => {
  const { width, height, heightXY, getTrailHeads } = parseInput(input);
  const trailHeads = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // 9 is the end of a trail
      if (heightXY(x, y) === 9) {
        // using all heads now as we care about all possible routes
        const heads = getTrailHeads(x, y);
        heads.forEach((h) => {
          trailHeads[h] = (trailHeads[h] || 0) + 1;
        });
      }
    }
  }

  return Object.values(trailHeads).reduce((acc, count) => acc + count, 0);
};

const parseInput = (input) => {
  const map = input.map((line) => line.split("").map(Number));
  const width = map[0].length;
  const height = map.length;

  const heightXY = (x, y) =>
    x >= 0 && x < width && y >= 0 && y < height ? map[y][x] : null;

  /**
   * getTrailHeads returns an array of all the trail heads
   * for a given x, y location. A trail head is a location
   * where the height is 0 and there is a path to the given
   * x, y location
   * The same trail head can be returned multiple times if
   * there are multiple paths to reach it.
   *
   * @returns {string[]} an array of locations in the format "x,y"
   */
  const getTrailHeads = (x, y) => {
    const r = (tails, heads) => {
      if (tails.length === 0) return heads;
      const [tail, ...rest] = tails;
      const [x, y] = tail;

      const locationHeight = heightXY(x, y);
      if (locationHeight === 0) {
        return r(rest, [...heads, toLocation(x, y)]);
      }

      const newTails = [...rest];
      if (heightXY(x, y - 1) === locationHeight - 1) newTails.push([x, y - 1]);
      if (heightXY(x - 1, y) === locationHeight - 1) newTails.push([x - 1, y]);
      if (heightXY(x + 1, y) === locationHeight - 1) newTails.push([x + 1, y]);
      if (heightXY(x, y + 1) === locationHeight - 1) newTails.push([x, y + 1]);
      return r(newTails, heads);
    };
    return r([[x, y]], []);
  };

  return { width, height, heightXY, getTrailHeads };
};

const toLocation = (x, y) => `${x},${y}`;
