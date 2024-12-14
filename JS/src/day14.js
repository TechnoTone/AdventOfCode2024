const { product, repeat } = require("./utils");

module.exports.part1 = (input, width, height) => {
  const robots = parse(input);
  robots.forEach(step(width, height, 100));
  return quadrantCounts(robots, width, height).reduce(product);
};

module.exports.part2 = (input, width, height) => {
  const robots = parse(input);
  let stepCount = 0;
  while (true) {
    robots.forEach(step(width, height, 1));
    stepCount++;
    const output = printRobots(robots, width, height);
    if (output.some((line) => line.includes("##########"))) {
      return stepCount;
    }
  }
};

const parse = (input) => {
  return input.map((line) => {
    const [position, velocity] = line.split(" ");
    const [px, py] = position.substring(2).split(",").map(Number);
    const [vx, vy] = velocity.substring(2).split(",").map(Number);
    return { px, py, vx, vy };
  });
};

const step = (width, height, steps) => (robot) => {
  const { px, py, vx, vy } = robot;
  robot.px = (px + ((vx + width) % width) * steps) % width;
  robot.py = (py + ((vy + height) % height) * steps) % height;
};

const quadrantCounts = (robots, width, height) => {
  const counts = [0, 0, 0, 0];
  const midX = (width - 1) / 2;
  const midY = (height - 1) / 2;
  robots.forEach((robot) => {
    if (robot.px === midX || robot.py === midY) return;
    if (robot.px < midX) {
      if (robot.py < midY) {
        counts[0]++;
      } else {
        counts[1]++;
      }
    } else {
      if (robot.py < midY) {
        counts[2]++;
      } else {
        counts[3]++;
      }
    }
  });
  return counts;
};

const printRobots = (robots, width, height) => {
  const lines = Array(height)
    .fill()
    .map(() => Array(width).fill("."));
  robots.forEach((robot) => {
    lines[robot.py][robot.px] = "#";
  });
  return lines.map((line) => line.join(""));
};
