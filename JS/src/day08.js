module.exports.part1 = (input) => {
  const parsed = parseMap(input);
  const antinodes = getAntinodes(parsed);
  return antinodes.size;
};

module.exports.part2 = (input) => {
  const parsed = parseMap(input);
  const antinodes = getAntinodes(parsed, true);
  return antinodes.size;
};

toLocation = (x, y) => x * 100 + y;
toXY = (location) => [Math.floor(location / 100), location % 100];
inRange = (x, y, width, height) => x >= 0 && x < width && y >= 0 && y < height;
getPairs = (arr) =>
  arr.reduce(
    (acc, a, i) => acc.concat(arr.slice(i + 1).map((b) => [a, b])),
    []
  );

parseMap = (input) => {
  const width = input[0].length;
  const height = input.length;
  const map = input.reduce((acc, line, y) => acc.concat([line.split("")]), []);

  const antennaGroups = {};
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = map[y][x];
      if (cell != ".") {
        if (!antennaGroups[cell]) {
          antennaGroups[cell] = new Set();
        }
        antennaGroups[cell].add({ x, y });
      }
    }
  }

  return { map, width, height, antennaGroups };
};

getAntinodes = (parsed, multiples = false) => {
  const { width, height, antennaGroups } = parsed;
  const antinodes = new Set();

  for (const locations of Object.values(antennaGroups)) {
    if (locations.size > 1) {
      getPairs(Array.from(locations)).forEach((pair) =>
        getAntinodesForPair(pair, width, height, multiples).forEach((a) =>
          antinodes.add(a)
        )
      );
    }
  }

  return antinodes;
};

getAntinodesForPair = ([a, b], width, height, multiples) => {
  const [x1, y1] = [a.x, a.y];
  const [x2, y2] = [b.x, b.y];

  const dx = x2 - x1;
  const dy = y2 - y1;

  const antinodes = [];

  let m = multiples ? 0 : 1;
  while (
    inRange(x1 - dx * m, y1 - dy * m, width, height) ||
    inRange(x2 + dx * m, y1 + dy * m, width, height)
  ) {
    if (inRange(x1 - dx * m, y1 - dy * m, width, height)) {
      antinodes.push(toLocation(x1 - dx * m, y1 - dy * m));
    }
    if (inRange(x2 + dx * m, y2 + dy * m, width, height)) {
      antinodes.push(toLocation(x2 + dx * m, y2 + dy * m));
    }

    if (!multiples) {
      break;
    }
    m++;
  }

  return antinodes;
};
