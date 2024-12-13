module.exports.part1 = (input) => {
  const { regions } = parseRegions(input);
  return regions.reduce((sum, region) => sum + price(region), 0);
};

module.exports.part2 = (input) => {
  const { regions } = parseRegions(input);
  return regions.reduce((sum, region) => sum + price2(region), 0);
};

const parseRegions = (input) => {
  const width = input[0].length;
  const height = input.length;

  const getXY = (x, y) => input[y][x];

  const expandRegion = (regionType, region, x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return region;
    const location = toLocation(x, y);
    if (region.has(location)) return region;
    if (getXY(x, y) !== regionType) return region;

    region.add(location);
    locationsHandled.add(location);

    expandRegion(regionType, region, x, y - 1);
    expandRegion(regionType, region, x - 1, y);
    expandRegion(regionType, region, x + 1, y);
    expandRegion(regionType, region, x, y + 1);
    return region;
  };

  const locationsHandled = new Set();
  const regions = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const location = toLocation(x, y);
      if (locationsHandled.has(location)) {
        continue;
      }

      const regionType = getXY(x, y);
      regions.push(expandRegion(regionType, new Set(), x, y));
    }
  }

  return { regions };
};

const price = (region) => {
  const area = region.size;
  let perimeter = 0;
  region.forEach((location) => {
    const [x, y] = fromLocation(location);
    if (!region.has(toLocation(x, y - 1))) perimeter++;
    if (!region.has(toLocation(x - 1, y))) perimeter++;
    if (!region.has(toLocation(x + 1, y))) perimeter++;
    if (!region.has(toLocation(x, y + 1))) perimeter++;
  });
  return area * perimeter;
};

const price2 = (region) => {
  const hasNeighbour = (x, y) => region.has(toLocation(x, y));
  const corners = [];

  const area = region.size;
  region.forEach((location) => {
    const [x, y] = fromLocation(location);
    if (
      hasNeighbour(x, y - 1) &&
      hasNeighbour(x - 1, y) &&
      !hasNeighbour(x - 1, y - 1)
    ) {
      corners.push(toLocation(x, y));
    }
    if (!hasNeighbour(x, y - 1) && !hasNeighbour(x - 1, y)) {
      corners.push(toLocation(x, y));
    }
    if (
      hasNeighbour(x, y - 1) &&
      hasNeighbour(x + 1, y) &&
      !hasNeighbour(x + 1, y - 1)
    ) {
      corners.push(toLocation(x + 1, y));
    }
    if (!hasNeighbour(x, y - 1) && !hasNeighbour(x + 1, y)) {
      corners.push(toLocation(x + 1, y));
    }
    if (
      hasNeighbour(x, y + 1) &&
      hasNeighbour(x - 1, y) &&
      !hasNeighbour(x - 1, y + 1)
    ) {
      corners.push(toLocation(x, y + 1));
    }
    if (!hasNeighbour(x, y + 1) && !hasNeighbour(x - 1, y)) {
      corners.push(toLocation(x, y + 1));
    }
    if (
      hasNeighbour(x, y + 1) &&
      hasNeighbour(x + 1, y) &&
      !hasNeighbour(x + 1, y + 1)
    ) {
      corners.push(toLocation(x + 1, y + 1));
    }
    if (!hasNeighbour(x, y + 1) && !hasNeighbour(x + 1, y)) {
      corners.push(toLocation(x + 1, y + 1));
    }
  });

  return area * corners.length;
};

const toLocation = (x, y) => `${x},${y}`;
const fromLocation = (location) => location.split(",").map(Number);
