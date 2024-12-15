const { sum } = require("./utils");

module.exports.part1 = (input) => {
  const parsed = parse(input);
  moveRobot(parsed);
  return [...parsed.boxes].reduce(sum);
};

module.exports.part2 = (input) => {
  const parsed = parse2(input);
  moveRobot2(parsed);
  return [...parsed.boxes].reduce(sum);
};

const parse = (input) => {
  const mapLines = [];
  let moves = "";
  input.forEach((line) => {
    if (line === "") return;
    if (line[0] === "#") mapLines.push(line);
    else moves += line;
  });

  const boxes = new Set();
  const walls = new Set();
  let robot = 0;
  mapLines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") walls.add(toLocation(x, y));
      if (char === "O") boxes.add(toLocation(x, y));
      if (char === "@") robot = toLocation(x, y);
    });
  });

  return { robot, boxes, walls, moves };
};

const moveRobot = (parsed) => {
  const { boxes, walls, moves } = parsed;
  const directions = { "<": -1, ">": 1, "^": -100, v: 100 };

  let robot = parsed.robot;
  for (const move of moves) {
    const direction = directions[move];
    const newLocation = robot + direction;
    if (walls.has(newLocation)) continue;
    if (boxes.has(newLocation)) {
      let newBoxLocation = newLocation + direction;
      while (boxes.has(newBoxLocation)) {
        newBoxLocation += direction;
      }
      if (walls.has(newBoxLocation)) continue;
      boxes.delete(newLocation);
      boxes.add(newBoxLocation);
    }
    robot = newLocation;
  }
};

const parse2 = (input) => {
  const mapLines = [];
  let moves = "";
  input.forEach((line) => {
    if (line === "") return;
    if (line[0] === "#") mapLines.push(line);
    else moves += line;
  });

  const boxes = new Set();
  const walls = new Set();
  let robot = 0;
  mapLines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") {
        walls.add(toLocation(x * 2, y));
        walls.add(toLocation(x * 2 + 1, y));
      }
      if (char === "O") {
        boxes.add(toLocation(x * 2, y));
      }
      if (char === "@") robot = toLocation(x * 2, y);
    });
  });

  return { robot, boxes, walls, moves };
};

const moveRobot2 = (parsed) => {
  const { boxes, walls, moves } = parsed;
  const directions = { "<": -1, ">": 1, "^": -100, v: 100 };

  const above = (location) => {
    return [location - 101, location - 100]
      .filter((l) => boxes.has(l))
      .flatMap((l) => [l, ...above(l), ...above(l + 1)]);
  };

  const below = (location) => {
    return [location + 99, location + 100]
      .filter((l) => boxes.has(l))
      .flatMap((l) => [l, ...below(l), ...below(l + 1)]);
  };

  let robot = parsed.robot;
  for (const move of moves) {
    const direction = directions[move];
    const newLocation = robot + direction;

    if (move === "<") {
      if (walls.has(newLocation)) continue;
      if (boxes.has(newLocation - 1)) {
        const boxesToBeMoved = [];
        let l = newLocation - 1;
        while (boxes.has(l)) {
          boxesToBeMoved.push(l);
          l -= 2;
        }
        if (walls.has(l + 1)) continue;
        boxesToBeMoved.forEach((box) => boxes.delete(box));
        boxesToBeMoved.forEach((box) => boxes.add(box - 1));
      }
    }

    if (move === ">") {
      if (walls.has(newLocation)) continue;
      if (boxes.has(newLocation)) {
        const boxesToBeMoved = [];
        let l = newLocation;
        while (boxes.has(l)) {
          boxesToBeMoved.push(l);
          l += 2;
        }
        if (walls.has(l)) continue;
        boxesToBeMoved.forEach((box) => boxes.delete(box));
        boxesToBeMoved.forEach((box) => boxes.add(box + 1));
      }
    }

    if (move === "^") {
      if (walls.has(newLocation)) continue;
      const boxesToBeMoved = above(robot);
      if (boxesToBeMoved.some((l) => walls.has(l - 100) || walls.has(l - 99)))
        continue;
      boxesToBeMoved.forEach((box) => boxes.delete(box));
      boxesToBeMoved.forEach((box) => boxes.add(box - 100));
    }

    if (move === "v") {
      if (walls.has(newLocation)) continue;
      const boxesToBeMoved = below(robot);
      if (boxesToBeMoved.some((l) => walls.has(l + 100) || walls.has(l + 101)))
        continue;
      boxesToBeMoved.forEach((box) => boxes.delete(box));
      boxesToBeMoved.forEach((box) => boxes.add(box + 100));
    }

    robot = newLocation;
    parsed.robot = robot;
  }
};

const toLocation = (x, y) => x + y * 100;
